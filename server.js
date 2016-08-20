'use strict'
module.exports = (() => {
  let express = require("express"),
      fs = require('fs'),
      app     = express(),
      path    = require("path"),
      less = require('less'),
      bodyParser = require('body-parser')

  app.use(bodyParser.json());
  app.use(express.static('.'))

  app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/main.html'))
  });

  app.post('/update',function(req,res){
    var input = fs.readFileSync(__dirname + '/less/app.less', 'utf8')
    var options = {
      modifyVars: {
        'color': req.body.color||'#000',
        'background': req.body.background||'#fff'
      }
    }

    less.render(input, options, function (err, result) {
      if (!err) fs.writeFile(__dirname + '/css/app.css',result.css)
    });
    res.send('ok')
    // res.sendFile(path.join(__dirname+'/main.html'))
  });

  let port = 1234
  app.listen(port);
  console.log(`Application worker ${process.pid} started at port: ${port}...`)
})()