const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Registering middleware
app.use( (req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log file.');
    }
  });
  next();
});
// app.use( (req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance page'
//   })
// });

app.use(express.static(__dirname + '/public'));
// Registering helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Managing Handlers: the new pages
app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'Home page',
      welcomeMessage: 'Hello everybody. This is a new page.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About page'
    });
});

app.get('/projects', (req, res)=>{
  res.render('projects.hbs', {
    pageTitle: 'My projects'
  });
});

app.get('/bad', (req, res) => {
    res.send('Unable to fulfill the request.');
});

// bind the app to a port
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

// handler for an http request
// app.get('/', (req, res) => {
//   //res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Diana',
//     likes: ['Biking',
//       'Reading',
//       'TV series'
//     ]
//   });
// });
