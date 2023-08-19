import Leave from "../../../model/leave";
import commonService from "../../../utils/commonService";
import ApplyLeaveResource from './resources/applyLeaveResource'

class leaveServices {

    static async applyLeave(data, auth, req, res) {
        const { fromDate, toDate, numberOfDays, isUrgent, reason, projectName, pendingWork, helpingHand } = data;

        const employeeLeave = await commonService.createOne(Leave, {
            employeeId: auth,
            fromDate: fromDate,
            toDate: toDate,
            numberOfDays: numberOfDays,
            isUrgent: isUrgent,
            reason: reason,
            projectName: projectName,
            pendingWork: pendingWork,
            helpingHand: helpingHand
        });

        return { ...new ApplyLeaveResource(employeeLeave) };

    }



    static async listOfLeaves(auth) {
        const employeeLeaveList = await commonService.findAllRecords(Leave, {
        })

        if (!employeeLeaveList) {
            throw new BadRequestException("leaves not found");
        } else {
            return employeeLeaveList;
        }
    }


    static async findLeave(query, req, res) {
        const { search } = query;
        console.log(query)

        const searchLeave = await commonService.findAllRecords(Leave, { reason: search })
        console.log(searchLeave)

        if (!searchLeave) {
            throw new BadRequestException("leaves not found");
        } else {
            return searchLeave;
        }
    }

}
export default leaveServices;

