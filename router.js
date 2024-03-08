const router = require("express").Router();

router.get("/", (req,res) => {
    res.send("Lets build our CRUID API!");
});

module.exports = router;