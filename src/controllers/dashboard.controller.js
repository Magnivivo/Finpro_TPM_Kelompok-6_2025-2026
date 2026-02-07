//Logika buat nampilin data tim pada dashboard admin

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AdminDashboardData = async (req, res) => {
    try {
        //get team ID from Token
        const teamId = req.user.teamId;

        //get Team Data from database (- password)
        const team = await prisma.team.findUnique({
            where: { id: teamId },
            select: {
                groupName: true,
                binusian: true,
                fullName: true,
                email: true,
                whatsapp: true,
                lineId: true,
                githubId: true,
                birthPlace: true,
                birthDate: true,
                cvUrl: true,
                idCardUrl: true
            }
        });
        if (!team) {
            return res.status(404).json({ error: "Data tim tidak ditemukan" });
        }
            
        //Timeline data set
        const timelineData = [
            { event: "Open Registration", date: "2025-01-01" },
            { event: "Close Registration", date: "2025-02-01" },
            { event: "Technical Meeting", date: "2025-02-10", link: "https://zoom.us/j/123456" },
            { event: "Competition Day", date: "2025-02-15" }
        ];

        //contact person data
        const contactPerson = {
            name: "Panitia Hackathon",
            whatsapp: "08123456789",
            email: "info@technoscape.id"
        };

        //Send To front-end
        res.json({
            message: "Data berhasil diambil",
            teamData: team,
            timeline: timelineData,
            contact: contactPerson
        });
    }
    catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data dashboard" });
    }
};