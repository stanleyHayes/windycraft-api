const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    approveTestimonial,
    refuseTestimonial,
    deleteTestimonial,
    updateTestimonial,
    getTestimonial,
    getTestimonials,
    createTestimonial
} = require("../../../controllers/v1/admin/testimonials");

const router = express.Router({mergeParams: true});

router.route("/")
    .post(authenticate, createTestimonial)
    .get(authenticate, getTestimonials);

router.put('/:id/refuse', authenticate, refuseTestimonial);
router.put('/:id/approve', authenticate, approveTestimonial);

router.route('/:id')
    .get(authenticate, getTestimonial)
    .put(authenticate, updateTestimonial)
    .delete(authenticate, deleteTestimonial);


module.exports = router;
