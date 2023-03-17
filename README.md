# Toolbox Challenge: Backend
This challenge consists in developing an API that fetches data from an external API and format them following certain rules, and return it in a JSON format.
## Installation And Running

Install dependencies with your Package Manager and start the Server.

```console
$ npm install 
$ npm start
```

Or you can build a Docker Image and run it:
```console
$ docker build .
$ docker run -p 5000:5000 {Image}
```









    
## Observations

No environment variables are allowed, so the url to access the external API is fixed to 'https://echo-serv.tbxnet.com/v1/secret' and the API Key to 'aSuperSecretKey'. Also the port for running this server is fixed to 5000.
## Documentation

There are two endpoints provided and exposed for access:

*GET /files/data*: Request the data for all files or only selected file by queryParam (?FileName=<FILE>)

*GET /files/datalist*: Request the list of all files.

Both endpoints must return Status Code 200 or 500 if any server error occurs.
## Running Tests

The solution can be test with the following command:

```console
$ npm test
```

## Suggested Features

- Add different validations over fields and received data.
- Add Authorization through API KEY (implementing an Auth Middleware)
- Configuration through Environments Variables or Config file.
- Caching and Pagination