const express = require("express");
const {
    createTestimonial,
    getTestimonials,
} = require("../../../controllers/v1/user/testimonials");

const router = express.Router({mergeParams: true});

router.route("/").post(createTestimonial).get(getTestimonials);

module.exports = router;
