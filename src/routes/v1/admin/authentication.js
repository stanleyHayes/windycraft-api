const express = require("express");
const {
    register,
    login,
    changePassword,
    forgotPassword,
    getProfile,
    resendOTP,
    resetPassword,
    updateProfile,
    verifyAccount, logout, logoutAll
} = require("../../../controllers/v1/admin/authentication");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");

const router = express.Router({mergeParams: true});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/logoutAll', authenticate, logoutAll);
router.post('/change-password', authenticate, changePassword);
router.post('/forgot-password', forgotPassword);
router.get('/profile', authenticate, getProfile);
router.post('/reset-password', authenticate, resetPassword);
router.put('/profile', authenticate, updateProfile);
router.post('/account/verify/:token', verifyAccount);

module.exports = router;
