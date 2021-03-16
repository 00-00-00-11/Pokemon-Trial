import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AllCreatures extends Component{
    constructor(){
        super();
        this.state ={
           allCreatures:[] 
        };
    }
    componentDidMount = () => {
        fetch("/creatures")
             .then(res => res.json())
             .then(allCreatures => this.setState({allCreatures},() => console.log('Creatures Fetched...',
             allCreatures)));
    };
    render() {
        const {allCreatures} = this.state
        const sortByHeight = allCreatures.sort((a,b) => {
            return(a.height > b.height?1:-1);
        });
        return(
            <>
                <div class="Text-center mt-5 mb-5">
                    <h1>All Creatures</h1>
                    <div class="d-flex flex-column">
                    {sortByHeight.map(creature =>
                    <div class="p-2">
                        <Link to={`/creatures/${creature.poki_id}`}>
                        <button type="button" class="btn btn-warning m-5 p-2 " key={creature}>{creature.name}</button>
                        </Link>
                    </div>
                    )}
                    </div>
                </div>
            </>
            
        )
    }
}