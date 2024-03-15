const express = require("express");

const router = express();

router.use("/job", require("../services/jobService"));
