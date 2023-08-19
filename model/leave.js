import { string } from "joi";
import mongoose from "mongoose";


const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,

    },
    numberOfDays: {
        type: Number,
        required: true,
    },
    isUrgent: {
        type: Boolean,
        required: true,
    },
    reason: {
        type: String,
        required: true
    },
    projectName: {
        type: String
    },
    pendingWork: {
        type: String
    },
    helpingHand: {
        type: String
    }
}, { timestamps: true });

//Export the model
const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;