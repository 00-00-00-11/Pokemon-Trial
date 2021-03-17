var text = "SELECT creatures.name,creatures.height,ability.ability_id,ability.ability_name FROM poki_able FULL OUTER JOIN creatures ON  poki_able.poki_id = creatures.poki_id FULL OUTER JOIN ability ON poki_able.ability_id = ability.ability_id WHERE ability.ability_id = $1";
var updateAmountPoki = "UPDATE ability SET amount_poki = $1 WHERE ability_id = $2";
var heightText = "SELECT creatures.height FROM poki_able FULL OUTER JOIN creatures ON  poki_able.poki_id = creatures.poki_id FULL OUTER JOIN ability ON poki_able.ability_id = ability.ability_id WHERE ability.ability_id = $1"
var updateHeightAbility = "UPDATE ability SET total_height = $1 WHERE ability_id = $2";
//update_amount_poki() //update amount_poki column in ability table
async function update_amount_poki() {
    try {
        await client.connect();
        console.log("Yeah Poki");
        // let amount_poki_ability = [];
        const ability = await client.query("SELECT * FROM ability");
        const abilityLength =  ability.rows.length;
        for( i = 1; i <= abilityLength ; i++) {
            const results = await client.query(text,[i]);
            if((results.rows.length) === 1 && results.rows[0].name == null) {
                const updateAmount = await client.query(updateAmountPoki,[0,i]);
            } else {
                const updateAmount = await client.query(updateAmountPoki,[results.rows.length,i]);
            }
            // amount_poki_ability.push()
        }

    }
    catch(e) {
        console.log(`${e.stack}`)
    }
    finally {
        await client.end();
        console.log("Bye Poki");
    }
}
// update_total_height_ability()//update total height column in ability table
async function update_total_height_ability() {
    try {
        await client.connect();
        console.log("Yeah Poki");
        // let amount_poki_ability = [];
        const ability = await client.query("SELECT * FROM ability");
        const abilityLength =  ability.rows.length;
        // console.log(heightAbility.rows)
        for (i = 1; i <= abilityLength; i++) {
            let sum = 0;
            const heightAbility = await client.query(heightText,[i]);
            for(j = 0; j <= heightAbility.rows.length - 1; j++) {
                sum += heightAbility.rows[j].height
            }
            // amount_poki_ability.push(sum)
            const updateHeight = await client.query(updateHeightAbility,[sum,i]);

        }
        
        // console.log(amount_poki_ability[157])

    }
    catch(e) {
        console.log(`${e.stack}`)
    }
    finally {
        await client.end();
        console.log("Bye Poki");
    }
}
