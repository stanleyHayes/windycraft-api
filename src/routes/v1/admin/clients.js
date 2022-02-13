const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    createClient,
    deleteClient,
    getClient,
    getClients,
    updateClient
} = require("../../../controllers/v1/admin/clients");

const router = express.Router({mergeParams: true});

router.route("/")
    .post(authenticate, createClient)
    .get(authenticate, getClients);

router.route('/:id')
    .get(authenticate, getClient)
    .put(authenticate, updateClient)
    .delete(authenticate, deleteClient);

module.exports = router;
