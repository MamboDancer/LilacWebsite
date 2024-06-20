var sql = require('mysql')

var conn

conn = sql.createConnection(
    {
        host: 'kyiv1.mineconnect.xyz',
        port: "3306",
        user: 'u6661_M6OY15a4um',
        password: '7@4NKMxH9h!HMPf+qy+MjUXc',
        database: 's6661_tfc'
    })
conn.connect((err) => {
    if (err) console.log(err)
    else {
        console.log(`Connected to db`)
        conn.query(`CREATE TABLE IF NOT EXISTS flowers(
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                price DOUBLE,
                image VARCHAR(255),
                category VARCHAR(255),
                sub_category VARCHAR(255),
                saleprice DOUBLE,
                description LONGTEXT
            )`, (err, res) => {
            if (err) console.log(err)
            else
                console.log("Table flowers successfuly created or exists")
        })
        conn.query(`CREATE TABLE IF NOT EXISTS orders(
                id INT AUTO_INCREMENT PRIMARY KEY,
                userdata LONGTEXT,
                orderdata LONGTEXT,
                status VARCHAR(255),
                ordertime VARCHAR(255),
                pickuptime VARCHAR(255)
            )`, (err, res) => {
            if (err) console.log(err)
            else
                console.log("Table orders successfuly created or exists")
        })
    }
})

getFlowers = (req, res) => {
    conn.query(`SELECT * from flowers`, (err, ress, f) => {
        if (err) res.status(500).json(ress)
        else return res.status(200).json(ress)
    })
}


addFlower = (req, res) => {
    let name = req.body.name
    let price = req.body.price
    let img = req.body.img
    let category = req.body.category
    let sub_category = req.body.sub_category
    let description = req.body.description
    let saleprice = req.body.saleprice
    conn.query(`INSERT INTO flowers (name, price, image, category, sub_category, description, saleprice) 
                VALUES ("${name}", "${price}", "${img}", "${category}", "${sub_category}", "${description}", "${saleprice}") `,
        (err, ress, f) => {
            if (err) res.status(500).json(ress)
            else return res.status(200).json(ress)
        })
}

setSalePrice = (req, res) => {
    conn.query(`UPDATE flowers
                SET saleprice = '${req.body.SALEPRICE}'
                WHERE id = '${req.body.FLOWERID}'`, (err, ress, f) => {
        if (err) return res.send(false)
        else return res.send(true)
    })
}


removeItem = (req, res) => {
    conn.query(`DELETE FROM flowers WHERE id = '${req.body.id}'`, (err, ress, f) => {
        if (err) return res.status(500).json(ress)
        else return res.status(200).json(ress)
    })
}

getOrders = (req, res) => {
    conn.query(`SELECT * from orders`, (err, ress, f) => {
        if (err) res.status(500).json(ress)
        else return res.status(200).json(ress)
    })
}
createOrder = (req, res) => {
    conn.query(`INSERT INTO orders (userdata, orderdata, ordertime, pickuptime, status)
                VALUES ('${req.body.UD}','${req.body.CART}','${req.body.CURRENTTIME}','${req.body.ORDERTIME}','pending')`, (err, ress, f) => {
        if (err) {
            console.log(err)
            return res.send(false)
        }
        else return res.send(true)
    })
}
updateOrderStatus = (req, res) => {
    conn.query(`UPDATE orders
                SET status = '${req.body.STATUS}'
                WHERE id = '${req.body.ORDERID}'`, (err, ress, f) => {
        if (err) return res.send(false)
        else return res.send(true)
    })
}


exports.conn = conn
exports.removeItem = removeItem
exports.getFlowers = getFlowers
exports.addFlower = addFlower
exports.getOrders = getOrders
exports.createOrder = createOrder
exports.updateOrderStatus = updateOrderStatus
exports.setSalePrice = setSalePrice