import React, {Fragment} from 'react';
import { Layout } from 'antd';
import '../assets/styles/layout/styles.less';
import Header from './Header';
import Main from './Main';
const { Content } = Layout;
const App = () => (
    <Fragment>
        <Header />
        <Content>
            <Main />
        </Content>         
    </Fragment>
);

export default App