import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class MapComponent extends Component {
    // renders the map on page load or after search
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google || prevProps.stations !== this.props.stations) {
            this.loadMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: {lat: 0, lng: 180},
                zoom: 2,
                gestureHandling: "cooperative",
                mapTypeId: 'terrain'
            });
            this.map = new maps.Map(node, mapConfig);
            let stationData = [];

            this.props.stations.map( (station) => { 
                
                stationData.push({
                    location: new google.maps.LatLng(station.geometry.coordinates[1], station.geometry.coordinates[0])
                });

                const marker = new google.maps.Marker({
                    position: {lat: station.geometry.coordinates[1], lng: station.geometry.coordinates[0]},
                    map: this.map,
                    // title: station.properties.title,
                    // icon: {
                    //     url: ""
                    // }
                });
            })
            
            
        }
    }

    render() {
        const style = {
            width: '85vw',
            height: '75vh'
        };

        return (
            <div ref="map" style={style}>
                loading map...
            </div>
        )
    }
}

export default MapComponent;