import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Menu } from 'antd'
import '../assets/styles/menu/styles.less'
import './Header.css'

class Header extends Component{
    constructor() {
        super();
        this.state = {
            isMobileVisible: false,
            current: '/'
        };
        this.toggleActiveClass= this.toggleActiveClass.bind(this);   
        this.handleLogoClick = this.handleLogoClick.bind(this);
    }
    toggleActiveClass() {
        const currentState = this.state.isMobileVisible;
        this.setState({ isMobileVisible: !currentState });
    }
    handleLogoClick() {
        this.setState({
            current: '/',
            isMobileVisible: false
        });
    }
    handleNavClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
            isMobileVisible: false
        });
    }
    render() {        
        return (
            <header style={styles.header}>
                <Row type="flex" justify="space-between">
                    <Col span={8}>
                        <Link to="/" onClick={this.handleLogoClick} style={styles.logo}>Sagitta</Link>
                    </Col>
                    <Col span={16}>
                        <Row type="flex" justify="end">
                            <Col>
                                <div className="header__menu-wrapper">
                                    <span className="header__trigger" onClick={this.toggleActiveClass}></span>
                                    
                                    <Menu className={`header__menu ${this.state.isMobileVisible ? 'header__menu--visible':null}`} 
                                          mode="horizontal" 
                                          selectedKeys={[this.state.current]}
                                          onClick={this.handleNavClick}
                                            >
                                        <Menu.Item key="/"><Link to='/' onClick={this.handleClick}>Home</Link></Menu.Item>
                                        <Menu.Item key="/about"><Link to='/about' onClick={this.handleClick}>About</Link></Menu.Item>
                                        <Menu.Item key="/participate"><Link to='/participate' onClick={this.handleClick}>Take part</Link></Menu.Item>
                                        <Menu.Item key="/database"><Link to='/database' onClick={this.handleClick}>Data access</Link></Menu.Item>
                                        <Menu.Item key="/wiki"><Link to='/wiki' onClick={this.handleClick}>Wiki</Link></Menu.Item>
                                    </Menu>
                                </div>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </header>
        )
    }
} 

const styles = {
    header: {
        padding: '0 50px 5px',
        marginBottom: '20px',
        borderBottom: '1px solid #ebebeb'
    },
    logo: {
        fontSize: '30px',
        fontWeight: 'bold'
    }
}

export default Header