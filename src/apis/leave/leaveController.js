
import leaveServices from "./leaveServices";


class leaveController {
    static async applyLeave(req, res) {
        console.log(req.body)
        const data = await leaveServices.applyLeave(req.body, req.user, req, res);
        return res.send({ message: "Employee apply leave successfully", data });
    }

    static async listOfLeaves(req, res) {
        const data = await leaveServices.listOfLeaves(req, res);
        return res.send({ message: "This employees are on leave today", data });
    }


    static async findLeave(req, res) {
       const data = await leaveServices.findLeave(req.query, req, res);
        return res.send({ message: "get your leave", data })
    }



}

export default leaveController;