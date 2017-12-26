import React, { Component } from 'react';
import {  Row, Col } from 'antd'
import MapComponent from './MapComponent';
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
    }

    componentDidMount() {
        fetchStations()
            .then((json) => {
                this.setState({ stations: json }, )
            })
    };

    onFilter(event) {
        searchStations(event)
            .then((json) => {
                this.setState({ stations: json })
            })
    };

    render() {
        return (
            <div className="Map__container">
                <Row>
                    <Col span={6}>
                        {/*<MapFilter onFilter={this.onFilter}/>*/}
                    </Col>
                    <Col span={18}>
                        <Route path="/" render={(props) => <MapComponent google={this.props.google} stations={this.state.stations} {...props} />}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

// export default MapContainer;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBRouyejGi9tN8SYy3ZoNGBJGvd5uATARA'
})(MapContainer)