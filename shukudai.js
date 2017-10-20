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
    break;

    case '/register/done':

         var data = ''
         req.on('readable', function() {
             data += req.read()||"";
             console.log("read文を実行しました")
         })

         req.on('end', function() {
             var body = querystring.parse(data);
             console.log("リクエストボディをパースしました")
             var name = body.name
             var email = body.email
             var password = body.password
             var sql_statement = 'insert into user (name, email, password) values ("'+ name +'", '+'"'+ email +'", '+'"'+  password +'")'

         my_client.query(sql_statement, function(err, rows){
             console.log("クエリ文を実行しています")
             res.setHeader("Location", "http://127.0.0.1:1337/login")
             res.statusCode = 302
             res.end();
             console.log("一連の処理が終わりました")
            })
         })
    msg = "アカウント登録完了画面"
    break

    case '/login':
         var display = fs.readFile("./views/login.html","utf-8", doRead)
    break;

    case '/time_line':
         var data = ''
         req.on('readabl', function(){
             data += req.read()||"";
         })
         req.on('end', function() {
             var body = querystring.parse(data);
             var email = body.email
             var password = body.password
             //データベースの中に一致するものがあるか確認する処理をかく
         })

         var cookie =req.headers.cookie
            console.log(req.headers)
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

  function doRead(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
    }
})

server.listen(settings.port,settings.host)
