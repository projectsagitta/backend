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
                center: {lat: 40, lng: 180},
                zoom: 3,
                gestureHandling: "cooperative",
                disableDefaultUI: true,
                zoomControl: true
            });
            this.map = new maps.Map(node, mapConfig);
            let stationData = [];

            this.props.stations.map( (station) => {
                const coordinatesArray = Object.values(station.coord);
                stationData.push({
                    location: new google.maps.LatLng(coordinatesArray[0], coordinatesArray[1])
                });

                const marker = new google.maps.Marker({
                    position: {lat: coordinatesArray[0], lng:coordinatesArray[1]},
                    map: this.map,
                    title: `${coordinatesArray[0]}, ${coordinatesArray[1]}`,
                    // icon: {
                    //     url: ""
                    // }
                });
            })
            
            
        }
    }

    render() {
        const style = {
            width: '100%',
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