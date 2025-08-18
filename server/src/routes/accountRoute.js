const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/account-validation")


// Route to process user registration
router.post("/users", utilities.handleErrors(accountController.processRegisterAccount))

// Route to get account by email
router.post("/auth/login", utilities.handleErrors(accountController.accountLogin))



module.exports = router