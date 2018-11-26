const express = require('express');
const fs =require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  res.render('maintinance.hbs');
});
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n',(error)=>{
    if(error){
      console.log('unable to ');
    }
  });
  next();
});

app.get('/' , (req, res)=>{
  //res.send('hello express');
  res.render('home.hbs',{
    name:'martina'
  });
})
app.get('/about' , (req,res) => {
  res.render('about.hbs' , {
    pageTitle : 'hello martina'
  });
});
app.get('/bad' , (req,res) => {
  res.send({
    errorMessage : 'errorhandling request'
  });
});
app.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});
