import React, {Fragment} from 'react';
import { Button } from 'antd';
import '../assets/styles/button/styles.less';
const Home = () => (
    <Fragment>
        <img src="../assets/media/IMG_4688-min.jpg" alt=""/>
        <h1>Welcome to the Sagitta Website!</h1>
        <div style={{display: 'flex', marginBottom: '50px'}}>
            <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#2973b4' }}></div>
            <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#058ceb' }}></div>
            <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#73c4d7' }}></div>
            <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#fafafa' }}></div>
            <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#ebebeb' }}></div>
            
        </div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
    </Fragment>
);

export default Home;