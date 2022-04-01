const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');   // logger, morgan is for logging requests
const bodyParser = require('body-parser');
const path = require('path');
const route = require(path.join(__dirname, 'server', 'routes', 'router'));
const connectDB = require('./server/database/connection');


const app = express();


// the port variable will be set by process.env.PORT from the file config.env which is in views folder
// if it is not available there then it will be set to 8080
dotenv.config({ path: '/config.env' });
const PORT = process.env.PORT || 8080;



//log requests, it prints the log requests on console
//it can pass tiny, dev, short etc. Check documentation for more.
app.use(morgan('tiny'));


//mongoDB connection
connectDB();


//parsing request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));


//setting view engine to ejs
//it means that we can use ejs files in views folder as dynamic html files
app.set('view engine', 'ejs');


//loading assets folder
//giving virtual paths to folders of assets folder
//__dirname returns the complete path of the project
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));


//loading route
app.use('/', route);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});