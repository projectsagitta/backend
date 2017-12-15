import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import Home from './Home'
import About from './About'
import Participate from './Participate'
import Database from './Database'
import Wiki from './Wiki'

const Main = () => (
    <main>
        <Grid>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/participate' component={Participate}/>
                <Route path='/database' component={Database}/>
                <Route path='/wiki' component={Wiki}/>
            </Switch>
        </Grid>    
    </main>
)

export default Main
