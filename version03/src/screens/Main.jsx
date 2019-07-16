import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../utils/API';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';

const Main = (props) => {
  const { isLoggedIn, email } = props;
  const [description, setDescription] = useState('');
  const [isValid, setValid] = useState(true);
  const [arrMediaInfo, setMediaInfo] = useState([]);
  let cloudinaryUrl = '';
  let source = {};

  // get current reserved dates and disable them
  const getMediaInfo = useCallback(() => {
    API
      .getMediaInfo(email, source)
      .then((res) => {
        setMediaInfo(res.data);
      })
      .catch((err) => {
        console.log(`Something went wrong in data retrieval ${err.message}`);
      });
  }, [arrMediaInfo]);

  useEffect(() => {
    source = axios.CancelToken.source();
  }, []); // like ComponentDidMount()

  useEffect(() => {
    getMediaInfo();

    return function cleanup() { // like ComponentWillUnmount
      API.cancelRequest(source);
    };
  }, [getMediaInfo, arrMediaInfo]); // executes everytime arrMediaInfo changes 'state'

  const handleOnChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setDescription(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(cloudinaryUrl && description)) {
      setValid(false);
      return;
    }
    API
      .postInfo({
        picUrl: cloudinaryUrl,
        body: description,
      }, source)
      .then((res) => {
        // setMediaInfo
        // get pictures render images and notes
        setMediaInfo(res.data);
        setValid(true);
        console.log('submitted');
      })
      .catch(err => console.log(err));
  };

  const setCloudinaryInfo = (imgUrl) => {
    cloudinaryUrl = imgUrl;
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <h2 className="text-center">
            Main page
            {' '}
            {email}
          </h2>
          <Form>
            <h3>Upload Picture</h3>
            <Form.Group>
              <Form.Label htmlFor="description">
              Description
                <Form.Control
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleOnChange}
                  placeholder="Enter description"
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <CloudinaryUploadWidget
                cloudinaryInfo={setCloudinaryInfo}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {
          !isValid
            ? (
              <p className="bg-danger text-white font-weight-bold">
            Both description and url must be entered to complete submission.
              </p>
            )
            : null
        }
      </Row>
    </Container>
  );
};

Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export default Main;
