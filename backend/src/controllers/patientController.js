import { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail } from "../services/emailService.js";

const prisma = new PrismaClient();

export const registerPatient = async (req, res) => {
  try {
    const { fullName, email, phone, photoUrl } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ error:  "All fields are required."  });
    }

    const existing = await prisma.patient.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    // Validate that email is from Gmail
    if (!email.toLowerCase().endsWith("@gmail.com")) {
        return res.status(400).json({ error: "Only Gmail addresses are allowed." });
    }

    const newPatient = await prisma.patient.create({
      data: {
        fullName,
        email,
        phone,
        photoUrl
      }
    });

    res.status(201).json(newPatient);
    //Send Confirmation
    sendConfirmationEmail(email, fullName);
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getAllPatients = async (req, res) => {
    try {
      const patients = await prisma.patient.findMany();
  
      if (patients.length === 0) {
        return res.status(200).json({ message: "No patients found in the database." });
      }
  
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error retrieving patients:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
