const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    deleteService,
    updateService,
    getService,
    getServices,
    createService
} = require("../../../controllers/v1/admin/services");

const router = express.Router({mergeParams: true});

router.route("/")
    .post(authenticate, createService)
    .get(authenticate, getServices);

router.route('/:id')
    .get(authenticate, getService)
    .put(authenticate, updateService)
    .delete(authenticate, deleteService);

module.exports = router;
