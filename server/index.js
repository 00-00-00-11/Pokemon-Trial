if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};
const client = require('./db');
const {SERVER_PORT} = process.env;
const express = require('express');

const cors = require("cors");
const app = express();
const SERVEPORT = SERVER_PORT || 3000;
client.connect();//connect database

//middleware
app.use(cors());
app.use(express.json()); //req.body



//POST
app.post("/creatures", async(req,res) => {
    const text = `INSERT INTO public.creatures(poki_id,name,height,url,poki_img) VALUES($1,$2,$3,$4,$5) RETURNING *`;
    try{
        const{poki_id,name,height,url,poki_img} = req.body;
        const value = [poki_id,name,height,url,poki_img]
        const newPoki = await client.query(text,value);
        res.json(newPoki.rows[0])
    }
    catch(e){
        console.error(e.stack)
    }
})
// app.post("/ability", async(req,res) => {
//     const text = `INSERT INTO public.ability(ability_id,ability_name,amount_poki,total_height) VALUES($1,$2,$3,$4) RETURNING *`;
//     try{
//         const{ability_id,ability_name,amount_poki,total_height} = req.body;
//         const value = [ability_id,ability_name,amount_poki,total_height]
//         const newAbi = await client.query(text,value);
//         res.json(newAbi.rows[0])
//     }
//     catch(e){
//         console.error(e.stack)
//     }
// })


//GET
app.get("/creatures", async(req,res) => {
    try{

        const creatures = await client.query("select * from public.creatures");
        // console.table(creatures.rows);
        res.status(200).json(creatures.rows)
    }
    catch(e){
        console.error(e.stack)
    }
})
app.get("/creatures/:id", async(req,res) => {
    try{
        const{id} = req.params;
        let detailPokiText ="SELECT creatures.poki_id,creatures.name,creatures.height,creatures.poki_img,ability.ability_id,ability.ability_name FROM poki_able FULL OUTER JOIN creatures ON poki_able.poki_id = creatures.poki_id FULL OUTER JOIN ability ON poki_able.ability_id = ability.ability_id WHERE creatures.poki_id = $1"
        const creatures = await client.query(detailPokiText,[id]);
        // console.table(creatures.rows);
        res.status(200).json(creatures.rows)
    }
    catch(e){
        console.error(e.stack)
    }
})
app.get("/ability", async(req,res) => {
    try{

        const ability = await client.query("select * from public.ability");
        // console.table(creatures.rows);
        res.status(200).send(ability.rows)
    }
    catch(e){
        console.error(e.stack)
    }
})
app.get("/ability/:id", async(req,res) => {
    try{
        let detailAbilityText = "SELECT creatures.name,creatures.poki_id,creatures.poki_img,ability.ability_id,ability.ability_name FROM poki_able FULL OUTER JOIN creatures ON  poki_able.poki_id = creatures.poki_id FULL OUTER JOIN ability ON poki_able.ability_id = ability.ability_id WHERE ability.ability_id = $1"
        const{id} = req.params;
        const ability = await client.query(detailAbilityText,[id]);
        // console.table(creatures.rows);
        res.status(200).json(ability.rows)
    }
    catch(e){
        console.error(e.stack)
    }
})
//DELETE
app.delete("/creatures/:id",async(req,res) => {
    try{
        const{id} = req.params;
        const deleteCreature = await client.query("DELETE FROM public.creatures WHERE poki_id = $1",[id]);
        res.json({message: `successfully deleted ${id}`});
    }
    catch(e){
        console.error(e.stack)
    }
})


app.listen(SERVEPORT, () => {
    console.log(`EXPRESS SERVE ON PORT ${SERVEPORT}`)
  });



