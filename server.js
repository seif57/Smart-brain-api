import express, { response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import {handleImage as image,
        handleApiCall } from './controllers/image.js'
import profile from './controllers/profile.js';
import signin from './controllers/signin.js';
import register from './controllers/register.js';



const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

const app = express();
app.use(express.json());
app.use(cors());
const saltRounds = 10;

app.post('/signin', (req,res)=>{signin(req,res,db,bcrypt)});//DONE  
app.post('/register',(req,res)=>{register(req,res,db,bcrypt,saltRounds)});
app.get('/profile/:id',(req,res)=>{profile(req,res,db)});//  (Gettin User Info)
app.put('/image',(req,res)=>{image(req,res,db)});  //  (Updating enteries )
app.post('/imageurl',(req,res)=>{handleApiCall(req,res,db)});  //  (API HANDLER)


app.listen(3000, () => {
    console.log('app is runnig on port 3000')
});
