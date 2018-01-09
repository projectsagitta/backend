import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class MapComponent extends Component {
    constructor(props){
        super(props);
        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }
    // renders the map on page load or after search
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google || prevProps.stations !== this.props.stations) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }
    
    loadMap = () => {
        if (this.props && this.props.google) {   
            
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);

            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                gestureHandling: "cooperative",
                disableDefaultUI: true,
                zoomControl: true
            });
            this.map = new maps.Map(node, mapConfig);
            
            let stationData = [];

            let promiseCoord = this.props.stations.map( (station) => {
                const coordinatesArray = Object.values(station.coord);
                stationData.push({
                    location: new google.maps.LatLng(coordinatesArray[0], coordinatesArray[1])
                });

                const marker = new google.maps.Marker({
                    position: {lat: coordinatesArray[0], lng:coordinatesArray[1]},
                    map: this.map,
                    title: `${coordinatesArray[0]}, ${coordinatesArray[1]}`                    
                });
                
                return coordinatesArray;
            });
            let centerCoords = null;
            Promise.all(promiseCoord).then((results) => { 
                let centerLat = results.map((latitude) => {
                    return latitude[0]
                }).reduce( ( a, b ) => a + b, 0 ) / results.length;
                centerLat = +(centerLat).toFixed(4);
                
                let centerLong = results.map((long) => {
                    return long[1]
                }).reduce( ( a, b ) => a + b, 0 ) / results.length;
                centerLong = +(centerLong).toFixed(4);
                
                centerCoords = [centerLat, centerLong];
                return centerCoords;
            }).then((coord) => {
                if(!coord.includes(NaN)){
                    this.setState({
                        currentLocation: {
                            lat: coord[0],
                            lng: coord[1]
                        }
                    });
                }   
            });
            
        }
    }
    // center map considering markers' location center
    recenterMap = () => {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center)
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

MapComponent.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
};

MapComponent.defaultProps = {
    zoom: 8,
    initialCenter: {
        lat: 40,
        lng: 180
    }
};
