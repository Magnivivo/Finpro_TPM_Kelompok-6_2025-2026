// isinya rute /admin & /team access

const express = require("express");
const router = express.Router();

const adminController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/dashboard", adminController.getDashboard);

router.get("/teams", adminController.listTeams);
router.post("/teams", adminController.createTeam);
router.get("/teams/:id", adminController.getTeamById);
router.put("/teams/:id", adminController.updateTeam);
router.delete("/teams/:id", adminController.deleteTeam);

module.exports = router;