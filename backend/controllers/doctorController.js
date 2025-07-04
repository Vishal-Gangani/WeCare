import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

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

//api for doctor login

const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find the doctor by email
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ message: "Doctor not found", success: false });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({success:true,token});
        }
        else{
            res.json({success:false, message: "Invalid credentials"});
        }

    } catch(error){
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//api to get doctor appointments

const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;

        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor };