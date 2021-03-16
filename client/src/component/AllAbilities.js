import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AllAbilities extends Component{
    constructor(){
        super();
        this.state ={
           allAbilities:[] 
        };
    }
    componentDidMount = () => {
        fetch("/ability")
             .then(res => res.json())
             .then(allAbilities => this.setState({allAbilities},() => console.log('Ability Fetched...',
             allAbilities)));
    };
    render() {
        return(
            <>
                <div class="Text-center mt-5 mb-5">
                    <h1>All Abilities</h1>
                    <div class="d-flex flex-column">
                    {this.state.allAbilities.map(ability =>
                        <div class="p-2">
                            <Link to={`/ability/${ability.ability_id}`}>
                            <button type="button" class="btn btn-success m-5 p-2 " key={ability.ability_id}>{ability.ability_name}</button>
                            </Link>
                            <div class="p-2">
                                <p >Total poki-height with {ability.ability_name}: {ability.total_height}</p>
                                <div class="p-2">
                                    <p >How many Pokemon has {ability.ability_name}? {ability.amount_poki}</p>
                                </div>
                            </div>
                        </div>
                        
                    )}
                    </div>
                </div>
            </>
            // <>
            // <div>
            // <button key={this.state.ability_id}>{this.state.ability_name}</button>
            // </div>
            // <h1>Amount of pokemon who has the ability:{this.state.amount_poki}</h1>
            // <h1>Sum of poki height for this ability:{this.state.total_height}</h1>
            // </>
        )
    }
}