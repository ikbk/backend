const Customer = require('../models/customer')

// Create and save new Customer
exports.create = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            msg: 'Content can not be empty'
        })
    }

    // Create a Customer
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    })

    // Save Customer in teh database
    Customer.create(customer, function (err, data) {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error accurred while creating the Customer.'
            })
        } else res.send(data)
    })
}

// Retrieve all Customers from the database
exports.findAll = function (req, res) {
    Customer.getAll(function (err, data) {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error accurred while retrieving Customers.'
            })
        } else res.send(data)
    })
}

// Find  single Customer with a customerId
exports.findOne = function (req, res) {
    const customerId = req.params.customerId
    Customer.findById(customerId, function (err, data) {
        if (err) {
            if (err.kind === 'not found') {
                res.status(404).send({
                    message: 'Not found Customer with id ' + customerId
                })
            } else {
                res.status(500).send({
                    message: 'Error retrieving Customer with id ' + customerId
                })
            }
        } else res.send(data)
    })
}

// Update a Customer identified by the customerId in the request
exports.update = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            msg: 'Content can not be empty'
        })
    }

    // Update data Customer
    const customerId = req.params.customerId
    Customer.updateById(customerId, new Customer(req.body),
        function (err, data) {
            if (err) {
                if (err.kind === 'not found') {
                    res.status(404).send({
                        message: 'Not found Customer with id ' + customerId
                    })
                } else {
                    res.status(500).send({
                        message: 'Error updating Customer with id ' + customerId
                    })
                }
            } else res.send(data)
        })
}

// Delete a Customer with the specified customerId in the request
exports.delete = function (req, res) {
    const customerId = req.params.customerId
    Customer.delete(customerId, function (err, data) {
        if (err) {
            if (err.kind === 'not found') {
                res.status(404).send({
                    message: 'Not found Customer with id ' + customerId
                })
            } else {
                res.status(500).send({
                    message: 'Could not delete Customer with id ' + customerId
                })
            }
        } else res.send({
            message: 'Customer was deleted successfully!'
        })
    })
}

// Delete all Customers from the database
exports.deleteAll = function (req, res) {
    Customer.deleteAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error accurred while removing all Customers.'
            })
        } else res.send({
            message: 'All Customers were deleted successfully!'
        })
    })
}

