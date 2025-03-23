import { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail } from "../services/emailService.js";

const prisma = new PrismaClient();

export const registerPatient = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    const photoFile = req.file;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    
    if (!fullName || !email || !phone || !photoFile) {
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

    const photoUrl = `/uploads/${photoFile.filename}`;

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


  export const updatePatient = async (req, res) => {
    try {
      const { id } = req.params;
      const { fullName, email, phone, photoUrl } = req.body;
  
      if (email && !email.toLowerCase().endsWith("@gmail.com")) {
        return res.status(400).json({ error: "Only Gmail addresses are allowed." });
      }
  
      const existingPatient = await prisma.patient.findUnique({ where: { id } });
      if (!existingPatient) {
        return res.status(404).json({ error: "Patient not found." });
      }
  
      const updateData = {};
      if (fullName !== undefined) updateData.fullName = fullName;
      if (email !== undefined) updateData.email = email;
      if (phone !== undefined) updateData.phone = phone;
      if (photoUrl !== undefined) updateData.photoUrl = photoUrl;
  
      const updatedPatient = await prisma.patient.update({
        where: { id },
        data: updateData
      });
  
      res.status(200).json(updatedPatient);
    } catch (error) {
      console.error("Error updating patient:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };


  export const deletePatient = async (req, res) => {
    try {
      const { id } = req.params;
  
      const existingPatient = await prisma.patient.findUnique({ where: { id} });
      if (!existingPatient) {
        return res.status(404).json({ error: "Patient not found." });
      }
  
      await prisma.patient.delete({
        where: { id }
      });
  
      res.status(200).json({ message: "Patient deleted successfully." });
    } catch (error) {
      console.error("Error deleting patient:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  