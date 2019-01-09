# Dota 2 Leagues Admin Adder

This automates the process of adding people as admins in a dota 2 league.

## Getting Started

Clone the repository, then run `npm start` in a terminal/bash/command prompt.

It will require user interaction due to the two factor authentication. By default, it waits 90 seconds for you to enter your credentials. You can adjust this time at the top of src/index.ts.

It also requires a csv of admin steam urls. A template is available in the root of the project.


### Prerequisites

Tested on Node v10.15.0 and NPM v6.4.1.

### Installing

After installing [NodeJS](https://nodejs.org/en/) you should be able to just run the following in the terminal.

```
npm i
```

## Built With

* [Puppeteer](https://github.com/GoogleChrome/puppeteer) - Scraping library
* [NodeJS](https://nodejs.org/en/) - NodeJS
* [csvtojson](https://github.com/Keyang/node-csvtojson) - NodeJS

## Authors

* **Jordan Hansen** - *Initial work* - [Jordan Hansen](https://github.com/aarmora)


## License

This project is licensed under the ISC License
