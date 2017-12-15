import React from 'react'
import { Grid, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header style={{marginTop: '30px'}}>
        <Grid>
            <Nav bsStyle="pills" pullRight={true}> 
                <IndexLinkContainer to='/'><NavItem>Home</NavItem></IndexLinkContainer>    
                <LinkContainer to='/about'><NavItem>About</NavItem></LinkContainer>    
                <LinkContainer to='/participate'><NavItem>Take part</NavItem></LinkContainer>    
                <LinkContainer to='/database'><NavItem>Data access</NavItem></LinkContainer>    
                <LinkContainer to='/wiki'><NavItem>Wiki</NavItem></LinkContainer>                                
            </Nav>
        </Grid>
    </header>
)

export default Header