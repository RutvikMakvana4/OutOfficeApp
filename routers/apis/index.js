import express from "express";
const routes = express.Router();

routes.use('/auth', require('../../src/apis/auth/authRouter'));
routes.use('/leave', require('../../src/apis/leave/leaveRouter'));

module.exports = routes;