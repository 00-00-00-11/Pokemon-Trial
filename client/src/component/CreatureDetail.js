import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class CreatureDetail extends Component{
    constructor(){
        super();
        this.state ={
           creatureDetail:[], 
           creatureZero:[]
        };
    }
    componentDidMount = () => {
        const {id} = this.props.match.params
        fetch(`/creatures/${id}`)
             .then(res => res.json())
             .then(creatureDetail => this.setState({creatureDetail},() => console.log('Creatures Detail Fetched...',
             creatureDetail)))
    };
    render() {
        const {creatureDetail} = this.state;
        console.log(`HERE${creatureDetail[0]}`);
        return(
            <>
                <div class="Text-center mt-5 mb-5">
                    <h1>Creature Detail</h1>
                    <div class="d-flex flex-column mt-5">
                        {creatureDetail.slice(0,1).map(detail =>
                            <div class="p-2">
                                <p>Who Am I? </p>
                                <h3 class="mb-5"><b>{detail.name}</b></h3>
                                <p>ID: {detail.poki_id}</p>
                                <img src={`${process.env.PUBLIC_URL+detail.poki_img}`} alt={detail.name} />
                            </div>
                        )}
                    <div class="d-flex justify-content-center mt-5">
                        {creatureDetail.map(detail =>
                            <div class="p-2">
                                <Link to={`/ability/${detail.ability_id}`}>
                                <button type="button" class="btn btn-success m-5 p-2 " key={detail.ability_id}>{detail.ability_name}</button>
                                </Link>
                            </div>
                        )}

                    </div>
                    </div>
                </div>
            </>
            
        )
    }
}

