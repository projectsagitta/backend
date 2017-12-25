import React, { Component } from 'react';
import MapComponent from './MapComponent';

class MapContainer extends Component {
    state = {
        stations: []
    }

    componentDidMount = () => {
        fetchStations()
            .then((json) => {
                this.setState({ stations: json.results }, )
            })
    };

    onFilter = (event) => {
        searchStations(event)
            .then((json) => {
                this.setState({ stations: json.results })
            })
    };

    render() {
        return (
            <div className="Map__container">                
                {/*<MapFilter onFilter={this.onFilter}/>*/}
                <MapComponent google={this.props.google} stations={this.state.stations} {...props} />                
            </div>
        );
    }
}

export default MapContainer;