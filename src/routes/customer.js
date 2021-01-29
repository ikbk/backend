const { Router } = require('express')
const router = Router()
const customerModel = require('../controllers/customer')

router.get('/router-customer', (req, res) =>{
    res.status(200).send({msg: 'selamat anda sudah sampai ke halaman customer routes'})
})

// Create a new Customer
router.post('/customers', customerModel.create)

// Retrieve all Customers
router.get('/customers', customerModel.findAll)

// Retrieve a single Customer with customerId
router.get('/customers/:customerId', customerModel.findOne)

// Update a Customer with customerId
router.put('/customers/:customerId', customerModel.update)

// Delete a Customer with cutomerId
router.delete('/customers/:customerId', customerModel.delete)

// Delete all Customers
router.delete('/customers', customerModel.deleteAll)

module.exports = router