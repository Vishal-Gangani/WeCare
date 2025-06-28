

const addDoctor = async (req, res) => { 

    try {
        const { name, email, password, image, speciality, degree, experience, about, available, fees, address, date } = req.body;

        const newDoctor = new doctorModel({
            name,
            email,
            password,
            image,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address,
            date
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ message: "Error adding doctor", error });
    }
}