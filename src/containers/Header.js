import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/participate'>Take part</Link></li>
                <li><Link to='/database'>Data access</Link></li>
                <li><Link to='/wiki'>Wiki</Link></li>
            </ul>
        </nav>
    </header>
)

export default Header