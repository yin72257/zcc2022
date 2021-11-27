## Zendesk Coding Challenge 2022


### Running the App
Install all dependencies using `npm`.
```bash
npm install
```

Steps to create authentication for api
1. Create a new folder in the project directory `auth`.
2. Create a new json file named `auth.json` in the auth folder in the following format. (subdomain refers to the string before your `.zendesk.com` domain )
```JSON
{
    "username":"[EMAIL]",
    "password":"[PASSWORD]",
    "subdomain":"[ZENDESK_SUBDOMAIN]"
}
```

Start the Node.js local server using `npm start`.
```bash
npm start
```

### Testing the App
Test the application using `npm test`.
```bash
npm test
```
Coverage details will show in the `coverage` folder.
