const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const posts = [
    {
        username: 'Upeksha',
        title: 'what is docker ?'
    },
    {
        username: 'jim',
        title: 'what is node.js'
    }
]

const users = [

]

// app.get('/posts', (req, res) => {
//     res.json(posts);
// })
//
// app.get('/login', (req, res) => {
//     // authenticate user
// })

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {name: req.body.name, password: hashedPassword};
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if (user == null) {
        return res.status(400).send('Can not find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send("Not allowed");
        }
    } catch (e) {
        res.status(500).send();
    }
})

app.listen(3000, () => {
    console.log('server started in port 3000');
});
