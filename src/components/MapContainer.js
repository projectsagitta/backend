import React, { Component } from 'react';

import {  Row, Col } from 'antd'
import MapComponent from './MapComponent';
import MapFilter from './MapFilter';
import {fetchStations} from "../services/stations";
import {searchStations} from "../services/stations";

import { Route } from 'react-router-dom';

import { GoogleApiWrapper } from 'google-maps-react'; 

class MapContainer extends Component {
    
    constructor() {
        super();
        this.state = {
            stations: []            
        };
        this.onFilter = this.onFilter.bind(this); 
    }

    componentDidMount() {
        fetchStations()
            .then((json) => {
                console.log(json);
                this.setState({ stations: json }, )
            })
    };

    onFilter(event) {
        searchStations(event)
            .then((json) => {
                console.log(json);
                this.setState({ stations: json })
            })
    };

    render() {
        return (
            <div className="Map__container">
                <div style={{paddingLeft: '50px', paddingRight: '50px'}}>
                    <Row>
                        <Col xs={{span:8}} lg={{span:6}}>
                            <MapFilter onFilter={this.onFilter} />
                        </Col>
                        <Col xs={{span:16}} lg={{span:18}}>
                            <Route path="/" render={(props) => <MapComponent google={this.props.google} stations={this.state.stations} {...props} />}/>
                        </Col>
                    </Row>                    
                </div>               

                
            </div>
        );
    }
}

// export default MapContainer;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBRouyejGi9tN8SYy3ZoNGBJGvd5uATARA'
})(MapContainer)