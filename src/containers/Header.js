import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Menu } from 'antd'
import '../assets/styles/menu/styles.less'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (    
    <header style={styles.header}>
        <Row type="flex" justify="space-between">
            <Col span={8}>
                <Link to="/" style={styles.logo}>Sagitta</Link>
            </Col>
            <Col span={16}>
                <Row type="flex" justify="end">
                    <Col>                        
                        <Menu mode="horizontal">
                            <Menu.Item key="/"><Link to='/'>Home</Link></Menu.Item>
                            <Menu.Item key="/about"><Link to='/about'>About</Link></Menu.Item>
                            <Menu.Item key="/participate"><Link to='/participate'>Take part</Link></Menu.Item>
                            <Menu.Item key="/database"><Link to='/database'>Data access</Link></Menu.Item>
                            <Menu.Item key="/wiki"><Link to='/wiki'>Wiki</Link></Menu.Item>
                        </Menu>                        
                    </Col>
                </Row>
            </Col>
        </Row>        
    </header>
)

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