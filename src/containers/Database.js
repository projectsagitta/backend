import React, {Component, Fragment} from 'react';
import { Layout } from 'antd'
const { Content } = Layout;
import MapContainer from '../components/MapContainer';

class Database extends Component {
    render() {
        return (
            <Fragment> 
                <Content>
                    <h1>Data collection</h1>                
                </Content>
                <MapContainer />
            </Fragment>
        )
    }
};

export default Database;