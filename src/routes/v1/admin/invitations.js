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

router.get('/:id/accept', acceptInvitation);
router.get('/:id/revoke', authenticate, revokeInvitation);
router.get('/:id/reject', rejectInvitation);

router.route('/:id')
    .get(authenticate, getInvitation)
    .put(authenticate, updateInvitation)
    .delete(authenticate, deleteInvitation);

module.exports = router;
