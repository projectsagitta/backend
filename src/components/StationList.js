// OLD COMPONENT - IS NOT USED

import React, { Component, Fragment } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Layout, Row, Col } from 'antd'
const { Content } = Layout;

class StationList extends Component {
    constructor() {
        super();
        this.state = {
            stations: [],
            coord: ''
        };
    }       

    componentDidMount() {        
        fetch("https://dev.citizen-ocean.org/api/stations/").then(response => {            
            return response.json();
        }).then((jsonData) => {
            const coordObj = jsonData[0].coord;
            this.setState({coord: Object.values(coordObj)});
            this.setState({stations: jsonData[0].results});            
            
        }).catch(function() {
            console.log("error");
        })
    }

    render(){
        console.log(this.state.coord);
        const MapWithAMarker = withGoogleMap(props =>
            <GoogleMap
                defaultZoom={6}
                defaultCenter={{ lat: this.state.coord[0], lng: this.state.coord[1] }}
                defaultOptions={{
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}
                disableDefaultUI
            >
                <Marker
                    position={{ lat: this.state.coord[0], lng: this.state.coord[1] }}
                />
            </GoogleMap>
        );        
        const listItems = this.state.stations.map((result) => {
            return Object.keys(result).map((unit, index) => {
                return(
                    <li key={index}>
                        {unit}: {result[unit]}
                    </li>
                )
            })  
            
        });
        return(
            <Fragment>
                <div className="map__wrapper">
                    <MapWithAMarker
                        containerElement={<div style={{ height: `400px`, marginBottom: '20px' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
                <Content>
                    <ul className="content-list">
                        {listItems}
                    </ul>
                </Content>                   
            </Fragment>            
        );
    }
}

export default StationList;