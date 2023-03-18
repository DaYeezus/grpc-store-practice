const express = require("express")
const {mainRouter} = require("./routes/router");
const app = express()
app.use(express.json({}))
app.use(express.urlencoded({extended:true}))
app.use(mainRouter)
app.listen(3000 , () => {
    console.log("Client running on port 3000")
})