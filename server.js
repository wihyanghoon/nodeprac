const express = require('express'); // 라이브러리를 참조해주세요.
const app = express();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
const MongoClient = require('mongodb').MongoClient;

var db
MongoClient.connect('mongodb+srv://wihyanghoon:front95@cluster0.pnevfsg.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
    // 오류시
    if (err) return console.log(err)
    // 연결되면 할일
    db = client.db('test')

    app.listen(8080, function () { // listen 함수의 첫 파라미터 = 서버 포트번호, 두번째 파라미터 = 서버 실행후 실행할 코드
        console.log('서버가 실행중 입니다. 포트는 8080입니다.')
    });
})

app.get('/pet', function (req, res) { // req = 요청  res = 응답
    res.send('펫용품 쇼핑 할 수 있는 페이지 입니다.')
})

app.get('/beauty', function (req, res) {
    res.send('뷰티용품을 쇼핑 할 수 있는 페이지 입니다!!')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/write', function (req, res) {
    res.sendFile(__dirname + '/write.html')
})

app.post('/add', function (req, res) {
    res.send('글작성 완료.')
    console.log(req.body.title)

    db.collection('post').insertOne({ 제목 : req.body.title, 내용 : req.body.date }, function (err, result) {
        console.log('저장완료')
    })
})

app.get('/list', function (req, res) {
    res.render('list.ejs')
})