const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    acceptInvitation,
    createInvitation,
    deleteInvitation,
    getInvitation,
    getInvitations,
    rejectInvitation,
    revokeInvitation,
    updateInvitation
} = require("../../../controllers/v1/admin/invitations");

const router = express.Router({mergeParams: true});

router.route("/")
    .post(authenticate, createInvitation)
    .get(authenticate, getInvitations);

router.put('/:id/accept', acceptInvitation);
router.put('/:id/revoke', authenticate, revokeInvitation);
router.put('/:id/reject', rejectInvitation);

router.route('/:id')
    .get(authenticate, getInvitation)
    .put(authenticate, updateInvitation)
    .delete(authenticate, deleteInvitation);

module.exports = router;
