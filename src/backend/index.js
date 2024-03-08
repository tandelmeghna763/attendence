const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const app = express();
const port = 8000;
const mongourl = "mongodb://localhost:27017/mydb"

app.use(cors())
app.use(express.json())
mongoose.connect(mongourl)
const db = mongoose.connection
db.on("error", (err) => {
    console.log("Mongodb Connection Error", err);
});
db.once("open", () => {
    console.log("Mongodb is Connected");
});

//shema
const Users = mongoose.model('studentdata3', {
    UserId: {
        type: Number,
    },
    Password: {
        type: String,
    }
});


app.post('/registation', async (req, res) => {
    let check = await Users.findOne({ UserId: req.body.UserId });
    if (check) {
        return res.status(400).json({ success: false, erroes: "Existing User Found with same email id." })
    }
    const user = new Users({
        UserId: req.body.UserId,
        Password: req.body.Password
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ags')
    res.json({ success: true, token })
});
//creating endpoin for userlogin
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ UserId: req.body.UserId });
    if (user) {
        const passCompare = req.body.Password == user.Password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ags')
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, error: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, error: "Wrong UserId" });

    }
})

app.post('/forgetpassword', (req, res) => {
    const { UserId, OldPassword, NewPassword } = req.body;

    // Find the user by UserId
    const userIndex = Users.findIndex(user => user.username === UserId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const user = Users[userIndex];

    if (user.password !== OldPassword) {
        return res.status(400).json({ message: 'Old password is incorrect' });
    }
    Users[userIndex].password = NewPassword;
    res.json({ message: 'Password changed successfully' });
});


app.listen(port)