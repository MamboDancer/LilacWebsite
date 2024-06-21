import express from 'express'
import path from 'path'
import serverRoutes from './routes/servers.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import https from 'https'
import fs from 'fs'
import multer from 'multer'
const PORT = process.env.PORT ?? 3000
const app = express()
const __dirname = path.resolve()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.resolve(__dirname, 'static', 'images', 'flowers')
        try {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
        }
        catch (err) {
            console.log(err)
        }
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, "" + file.originalname)
    }
})
var upload = multer({ storage: storage }).any('formImage')



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(serverRoutes)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser())
app.use(session({
    secret: 'supersecretsecret',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 9999999 }
}))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))


app.get("/", (req, res) => {
    res.render('index')
})


app.get("/lilacadmin", (req, res) => {
    res.render('lilacadmin')
})


app.listen(PORT, () => {
    console.log(`Express running on ${PORT}, View Engine is ${app.get("view engine")}, Views folder is ${app.get("views")}`)
})

app.post('/uploadimage', function (req, res) {
    upload(req, res, merr => {
        if (merr) res.send(false)
        res.send(true)
    })
})

app.post('/removeimage', async (req, res, next) => {
    const directory = path.resolve(__dirname, "static")
    fs.unlink(path.join(directory, req.body.imagename), (err) => {
        if (err) return
    })
})

app.post('/setcategory', async (req, res, next) => {
    const cat = req.body.category
    const filepath = path.resolve(__dirname, "ejs", "partials", "categories.ejs")
    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) res.send(false)
        else {
            fs.writeFile(filepath, cat, err => {
                if (err) res.send(false)
            })
        }
    })
    res.send(true)
})

app.post('/sendorder', (req, res) => {
    const cart = req.body.cart
    const token = "6511960747:AAEXEmpt_0pNlbqLW9CTdeJ5GfsY-InM2SA"
    const chat_id = -4096041703
    https.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=markdown&text=${cart}`, (responce) => {
        if (responce.statusCode == 200) res.send(true)
        else res.send(false)
    })

})

app.post('/addgroup', async (req, res, next) => {
    const group = req.body.group
    const filepath = path.resolve(__dirname, "ejs", "partials", "groups.ejs")
    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) res.send(false)
        else {
            fs.writeFile(filepath, group, err => {
                if (err) res.send(false)
            })
        }
    })
    res.send(true)
})