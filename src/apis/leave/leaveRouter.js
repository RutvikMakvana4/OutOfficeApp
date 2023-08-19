import express from "express";
import asyncWrap from "express-async-wrapper";
import leaveController from "./leaveController";

const routes = express.Router();
import authentication from "../../common/middleware/authentication";    
import validator from "../../common/config/joiValidation";
import { applyLeaveDto } from "./dtos/applyLeaveDto";


routes.post('/apply-leave',authentication, validator.body(applyLeaveDto), asyncWrap(leaveController.applyLeave));
routes.get('/leave-list', asyncWrap(leaveController.listOfLeaves));
routes.get('/find-leave', asyncWrap(leaveController.findLeave));

module.exports = routes;