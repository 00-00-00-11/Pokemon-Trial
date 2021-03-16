import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../App.css";

export default class Nav extends Component {
    render(){
        const navStyle = {
            color:"white"
        };
        return(
            <div>
               <nav >
                 <h3>Pokemon!</h3>
                 <ul className="nav-links">
                  <Link style={navStyle} to="/ability"> 
                    <li >Abilities</li>
                  </Link>
                  <Link style={navStyle} to="/creatures">
                    <li >Creatures</li>
                  </Link>
                 </ul>
                </nav>
            </div>
            
        )
    }
       
}