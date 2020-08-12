# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### INFORMATION/Guidelines

This is a payment portal made using Vuejs for Front End and nodejs,Express for Backend Server.

This payment portal is has Stripe as well as Paytm Portal integrated with a basic Front-end (Vuejs) form.This is ready to use and can be used to integrate in your own website.

NOTE:- Find config folder in /client/server/config.js and Input your Paytm MID and Merchant Key which can be found here(https://dashboard.paytm.com/next/get-started).Similarly for Stripe Payment key find your keys here(https://dashboard.stripe.com/test/apikeys) 

This also has a basic front-end Environment set which can be used to design your own website as per your wish without bothering to handle the integration of payment portal to your new website.

### Starting your Website

->Change your directory to "client" folder
->Run command "npm run serve" at terminal
->Website will run on 'http://localhost:8080'

### Starting Server

->Change your directory to server found in /client folder
->Run command "nodemon index.js" in your terminal
-> Server will run on http://localhost:5001
