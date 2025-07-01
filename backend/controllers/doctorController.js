import doctorModel from '../models/doctorModel.js';

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        // Find the doctor by ID and update their availability
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        });
        res.json({ success: true, message: "Availability changed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"]);
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

export { changeAvailability, doctorList };