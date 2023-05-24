# PlaceMark-hapi

PlaceMark is a web app built around Points of Interest. Users can add their own POIs which are grouped into pre-defined categories.

Project deployed on Glitch:

https://grzegorz-placemark.glitch.me/

## Features
### Accounts
- User signup/login
- Cookie authentication
- User scopes
- Basic admin dashboard
### Placemark Features
- POIs with
  - Name
  - Description
  - Category
  - Latitude
  - Longitude
- Users can add/edit/remove POIs
### API
- API following Open API
- Swagger documentation
### Models
- Mongo database
- Models:
  - User
  - POI
  - Category
### Tests
- API tests
- Models tests


## Requirements
[MongoDB](https://www.mongodb.com/) - You can download the community version from here: https://www.mongodb.com/try/download/community

[NodeJs](https://nodejs.org/en) v16 - You can download and install it from here: https://nodejs.org/en/blog/release/v16.16.0

## Getting Started
### MongoDB
Create a directory for the database at the location of your choice:
```
mkdir db
```
Launch MongoDB service:
```
mongod -dbpath db
```

### Launching the project
Clone the repository:
```
git clone https://github.com/grzpiotrowski/placemark-hapi.git
```
Go into the project directory:
```
cd placemark-hapi
```
Install npm modules:
```
npm i
```
Start the server on localhost:
```
npm run start
```

### Running the tests
To run all unit tests, use:
```
npm run test
```
Make sure that the Hapi server and MongoDB service are running prior to testing.

## Resources
* Gitflow Workflow \
https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

* Git Branching Naming Convention: Best Practices \
https://codingsight.com/git-branching-naming-convention-best-practices/

* Font Awesome \
https://fontawesome.com/icons

* Bulma Documentation \
https://bulma.io/documentation/

* Mongoose Documentation - Aggregate \
https://mongoosejs.com/docs/api/aggregate.html

* Mongoose Documentation - SchemaTypes \
https://mongoosejs.com/docs/schematypes.html#arrays

* Authentication and Authorization with hapi \
https://medium.com/@poeticninja/authentication-and-authorization-with-hapi-5529b5ecc8ec

* hapi — Restrict User Access With Scopes \
https://futurestud.io/tutorials/hapi-restrict-user-access-with-scopes

* hapi Tutorials - Validation \
https://hapi.dev/tutorials/validation/?lang=en_US

* Cloudinary Documentation \
https://cloudinary.com/documentation/image_upload_api_reference