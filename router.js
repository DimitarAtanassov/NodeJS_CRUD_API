// Imports
const router = require("express").Router();
const {getUsers, createUser} = require("./controllers/user");

router.get("/", async (req,res) => {
    res.send("Lets build our CRUID API!");
});

router.post("/signup", createUser);



module.exports = router;