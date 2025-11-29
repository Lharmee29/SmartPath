const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./UserSchema');
app.use(express.json());
app.use(cors())
app.listen(9000, ()=> {
    console.log('Server Started at ${9000}')
})

const mongoose = require('mongoose');
const mongoString = "mongodb+srv://ggduplan23:IbfP35dg8N2etsBm@cluster0.ycfq01g.mongodb.net/cluster0"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Databased Connected'))

app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`)
    const un = req.body.username
    try {
        User.exists({username: un}).then(result => {
            if(Object.is(result, null)) {
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else {
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (error){

        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    //console.log(`SERVER: GET USER REQ BODY: ${req.query}`)
    //console.log(req.query)
    console.log("SERVER: GET USER REQ BODY: %j", req.query)

    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})


