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
                <div style={{paddingLeft: '50px', marginBottom: '20px'}}>
                    <Row>
                        <Col span={12}>
                            <MapFilter onFilter={this.onFilter} />
                        </Col>
                    </Row>                    
                </div>               

                <Route path="/" render={(props) => <MapComponent google={this.props.google} stations={this.state.stations} {...props} />}/>

            </div>
        );
    }
}

// export default MapContainer;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBRouyejGi9tN8SYy3ZoNGBJGvd5uATARA'
})(MapContainer)