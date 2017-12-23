import React, {Fragment} from 'react';
import lazySizes from 'lazysizes';
import '../assets/styles/lazyLoad/styles.less';
import { Layout } from 'antd';
import '../assets/styles/layout/styles.less';
import { Button } from 'antd';
import '../assets/styles/button/styles.less';
import { Row, Col } from 'antd'

const { Content } = Layout;

const Home = () => (
    <section style={styles.bannerWrapper}>
        <img className="lazyload" src={require('../assets/media/IMG_4688-xs-min.jpg')} data-src={require('../assets/media/IMG_4688-min.jpg')} style={styles.banner} alt=""/>
        
        <h1 style={styles.bannerHeading}>Ocean Citizen Science Projects</h1>
        
        <Content>
            <Row>
                <Col span={16} offset={4}>
                    <p>
                        The project is based on the idea of citizen science. This approach allows for
                        substantial data collection by volunteering parties as well as scientific
                        education of general public and science popularization. As we live in the era
                        of wide use of electronics and informatics in all aspects of life, all necessary
                        technologies already exist for wider implementation of this concept.
                        Nowadays smartphones are turned into platforms for collecting useful
                        information about their location and conditions of the environment. Every
                        smartphone has several sensors (camera, accelerometer, gyroscope etc.)
                        which may be used as sources of information. As technologies being
                        continuously developed, smartphones with mobile internet connection
                        become accessible for the most part of population even in developing
                        countries. However, it is barely possible to collect valuable oceanographic
                        information with standard smartphone sensors.
                    </p>
                    <p>
                        Every modern oceanographic survey relies on special equipment. The
                        simplest examples of these include conductivity-temperature- depth probes
                        (CTD) which exist in hundreds of different forms, from compact packages to
                        large autonomous robots. These machines are essential for collecting basic
                        physical oceanographic data worldwide. However, the demand in this
                        equipment is still quite limited making their production relatively expensive.
                        That is why we came out with an idea of cheap yet reliable pocket version of
                        simple CTD probe.
                    </p>
                </Col>    
            </Row>    
            
            <Button type="primary">Primary</Button><br/><br/>
            <Button>Default</Button><br/><br/>
            <Button type="dashed">Dashed</Button><br/><br/>
            <Button type="danger">Danger</Button><br/><br/>
            <div style={{display: 'flex', marginBottom: '50px'}}>
                <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#2973b4' }}></div>
                <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#058ceb' }}></div>
                <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#73c4d7' }}></div>
                <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#fafafa' }}></div>
                <div style={{display: 'inline-flex', width: '100px', height: '100px', backgroundColor: '#ebebeb' }}></div>            
            </div>
        </Content>
        
    </section>
);

const styles ={
    bannerWrapper: {
        position: 'relative',
        marginTop: '-21px'
    },
    banner: {
        width: '100%',
        display: 'block',
        height: 'calc(100vh - 47px)',
        objectFit: 'cover',
        objectPosition: '0 50%',
        marginBottom: '30px'
    },
    bannerHeading: {
        position: 'absolute',
        top: '40px',
        left: '50px',
        fontSize: '35px'
    }
}

export default Home;