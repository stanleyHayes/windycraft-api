const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    deleteValue,
    updateValue,
    getValue,
    getValues,
    createValue
} = require("../../../controllers/v1/admin/values");

const router = express.Router({mergeParams: true});

router.route("/")
    .post(authenticate, createValue)
    .get(authenticate, getValues);

router.route('/:id')
    .get(authenticate, getValue)
    .put(authenticate, updateValue)
    .delete(authenticate, deleteValue);

module.exports = router;
