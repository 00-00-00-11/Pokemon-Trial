import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AllCreatures extends Component{
    constructor(){
        super();
        this.state ={
           allCreatures:[],
           orderBy:'height',
           orderDir:'asc'
        };

    }
    componentDidMount = () => {
        fetch("/creatures")
             .then(res => res.json())
             .then(allCreatures => this.setState({allCreatures},() => console.log('Creatures Fetched...',
             allCreatures)));
    };
    render() {
        let order; //reverse the order
        const {allCreatures,orderDir,orderBy} = this.state;
        let filterAllCreatures = allCreatures;
        orderDir === 'asc'? order = 1: order=-1;
        filterAllCreatures.sort((a,b) => {
            return(a[orderBy] < b[orderBy]?-1*order:1*order);
        });
        

        return(
            <>
                <div className="Text-center mt-5 mb-5">
                    <h1>All Creatures</h1>
                    <div className="d-flex flex-column">
                    {filterAllCreatures.map(creature =>
                    <div className="p-2">
                        <Link to={`/creatures/${creature.poki_id}`}>
                            <button type="button" className="btn btn-warning m-5 p-2 " key={creature}>{creature.name}</button>
                        </Link>
                        <div className="p-2">
                            {creature.poki_img != null?
                            <img src={`${process.env.PUBLIC_URL+creature.poki_img}`} alt={creature.name} width={`${120+creature.height}`} height = {`${120+creature.height}`}/>:
                            <p>No Image For {creature.name} Sad Sad</p>}
                        </div>
                    </div>
                    )}
                    </div>
                </div>
            </>
            
        )
    }
}