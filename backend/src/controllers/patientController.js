import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerPatient = async (req, res) => {
  try {
    const { fullName, email, phone, photoUrl } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const existing = await prisma.patient.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({ error: "El correo electrónico ya está registrado." });
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
  } catch (error) {
    console.error("Error al registrar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getAllPatients = async (req, res) => {
    try {
      const patients = await prisma.patient.findMany();
  
      if (patients.length === 0) {
        return res.status(200).json({ message: "No hay pacientes en la base de datos." });
      }
  
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
      res.status(500).json({ error: "Error interno al obtener pacientes." });
    }
}
