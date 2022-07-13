const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.json());
app.use(cors({
    origin: '*'
}));



var router = require('./routes/router.js');
app.use(router)
app.listen(3000)
