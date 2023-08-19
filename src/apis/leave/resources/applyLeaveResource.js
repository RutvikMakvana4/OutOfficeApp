export default class ApplyLeaveResource {
    constructor(data) {
        this._id = data._id;
        this.fromDate = data.fromDate;
        this.toDate = data.toDate;
        this.numberOfDays = data.numberOfDays;
        this.isUrgent = data.isUrgent;
        this.reason = data.reason;
        this.projectName = data.projectName;
        this.helpingHand = data.helpingHand;
    }
}       