import React, {Component} from "react";

export default class AbilityDetail extends Component{
    constructor(){
        super();
        this.state ={
           abilitiesDetails:[] 
        };
    }
    componentDidMount = () => {
        const {id} = this.props.match.params
        fetch(`/ability/${id}`)
             .then(res => res.json())
             .then(abilitiesDetails => this.setState({abilitiesDetails},() => console.log('Ability Detail Fetched...',
             abilitiesDetails)));
    };
    render() {
        return(
            <>
                <div class="Text-center mt-5 mb-5">
                    <h1>Ability Details</h1>
                    <div class="d-flex flex-column">
                    {this.state.abilitiesDetails.map(detail =>
                        <div class="p-2">
                            <button type="button" class="btn btn-warning m-5 p-2 " key={detail.poki_id}>{detail.name}</button>
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