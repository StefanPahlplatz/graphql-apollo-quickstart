# graphql-apollo-quickstart

A simple Apollo GraphQl starter kit.

## Features
- [x] User model
- [x] Signup
- [x] JWT Authentication

## Todo
- [ ] Tests
- [ ] Forgot password
- [ ] Remove user

## Getting started
```
yarn 
yarn dev
```
Make sure you have a [MongoDB](https://www.mongodb.com/) server running.

## Application Structure
```
├───lib/                # Transpiled js
├───src/                # Main souce folder
│   ├───middlewares/    # Middlewares (authentiction and routes)
│   ├───models/         # The models used by mongoose.
│   ├───resolvers/      # The logic for the GraphQl paths
│   └───utils/          # Helper functions
├───package.json        # Dependencies
└───...                 # Configuration files
```

## License
MIT License @ Stefan Pahlplatz
