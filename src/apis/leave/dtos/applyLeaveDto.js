import Joi from "joi";

export const applyLeaveDto  = Joi.object().keys({
    fromDate: Joi.date().required(),
    toDate: Joi.date().required(),
    numberOfDays: Joi.number().required(),
    isUrgent: Joi.boolean().required(),
    reason: Joi.string().required(),
    projectName: Joi.string(),
    pendingWork: Joi.string(),
    helpingHand: Joi.string(),
});