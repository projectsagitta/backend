import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header>
        <Menu secondary={true}>
            <Menu.Item as={NavLink} to='/' exact>Home</Menu.Item>
            <Menu.Item as={NavLink} to='/about'>About</Menu.Item>
            <Menu.Item as={NavLink} to='/participate'>Take part</Menu.Item>
            <Menu.Item as={NavLink} to='/database'>Data access</Menu.Item>
            <Menu.Item as={NavLink} to='/wiki'>Wiki</Menu.Item> 
        </Menu>        
    </header>
);

export default Header