import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockPatients = [
  {
    fullName: "Catalina Martinez",
    email: "cata@gmail.com",
    phone: "+59812345678",
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    fullName: "Lucas Rodriguez",
    email: "lucia@gmail.com",
    phone: "+59898765432",
    photoUrl: "https://randomuser.me/api/portraits/men/66.jpg"
  },
  {
    fullName: "Jack Sparrow",
    email: "jack@gmail.com",
    phone: "+59898765432",
    photoUrl: "https://randomuser.me/api/portraits/men/62.jpg"
  }
];

async function main() {
    for (const patient of mockPatients) {
      const exists = await prisma.patient.findUnique({
        where: { email: patient.email }
      });
  
      if (!exists) {
        await prisma.patient.create({ data: patient });
      }
    }
  
    console.log("✅ Seed completed.");
  }
  
  main()
    .catch(e => {
      console.error("❌ Seed failed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });