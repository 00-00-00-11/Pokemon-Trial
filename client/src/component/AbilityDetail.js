import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AbilityDetail extends Component{
    constructor(){
        super();
        this.state ={
           abilitiesDetails:[] 
        };
    }
    componentDidMount = () => {
        const {id} = this.props.match.params;
        fetch(`/ability/${id}`)
             .then(res => res.json())
             .then(abilitiesDetails => this.setState({abilitiesDetails},() => console.log('Ability Detail Fetched...',
             abilitiesDetails)));
    };
    render() {
        const {abilitiesDetails} = this.state;
        return(
            
            <>
                <div class="Text-center mt-5 mb-5">
                    <h1>Ability Details</h1>
                    <div class="d-flex flex-column">
                    {abilitiesDetails.map(detail =>
                        <div class="p-2">
                            <Link to={`/creatures/${detail.poki_id}`}>
                            <button type="button" class="btn btn-warning m-5 p-2 " key={detail.poki_id}>{detail.name}</button>
                            </Link>
                            <div class="p-2">
                                <p>ID: {detail.poki_id}</p>
                                <div class="p-2">
                                    <img src={detail.poki_img} alt={detail.name} width="500" height="600"/>
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