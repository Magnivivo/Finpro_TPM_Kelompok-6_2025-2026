//Logika buat nampilin data tim pada dashboard admin

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboard = async (req, res) => {
    try {
        //get team ID from Token
        const teamId = req.user.teamId;

        //get Team Data from database (- password)
        const team = await prisma.team.findUnique({
            where: { teamId: teamId },
            select: {
                teamId: true,
                teamName: true,
                Leader: true,
                members: {
                    select: {
                        userId: true,
                        Name: true,
                        email: true,
                        isBinusian: true,
                        Whatsapp: true,
                        LineID: true,
                        isLeader: true
                    }
                }
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

const listTeams = async (req, res) => {
    const { search, sortBy } = req.query;

    let orderBy = {};
    if (sortBy === 'name_asc') orderBy = { teamName: 'asc' };
    if (sortBy === 'name_desc') orderBy = { teamName: 'desc' };
    if (sortBy === 'newest') orderBy = { createdAt: 'desc' };
    if (sortBy === 'oldest') orderBy = { createdAt: 'asc' };

    try {
        const teams = await prisma.team.findMany({
            where: {
                teamName: { contains: search || "" } //utk fitur search
            },
            orderBy: orderBy,
            select: { teamId: true, teamName: true, Leader: true, createdAt: true }
        });
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: "Gagal mengambil data tim" });
    }
};

//melihat list data semua tim (search & sort)
const getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        const team = await prisma.team.findUnique({
            where: { teamId: id },
            select: {
                teamId: true,
                teamName: true,
                Leader: true,
                createdAt: true
            }
        });

        if (!team) {
            return res.status(404).json({ error: "Tim tidak ditemukan" });
        }

        res.json(team);
    } catch (error) {
        res.status(500).json({ error: "Gagal ambil data tim" });
    }
};

//edit tim
const updateTeam = async (req, res) => {
    const { id } = req.params;
    const data = req.body; // Data baru

    try {
        const updatedTeam = await prisma.team.update({
            where: { teamId: id },
            data: data
        });
        res.json({ message: "Update berhasil", data: updatedTeam });
    }
    catch (error) {
        res.status(500).json({ error: "Gagal melakukan edit data" });
    }
};

//hapus tim
const deleteTeam = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.team.delete({ where: { teamId: id } });
        res.json({ message: "Team berhasil dihapus" });
    }
    catch (error) {
        res.status(500).json({ error: "Penghapusan tim Gagal" });
    }
};

module.exports = {
    getDashboard,
    listTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};
