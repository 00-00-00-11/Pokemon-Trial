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
        const{allAbilities} = this.state;
        return(
            <>
                <div className="Text-center mt-5 mb-5">
                    <h1>All Abilities</h1>
                    <div className="d-flex flex-column">
                    {allAbilities.map(ability =>
                        <div className="p-2">
                            <Link to={`/ability/${ability.ability_id}`}>
                            <button type="button" className="btn btn-success m-5 p-2 " key={ability.ability_id}>{ability.ability_name}</button>
                            </Link>
                            <div className="p-2">
                                <p >Total poki-height with {ability.ability_name}: {ability.total_height}</p>
                                <div className="p-2 mb-5">
                                    <p >How many Pokemon has {ability.ability_name}? {ability.amount_poki}</p>
                                </div>
                            </div>
                        </div>
                        
                    )}
                    </div>
                </div>
            </>
        )
    }
}