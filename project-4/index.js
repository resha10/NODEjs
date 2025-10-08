const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(10000, () => {
  console.log("Server is running on port 10000");
});
app.get('/', (req, res) => {
    User.find({})
        .then((data) => {
            return res.render('view', {
                books: data
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.get('/add', (req, res) => {
    return res.render('add')
})

const UserModel = require('./models/UserModel');

app.get('/', (req, res) => {
    return res.render('view')
})

app.post('/insertBook', (req, res) => {
    const { book_name, book_author, book_price, book_pages } = req.body;
    UserModel.create({
        book_name: book_name,
        book_author: book_author,
        book_price: book_price,
        book_pages: book_pages
    }).then((data, err) => {
        if (err) {
            console.log(err);
            return false
        }
        console.log(`Record Add`);
        return res.redirect('/add');
    })
})

app.get('/editBook', (req, res) => {
    let id = req.query.Id;

    User.findById(id)
        .then((single) => {
            console.log(single);
            return res.render('edit', {
                data: single
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.get('/deleteBook', (req, res) => {
    let id = req.query.deleteId;
    User.findByIdAndDelete(id)
        .then((data) => {
            console.log("User Delete");
            return res.redirect('/')
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.post('/updateBook', (req, res) => {
    const { editid, book_name, book_author, book_price, book_pages } = req.body;
    console.log(book_name, book_author, book_price, book_pages);

    User.findByIdAndUpdate(editid, {
        book_name: book_name,
        book_author: book_author,
        book_price: book_price,
        book_pages: book_pages
    }).then((data) => {
        console.log("User Update");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server Is Start On Port :- ${port}`);
})