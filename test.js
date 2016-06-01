var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/reset-table',function(req,res,next){
var context = {};
mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('exercise',context);
    })
});
});

app.get('/',function(req,res,next){
var context = {};
mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
   if(err){
       next(err);
       return;
   }
   context.exercise =    rows;
   res.render('exercise', context);
});
});

app.post('/',function(req,res){
   var context = {};
  
   if(req.body['Add Entry']){
       mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", [req.body.name,req.body.reps,req.body.weight,req.body.date,req.body.lbs], function(err, result){
           if(err){
               next(err);
               return;
           }
       });
   }
   if(req.body['remove']){
       mysql.pool.query("DELETE FROM workouts WHERE id = ?", [req.body.id], function(err, result){
           if(err){
               next(err);
               return;
           }
       });
   }

   mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
   if(err){
       next(err);
       return;
   }
   context.exercise =    rows;
   res.render('exercise',context);
   });
});


app.get('/update',function(req,res,next){
   var context = {};
   res.render('update',context);
});

app.post('/update',function(req,res,next){
var context = {};
mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
      var curVals = result[0];
      console.log(curVals);
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.body.name || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight, req.body.date || curVals.date, req.body.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('update',context);
      });
});
});

app.use(function(req,res){
res.status(404);
res.render('404');
});


app.use(function(err, req, res, next){
console.error(err.stack);
res.type('plain/text');
res.status(500);
res.render('500');
});

app.listen(app.get('port'), function(){
console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});