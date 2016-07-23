# accounts-frontend
[![Build
Status](https://travis-ci.org/esayemm/accounts-frontend?branch=master)](https://travis-ci.org/esayemm/accounts-frontend)

Simple frontend for [accounts](https://github.com/esayemm/accounts) built in React. Signin/Signup and simple profile page. 

# Development

##Gulp
#### `gulp [PORT?=8080]`
Starts webpack dev server on port 8080 or given env PORT.
#### `gulp build`
Compiles into `/build/`.
#### `gulp serve:dist [PORT?=8080]`
Serves the build folder.

##Release

Running version will do a gulp build and push the tag to github. You can then run docker build to rebuild container, or just leave that to a CI service.

`npm version [major | minor | patch]`

##Lint

Comes with pre-commit installed, which will run lint against git modified files before every commit, to disable just remove the pre-commit package and entry in package.json.

```sh
npm run lint
```

## Docker

Build the docker image after you run gulp build. The default dockerfile simply runs a nginx server that serves the `build/` files.

```sh
// inside project root dir
docker build -t <docker username>/<docker hub repo> .

// run docker image
docker run -d --name <custom name> -p <host port>:80 <docker username>/<docker hub repo>
```