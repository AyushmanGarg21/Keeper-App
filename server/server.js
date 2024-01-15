const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const keeperSchema = mongoose.Schema({
    title: String,
    content: String
})

const Keeper = new mongoose.model("Keeper", keeperSchema)


app.get("/api/getAll", (req, res) => {
    Keeper.find()
        .then((keeperList)=>{
            res.status(200).send(keeperList);
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.post("/api/addNew", (req, res) => {
    const { title, content } = req.body
    const keeperObj = new Keeper({
        title,
        content
    })
    keeperObj.save()
            .then(() => {
                Keeper.find()
                    .then((keeperList)=>{
                        res.status(200).send(keeperList);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            })
            .catch((err)=>{
                console.log(err);
            })

})

app.post("/api/delete", (req, res) => {
    const { id } = req.body
    Keeper.findOneAndDelete({ _id: id})
        .then(() => {
            Keeper.find()
                    .then((keeperList)=>{
                        res.status(200).send(keeperList);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
        })
        .catch((err)=>{
            console.log(err);
        })
})



app.listen( 5000, () => {
    console.log("Backend created at port 3000")
})