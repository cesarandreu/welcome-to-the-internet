var express =   require('express'),
    minify  =   require('express-minify'),
    http    =   require('http'),
    path    =   require('path');

var app = express();

//General purpose middleware
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

//Initializes the responseObject that gets rendered
app.use(function(req, res, next) {
  res.responseObject = {
    url: app.get('domain'),
    title: '',
    description: ''
  };
  next();
});

//Sets domain depending on NODE_ENV and hides errors and compression.
app.configure('production', function() {
    app.set('domain', 'http://internetify.me');
    app.use(express.compress());
    //app.use(minify());
    app.use(express.errorHandler());
});
app.configure('development', function() {
    app.set('domain', 'http://localhost:'+app.get('port'));
});
app.use(app.router);

//**************
//****ROUTES****
//**************
app.get('/', function(req, res) {
  res.responseObject.title = 'Welcome to the internet.';
  res.responseObject.description = 'Page welcoming users to the internet.';

  res.render('index', res.responseObject);
});

app.get('/bravo',function(req, res) {
  res.responseObject.title = 'Bravo model.';
  res.responseObject.description = 'Spinning 3D model.';

  res.render('bravo', res.responseObject);
});

//Default route is all else fails.
app.get('*', function(req, res) {
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Welcoming users to the internet using port ' + app.get('port'));
});
