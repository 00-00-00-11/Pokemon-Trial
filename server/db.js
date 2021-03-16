const {
    USER,
    PASSWORD,
    HOST,
    PORT,
    DATABASE
}= process.env;

const {Client} = require('pg');
const client = new Client({
    user: USER,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    database:DATABASE
});

module.exports =client;

// execute()

// //insert 'Dumberthandumb'
// const insertText = "INSERT INTO public.creatures(poki_id,name,height,url,poki_img,creature_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
// const insertValues = ['C899','Dumberthandumb',null,null,null,null];
// async function execute() {
//     try {
//         await client.connect();
//         console.log("Yeah Poki");
//         // const res = await client.query(insertText,insertValues);
//         // console.log(res.rows[0])
//         const results = await client.query("select * from public.creatures");
//         console.table(results.rows);
//     }
//     catch(e) {
//         console.log(`${e.stack}`)
//     }
//     finally {
//         await client.end();
//         console.log("Bye Poki");
//     }
// }

// client.connect()
// .then(() => console.log("Yeah Poki"))
// .then(() => client.query(("insert into public.creatures value($1,$2,$3,$4,$5,$6)",['C899','Dumberthandumb',null,null,null,null]))
// .then(() => client.query("select * from public.creatures" ))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() =>client.end())