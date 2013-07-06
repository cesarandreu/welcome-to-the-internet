var express =   require('express'),
    http    =   require('http'),
    path    =   require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', function(req, res) {
  res.render('index');
});
app.get('*', function(req, res) {
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Welcoming users to the internet using port ' + app.get('port'));
});
