const express = require('express'); // 라이브러리를 참조해주세요.
const methodOverride = require('method-override')
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
const MongoClient = require('mongodb').MongoClient;

let db
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
    res.render('index.ejs')
})

app.get('/write', function (req, res) {
    res.render('write.ejs')
})

app.post('/add', function (req, res) {
    res.send('글작성 완료.')
    db.collection('counter').findOne({ name: '게시물갯수' }, function (err, result) {
        console.log(result.totalPost)

        let totalPost = result.totalPost

        db.collection('post').insertOne({ _id: totalPost + 1, 제목: req.body.title, 내용: req.body.date }, function (err, result) {
            console.log('저장완료')
            db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (err, result) {
                if (err) return console.log(err)
            })
        })
    })
})

app.get('/list', function (req, res) {
    // db에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요.
    db.collection('post').find().toArray(function (err, result) {
        console.log(result)
        res.render('list.ejs', { posts: result })
    });
})

// /detail 로 접속하면 detail.ejs 보여줌
// : <= 쿼리문자
app.get('/detail/:id', function (req, res) {
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (error, result) {
        if (!result) {
            res.write("<script>alert('데이터가 없습니다.')</script>");
            res.write("<script>window.location=\"/list\"</script>");
        }
        if (result) {
            console.log(result)
            res.render('detail.ejs', { data: result })
        }
    })
})

app.get('/edit/:id', function (req, res) {
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (error, result) {
        if (!result) {
            res.write("<script>alert('no, data')</script>");
            res.write("<script>window.location=\"/list\"</script>");
        }
        if (result) {
            console.log(result)
            res.render('edit.ejs', { data: result })
        }
    })
})

app.put('/edit', function (req, res) {
    // db.collection('counter12ㅇㄹㅇㄹㅇㄹㅇ').updateOne({ _id: parseInt(req.body.id) }, { $set: { 제목: req.body.title, 내용: req.body.date } }, function (err, result) {
    //     if (result.ismaster.ok <= 0) {
    //         return res.status(400).send({ message: '실패' })
    //     }
    //     console.log(result)
    //     res.status(200).send({ message: '성공했습니다.' })
    // })
    db.collection('fdfd').find()
})

app.delete('/delete', function (req, res) {
    req.body._id = parseInt(req.body._id)
    db.collection('post').deleteOne(req.body, function (err, result) {
        console.log('삭제완료')
        res.status(200).send({ message: '성공했습니다.' });
    })
})

app.get('/test', function (req, res) {
    db.collection('df').find()
})