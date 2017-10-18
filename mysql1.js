var db_host = '127.0.0.1';
var db_user = 'root';
var db_pw = '';
var db_name = 'test';

var mysql = require('mysql');
var mysql_options = {
   host: db_host,
   user: db_user,
   password: db_pw,
   database: db_name
};
var my_client = mysql.createConnection(mysql_options);
my_client.connect();

var sql = 'select * from user';

my_client.query(sql, function (err, rows, fields) {
    if (err) {
        console.log('can not connect');
        console.log(err);
         return;
   }
    for (var i in rows) {
      console.log(rows[i]);
   }
});
my_client.end();

var fs = require("fs")
var http = require('http');
var server = http.createServer();
var settings = require('./settings');
var msg;
var querystring = require('querystring')
server.on('request', function(req, res) {
switch (req.url) {
    case '/register':
         var display = fs.readFile("./views/register.html","utf-8", doRead)
         msg = "アカウント登録画面";
    break;

    case '/register/done':

         var data = ''
         req.on('readable', function() {
            data += req.read();
         })

         req.on('end', function() {
            querystring.parse(data);
            res.end(data);
         })
    console.log(req.on('readable', function() {
            data += req.read();
         }))
    var name = req.on('readable', function() {
            data += req.read();
         }).name
    console.log(name)
    var email = req.on('readable', function() {
            data += req.read();
         }).email
    var password = req.on('readable', function() {
            data += req.read();
         }).password
    var query = 'insert into user (name, email, password) values ("'+ name +'", '+'"'+ email +'", '+'"'+  password +'")';
    my_client.query(query, function(err, rows) {
       res.redirect('/login');
    })
    msg = "アカウント登録完了画面"
    break

    case '/login':
        msg = "ログイン画面";
    break;

    case '/time_line':
        msg = "タイムライン"
    break

    case '/user_list':
        msg = "ユーザー一覧"
    break

    case '/tweet_post':
        msg = "ツイート投稿ページ"
        break

    case '/tweet_post/complete':
        msg = "ツイート投稿完了しました"
        break

    default:
       msg = 'エラー';
       break;
  }

  //res.writeHead(200, {'Contddent-Type': 'text/plain; charset=utf-8'});
  function doRead(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
    }
})
server.listen(settings.port,settings.host)
