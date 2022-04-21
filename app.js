// requiring express
const express = require('express');
// creating a new express object which will be our application
const app = express();
const path = require('path');

// requiring from another js file
const { square, PI } = require('./math');

// requiring another directory
// this will look for the index.js file in that directory and use its exports
const utils = require('./utils')

const fakeData = require('./data.json');
console.log(fakeData.chickens);

//console.log(utils)
//utils.fetchData.fetchData();


//setting our static assets directory to be the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// setting express to use EJS for templating
// app.set takes two arguments, first the key, second the value for it
app.set('view engine', 'ejs');
// express expects us to be using the "views" directory for our EJS
// this sets the views directory path to the current directory of this app.js file
// can rename this path to set a different folder for the views
app.set('views', path.join(__dirname, '/views'));



// a callback that is called whenever the server receives a new request
// express makes request and response objects for us, commonly called "req" and "res"
// these objects are automatically passed into our callback
// req is express automatically parsing the incoming http request and turning it into an object
// res is the http response that we send, automatically sets up headers
// app.use((req, res) => {
//     console.log("received a request")
//     //console.dir(req)
//     // this sends back a response
//     // note that you can only send one response per request
//     //res.send("<h1>Response sent</h1>")
// })
62
app.get('/', (req, res) => {
    //res.render looks for the filename given to it
    // it will find this file in the views folder. No need to put ".ejs" at the end
    res.render('home')
})

// sends this particular response for this particular route that is requested
app.get('/cats', (req, res) => {
    res.send("working")
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = fakeData[subreddit];
    console.log(data)
    // check to see if the data actually exists for the page trying to visit
    // and then render the page with that info
    if (data) {
        res.render('subreddit', { ...data }) //spreading the data object allows you to access its properties without inputting each like "data.name, data.author, etc"
    } else { // if not, render a not found page
        res.render('notFound', { subreddit })
    }
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { postId, subreddit } = req.params;
    console.log(postId);
    res.send(`${postId}`)
})

app.get('/random', (req, res) => {
    const number = Math.floor(Math.random() * 10) + 1;
    res.render('random', { random: number })
})

app.get('/plants', (req, res) => {
    const plants = [
        'Tomato', 'Wheat', 'Corn', 'Apple', 'Rice'
    ]
    res.render('plants', { allPlants: plants})
})

app.get('/tacos', (req, res) => {
    res.render('getpost')
})

// this is a catch-all for any route
// express tries all routes in the order that they are listed, so this has to go at the end
// otherwise any route would hit this before the actual route it is intended for
app.get('*', (req, res) => {
    res.send("We couldn't find the page you were looking for!")
})

// having our server listen for incoming requests
// specify the port number and a callback to use for requests
app.listen(3000, () => {
    console.log("App is listening on port 3000")
})