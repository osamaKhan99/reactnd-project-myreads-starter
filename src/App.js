import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"
import Home from './home';
import './App.css'
import Search from './search';

class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;
