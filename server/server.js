const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const PORT = process.env.PORT;
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    db.select('*').from('users')
        .then(users => res.json(users))
})

app.post('/register', (req, res) => { register.handleRegister(db, bcrypt)(req, res) })

app.post('/signin', (req, res) => { signin.handleSignin(db, bcrypt)(req, res) })

app.put('/image', (req, res) => { image.handleImage(db)(req, res) })

app.post('/imageUrl', (req,res) => { image.handleApiCall(req,res) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(db)(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})