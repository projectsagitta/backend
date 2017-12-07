import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Participate from './Participate'
import Database from './Database'
import Wiki from './Wiki'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/participate' component={Participate}/>
            <Route path='/database' component={Database}/>
            <Route path='/wiki' component={Wiki}/>
        </Switch>
    </main>
)

export default Main
