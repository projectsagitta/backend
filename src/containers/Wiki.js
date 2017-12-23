import React from 'react'
import { Layout, Row, Col } from 'antd'
const { Content } = Layout;
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const text = (
    <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
    </p>
);

const Wiki = () => (
    <Content>
        <p>Having questions about oceanography? We will try to answer them.</p>
        <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="This is question 1" key="1">
                {text}
            </Panel>
            <Panel header="This is question 2" key="2">
                {text}
            </Panel>
            <Panel header="This is question 3" key="3">
                {text}
            </Panel>
        </Collapse>
    </Content>
);

export default Wiki