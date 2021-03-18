import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AllCreatures extends Component{
    constructor(){
        super();
        this.state ={
           allCreatures:[],
           orderBy:'height',
           orderDir:'asc',
           queryText:''
        };

    }
    searchBeast = (query) => { this.setState({ queryText: query });}
    componentDidMount = () => {
        fetch("/creatures")
             .then(res => res.json())
             .then(allCreatures => this.setState({allCreatures},() => console.log('Creatures Fetched...',
             allCreatures)));
    };
    render() {
        let order; //reverse the order
        const {allCreatures,orderDir,orderBy,queryText} = this.state;
        let filterAllCreatures = allCreatures;
        orderDir === 'asc'? order = 1: order=-1;
        filterAllCreatures =filterAllCreatures.sort((a,b) => {
            return (a[orderBy] < b[orderBy]?-1*order:1*order);
        }).filter(beast => {
            return (beast['name'].toLowerCase().includes(queryText.toLowerCase()))
        });
        

        return(
            <>
                <div className="all-creatures Text-center mt-5 mb-5">
                   
                    <h1 className=" ">All Creatures</h1>
               
                    <div className="search-beasts container p-4 pb-5">
                    <form >
                        <input
                          id="SearchBeast"
                          type="text"
                          className="form-control mt-3 mb-3 ml-5 mr-5 bg-warning border-dark border-4"
                          aria-label="Search Beast"
                          placeholder="TYPE BEAST NAME HERE TO SEARCH YOUR DIFFERNT TYPE OF BEAST"
                          onChange={e => this.searchBeast(e.target.value)}
                        />
                    </form>
                    </div>
                   
                    <div className="all-beasts-info d-flex flex-column">
                        {filterAllCreatures.map(creature =>
                        <div className="beast-link p-2">
                            <Link to={`/creatures/${creature.poki_id}`}>
                                <button type="button" className="beast-name btn btn-warning m-5 p-2 " key={creature.poki_id}>{creature.name}</button>
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