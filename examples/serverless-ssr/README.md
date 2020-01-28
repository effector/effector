# Serverless server side rendering with effector and react

Deployed to AWS Lambda

Default deployment url: [ssr.effector.dev](https://ssr.effector.dev)

## Backend

Defined in src/server

Implemented as three lambda functions:

1. **Api**: provides access to users' data through rest api.

- `POST ssr.effector.dev/api` for list of all user names
- `POST ssr.effector.dev/api/{user}` for particular user info

2. **SSR**: server side rendering of application. Makes http requests to api lambda and renders application with given results.

- `GET ssr.effector.dev` will fetch all user names and redirect user to random user page
- `GET ssr.effector.dev/user/{user}` will fetch user info and render react app with it

3. **Static**: lambda for hosting static client assets from url `ssr.effector.dev/static/*`

## Usage

**Configuration**

1. Add your domain name and certificate ARN to `domain.json`. It will be used by serverless framework to deploy application and by lambda functions to make requests. Note that certificate should be in `us-east-1` region

2. Call `npx serverless create_domain` to create API Gateway custom domain and then you will be ready to deploy application

**Deploy**

```sh
yarn && yarn deploy
```

This will build client app and each of the lambda functions and will deploy everything to AWS lambda via serverless framework
