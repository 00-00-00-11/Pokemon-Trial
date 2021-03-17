import React,{Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "./component/Nav";
import AllAbilities from "./component/AllAbilities";
import AllCreatures from "./component/AllCreatures";
import AbilityDetail from "./component/AbilityDetail";
import CreatureDetail from "./component/CreatureDetail";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" >
          <Nav />
          <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/ability" exact component={AllAbilities}/>
          <Route path="/creatures" exact component={AllCreatures}/>
          <Route path="/ability/:id" component={AbilityDetail}/>
          <Route path="/creatures/:id" component={CreatureDetail}/>
          </Switch>
        </div>
      </Router>
      
    );
  }
}

const Home = () => {
  return(
    <div  class="Text-center mt-5 mb-5">
      <h1>Welcome to Pokemon</h1>
    </div>

  )
};

export default App;




