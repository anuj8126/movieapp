import React  from 'react';
import {Switch , Route} from 'react-router-dom';
import Home from './Components/Home';
import Details from './Components/Details';
function App() {
  let selectedCardId = localStorage.getItem("selectedCard");
  return (
    <div className="App">
     <Switch>
     <Route exact path  ="/" component = {Home}></Route>
     <Route path  ="/detail" component = {Details}></Route>
    </Switch>
    </div>
  );
}

export default App;
