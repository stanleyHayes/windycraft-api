const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {updateQuote, getQuotes, getQuote, deleteQuote} = require("../../../controllers/v1/admin/quotes");

const router = express.Router({mergeParams: true});

router.route("/")
    .get(authenticate, getQuotes);

router.route('/:id')
    .get(authenticate,getQuote)
    .put(authenticate,updateQuote)
    .delete(authenticate,deleteQuote);

module.exports = router;
