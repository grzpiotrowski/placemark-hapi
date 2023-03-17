# PlaceMark-hapi

PlaceMark is a web app built around Points of Interest.

## Features
TBD

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