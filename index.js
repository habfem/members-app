const express = require ('express');
const path = require('path');
const exphbs = require('express-handlebars');
//const logger = require('./middleware/logger');
const members =require('./Members');


const app = express();

//get
/* app.get ('/', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
}); */

//Init middleware
//app.use(logger);
//Handlebars Middleware 
app.engine('handlebars',exphbs.engine({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars') 

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded ({ extended: false }));

//HomePage Route: this shows because it is above the static folder
app.get('/', (req, res) => res.render('index', {
  title: 'Registered Memeber App',
  members
}));

//set static folder:  this doesn't show because it is beloe the HomePage
app.use(express.static(path.join(__dirname, 'public')));

//Memeers API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 7000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

