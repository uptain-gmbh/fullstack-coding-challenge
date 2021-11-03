# Frontend project
The project is built with yarn & [react-create-app](https://github.com/facebook/create-react-app), 
based on MUI (MaterialUI), uses react-toastify, yup and axios.

## How to run
- Make sure you have a `yarn 3` installed in system
- Run yarn inside `frontend` folder to install all dependencies
- And you can use `yarn start` to start the application locally
- You can change backend URL in the `src/config/api.json` in API_URL variable

## How to build
- Finally, you can build production build with `yarn build`
- This build can be deployed to S3 and covered by CDN for example

## Structure
- All the components of the application are living in `src/components/`
- The `public` folder has static content for react application
- At `src/api` folder you can find the API requests with axios
- At `src/shared` folder you will see few shared models
