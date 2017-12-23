import React from 'react';
import { Layout, Row, Col } from 'antd'

const { Content } = Layout;
import StationList from '../components/StationList';

const Database = () => (
    <Content>
        <p>A map visualizing data collected is coming!</p>
        <StationList />
    </Content>
);

export default Database;