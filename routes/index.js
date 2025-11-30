const express=require("express")
const { saveText, getHistory } = require("../controler")
const { asyncError } = require("../middleware/error")
const router=express.Router()
router.post('/save-text',asyncError(saveText))
router.get('/get-history',asyncError(getHistory))
module.exports =router