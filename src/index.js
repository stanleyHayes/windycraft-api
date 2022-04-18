const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userAgent = require("express-useragent");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {mongoURI} = require("../src/config/keys");

const adminV1AuthRoutes = require("./routes/v1/admin/authentication");
const adminV1AdminRoutes = require("./routes/v1/admin/admins");
const adminV1ClientRoutes = require("./routes/v1/admin/clients");
const adminV1FAQRoutes = require("./routes/v1/admin/faqs");
const adminV1InvitationRoutes = require("./routes/v1/admin/invitations");
const adminV1MessageRoutes = require("./routes/v1/admin/messages");
const adminV1QuoteRoutes = require("./routes/v1/admin/quotes");
const adminV1ServiceRoutes = require("./routes/v1/admin/services");
const adminV1ValueRoutes = require("./routes/v1/admin/values");
const adminV1TestimonialRoutes = require("./routes/v1/admin/testimonials");
const adminV1TeamMemberRoutes = require("./routes/v1/admin/team-members");


const userV1ClientRoutes = require("./routes/v1/user/clients");
const userV1FAQRoutes = require("./routes/v1/user/faqs");
const userV1MessageRoutes = require("./routes/v1/user/messages");
const userV1QuoteRoutes = require("./routes/v1/user/quotes");
const userV1ServiceRoutes = require("./routes/v1/user/services");
const userV1TeamMemberRoutes = require("./routes/v1/user/team-members");
const userV1TestimonialRoutes = require("./routes/v1/user/testimonials");

const app = express();
const server = app.listen();
server.setTimeout(500000);

dotenv.config();
mongoose.connect(mongoURI)
    .then(value => {
        console.log(`Connected to MongoDB on database ${value.connection.db.databaseName}`)
    }).catch(error => {
    console.log(`Error connecting to Mongo DB: ${error.message}`);
});

app.use(userAgent.express());
app.use(express.json({limit: '5mb'}));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));


app.use('/api/v1/user/services', userV1ServiceRoutes);
app.use('/api/v1/user/team-members', userV1TeamMemberRoutes);
app.use('/api/v1/user/clients', userV1ClientRoutes);
app.use('/api/v1/user/faqs', userV1FAQRoutes);
app.use('/api/v1/user/testimonials', userV1TestimonialRoutes);
app.use('/api/v1/user/messages', userV1MessageRoutes);
app.use('/api/v1/user/quotes', userV1QuoteRoutes);


app.use('/api/v1/admin/auth', adminV1AuthRoutes);
app.use('/api/v1/admin/admins', adminV1AdminRoutes);
app.use('/api/v1/admin/clients', adminV1ClientRoutes);
app.use('/api/v1/admin/faqs', adminV1FAQRoutes);
app.use('/api/v1/admin/invitations', adminV1InvitationRoutes);
app.use('/api/v1/admin/messages', adminV1MessageRoutes);
app.use('/api/v1/admin/quotes', adminV1QuoteRoutes);
app.use('/api/v1/admin/services', adminV1ServiceRoutes);
app.use('/api/v1/admin/values', adminV1ValueRoutes);
app.use('/api/v1/admin/testimonials', adminV1TestimonialRoutes);
app.use('/api/v1/admin/team-members', adminV1TeamMemberRoutes);

const PORT = process.env.PORT || 7003;
app.listen(PORT, () => {
    console.log(`Connected to server in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
