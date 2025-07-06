import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

const changeAvailability = async (req, res) => {
    try {
        const docId = req.docId || req.body.docId;

        // Find the doctor by ID and update their availability
        const docData = await doctorModel.findById(docId);
        
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

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
        const docId = req.docId;

        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//api to mark appointment as completed
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.docId;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId.toString() === docId) {
            
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                isCompleted: true
            });
            return res.json({ success: true, message: "Appointment completed" });

        } else {
            return res.json({ success: false, message: "Mark failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//api to cancel appointment by doctor
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.docId;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId.toString() === docId) {
            
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                cancelled: true
            });
            return res.json({ success: true, message: "Appointment cancelled" });

        } else {
            return res.json({ success: false, message: "Cancel failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//api to get dashboard data for doctor

const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId;

        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });

        let patients = [];
        appointments.map((item) => {
            if (!patients.includes(item.userId.toString())) {
                patients.push(item.userId.toString());
            }
        });

        const dashData = {
            appointments: appointments.length,
            earnings,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//doctor profile api
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select("-password");
        res.json({ success: true, profileData });

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//api to change doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        const { fees, address, available } = req.body;
        const docId = req.docId;

        await doctorModel.findByIdAndUpdate(docId, {
            fees,
            address,
            available
        });

        res.json({ success: true, message: "Profile updated" });

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel , appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile };