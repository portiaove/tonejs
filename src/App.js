import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Tone from './components/Tone'
import Drums from './components/Drums'
import MachineDrum from './components/maquina/808'


function App() {
  return (
    <div className="App">
      <Switch>
        < Route exact path='/808' component={MachineDrum} />
        < Route exact path='/drums' component={Drums}/>
        < Route path='/' component={Tone}/>
      </Switch>
    </div>
  );
}

export default App;
