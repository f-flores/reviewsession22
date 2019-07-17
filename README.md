# samplereact

## Version 01

React boilerplate we went over in class, with hot reloading and nodemon added.

Installation instructions:

* Clone repository: `git clone git@github.com:f-flores/reviewsession22.git`

* Change directory to `version01` folder: `cd reviewsession22/version01`

* Install npm packages using yarn: `yarn install`

* Run app: `yarn start`

## Version 02

Build upon version01.

Leverages passport library to implement authentication. Basic signup/login/logout functionality.

Installation instructions:

* Clone repository: `git clone git@github.com:f-flores/reviewsession22.git`

* Change directory to `version02` folder: `cd reviewsession22/version02`

* Install npm packages using yarn: `yarn install`

* Run app: `yarn start`

## Version 03

Build upon version02.

Leverages passport library to implement authentication. Basic signup/login/logout functionality.

### Setup Cloudinary

Signup up for cloudinary account at https://cloudinary.com

Setup environment variables in a .env file. The contents should be:

```
# Cloudinary Environment Variables
CLOUDINARY_NAME="cloudinary_name"
CLOUDINARY_API_KEY="cloudinary_api_key"
CLOUDINARY_API_SECRET="cloudinary_api_secret"
REACT_APP_UPLOAD_PRESET="react_upload_preset"
REACT_APP_UPLOAD_CLOUDNAME="cloudinary_name"
```
Note that cloudinary's upload preset variable must be set to allow for `unsigned` uploads.
This is done by going to the cloudinary settings menu (available on the cloudinary dashboard).
From there, select the `Upload` tab and scroll down to the `Upload Presets` section. Select
the "enable unsigned upload" option. This creates a preset name which should be copied in the
REACT_APP_UPLOAD_PRESET variable above.

Also in, './dist/index.html', add the following line of code under `<div id="root></div>`:

```
  <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
```

Also note that this version's `webpack.config.js` changed in order to include environment variables.

### Installation instructions:

* Clone repository: `git clone git@github.com:f-flores/reviewsession22.git`

* Change directory to `version03` folder: `cd reviewsession22/version03`

* Install npm packages using yarn: `yarn install`

* Run app: `yarn start`
