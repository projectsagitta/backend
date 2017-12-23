import React, {Component, Fragment} from 'react';
import { Layout, Row, Col } from 'antd'
const { Content } = Layout;
import StationList from '../components/StationList';






class Database extends Component {
    render() {
        return (
            <Fragment> 
                <Content>
                    <h1>Data collection</h1>                
                </Content>
                <StationList />
            </Fragment>
        )
    }

} 
    
;

export default Database;