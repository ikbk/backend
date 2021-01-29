const sql = require('./db')

// constructor
// this time, the constructor not from class but direct to function!
const Customer = function (customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
}

// const orang = new Customer(1)
// orang.name = 'raihan'
// orang.email = 'najib@email.com'
// orang.active = true
// console.log(orang)

// CREATE NEW CUSTOMER
Customer.create = function (newCustomer, result) {
    let queryRaw = 'INSERT INTO customers SET ?'
    sql.query(queryRaw, newCustomer, function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created customer: ', {
            id: res.insertId,
            ...newCustomer
        })
        result(null, {
            id: res.insertId,
            ...newCustomer
        })
    })
}

// READ ALL DATA
Customer.getAll = function (result) {
    let queryRaw = 'SELECT * FROM customers'
    sql.query(queryRaw, function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('customers: ', res)
        result(null, res)
    })
}

// READ BASE ON ID
Customer.findById = function (customerId, result) {
    let queryRaw = 'SELECT * FROM customers WHERE id='
    sql.query(queryRaw + customerId, function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        // there is value on the length when id founded (so it would be > 0)
        if (res.length) {
            console.log('found customer: ', res[0])
            result(null, res[0])
            return
        }

        // not found customer with the id
        result({
            kind: 'not found!'
        }, null)
    })
}

// UPDATE DATA BASE ON ID
Customer.updateById = function (customerId, customer, result) {
    let queryRaw = 'UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?'
    sql.query(queryRaw, [
        customer.email,
        customer.name,
        customer.active,
        customerId
    ], function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        // not found customer with the id
        if (res.affectedRows == 0) {
            result({
                kind: 'not found!'
            }, null)
            return
        }

        // if customer founded
        console.log('updated customer: ', {
            id: customerId,
            ...customer
        })
        result(null, {
            id: customerId,
            ...customer
        })
    })
}

// DELETE DATA BASE ON ID
Customer.delete = function (customerId, result) {
    let queryRaw = 'DELETE FROM customers WHERE id='
    sql.query(queryRaw + customerId, function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        // not found customer with the id
        if (res.affectedRows == 0) {
            result({
                kind: 'not found!'
            }, null)
            return
        }

        console.log('deleted customer with id: ', customerId)
        result(null, res)
    })
}

// DELETE ALL DATA IN THE TABLE
Customer.deleteAll = function (result) {
    sql.query('DELETE FROM customers', function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log(`deleted ${res.affectedRows} customers`)
        result(null, res)
    })
}

module.exports = Customer