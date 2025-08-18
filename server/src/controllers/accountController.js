const utilities = require("../utilities/");
const accountModel = require("../models/account-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../firebase");
require("dotenv").config();


/* ****************************************
*  Process Registration
* *************************************** */
async function processRegisterAccount(req, res) {
  try {
      const {
        account_firstname,
        account_lastname,
        account_email,
        firebase_uid
    } = req.body
    await accountModel.registerAccount(account_firstname, account_lastname, account_email, firebase_uid)
    res.status(201).json({ success: true });
  }
  catch (error) {
    res.status(500).json({ error: "Database insert failed" });
  }
}


/************************************************
*  Deliver account management view
* *************************************** */
async function buildAccountManagement(req, res, next) {
  let nav = await utilities.getNav()

  if (res.locals.loggedin) {
    const firstname = res.locals.accountData.account_firstname
    res.render("./account/account-management", {
      title: "Account Management",
      nav,
      firstname,
      errors: null
    })
  }

  // if (res.locals.loggedin && res.locals.accountData.account_type === 'Client') {
  //   res.render("./account/account-management", {
  //     title: "Account Management",
  //     nav,
  //     firstname,
  //     errors: null
  //   })
    
  // }
}

/* ****************************************
*  Process login request
* *************************************** */
// async function accountLogin(req, res) {
//   const { uid, token } = req.body;
//   console.log("Received UID:", uid, token);
//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     if (decoded.uid !== uid) {
//       return res.status(401).json({ error: "UID mismatch" });
//     }
//     // Find user in your database by UID
//     const user = await accountModel.getAccountByFirebaseId(uid);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

async function accountLogin(req, res) {
  try {
    const { uid } = req.body;
    const user = await accountModel.getAccountByFirebaseId(uid);
    res.json(user);
    console.log(user)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function logOut(req, res) {

  res.clearCookie("jwt")
  req.flash("success", "You have been logged out.")

  res.locals.accountData = null;
  if (req.session) req.session.destroy(() => {});

  const hasAccount =
    res.locals &&
    res.locals.accountData &&
    res.locals.accountData.account_id;

  return hasAccount ? res.redirect("back") : res.redirect("/");
}


/* ****************************************
*  Build update account view
* *************************************** */
async function buildUpdateAccount(req, res) {
  let nav = await utilities.getNav()
  const accountData = res.locals.accountData
  res.render("account/update", {
    title: "Update Account Information",
    nav,
    errors: null,
    account_id: accountData.account_id,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email,
  })
}


/* ****************************************
*  Process update account 
* *************************************** */
async function updateAccount(req, res) {
  let nav = await utilities.getNav()
  const account_id = parseInt(res.locals.accountData.account_id)
  const { account_firstname, account_lastname, account_email } = req.body
  const updateResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  )

  const accessToken = jwt.sign(updateResult, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
  res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })

  if (updateResult) {
    req.flash("success", "Your account has been updated successfully.")
    res.redirect("/")
  } else {
    req.flash("error", "Sorry, the update failed. Please try again.")
    res.status(501).render("account/update", {
      title: "Update Account",
      nav
    })
  }
}


/* ****************************************
*  Process update password
* *************************************** */
async function updatePassword(req, res) {
  let nav = await utilities.getNav()
  const account_id = parseInt(res.locals.accountData.account_id)
  const { account_password, account_password_confirm } = req.body
  if (account_password !== account_password_confirm) {
    req.flash("error", "Passwords do not match. Please try again.")
    return res.status(400).render("account/update", {
      title: "Update Account",
      nav,
      errors: null
    })
  }
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("error", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/update", {
      title: "Update Account",
      nav,
      errors: null,
    })
  }
  // Process the update password
  const updateResult = await accountModel.updatePassword(
    hashedPassword,
    account_id
  )

    
  if (updateResult) {
    req.flash(
      "success",
      `Congratulations, you've updated your password. Please log in again.`
    )
    res.clearCookie("jwt")
    // Clear the cookie and redirect to login
    let nav = await utilities.getNav()
    res.status(201).render("./account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("error", "Sorry, the registration failed.")
    res.status(501).render("account/update", {
      title: "Update Account",
      nav,
      errors: null,
    })
  }

}


module.exports = {
  processRegisterAccount,
  accountLogin,
  buildAccountManagement,
  logOut,
  buildUpdateAccount,
  updateAccount, 
  updatePassword
}