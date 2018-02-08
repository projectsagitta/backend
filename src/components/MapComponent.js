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
            // this.recenterMap();
        }
    }
    componentDidMount(){
        this.loadMap();
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

            this.props.stations.map( (station) => {
                let latCoord = station.coord.lat;
                let lngCoord = station.coord.lon;
                stationData.push({
                    location: new google.maps.LatLng(latCoord, lngCoord)
                });

                const marker = new google.maps.Marker({
                    position: {lat: latCoord, lng: lngCoord},
                    map: this.map,
                    title: `${latCoord}, ${lngCoord}`                    
                });
                
                // return coordinatesArray;
            });
            // let centerCoords = null;
            // Promise.all(promiseCoord).then((results) => { 
            //     let centerLat = results.map((latitude) => {
            //         return latitude[0]
            //     }).reduce( ( a, b ) => a + b, 0 ) / results.length;
            //     centerLat = +(centerLat).toFixed(4);
            //    
            //     let centerLong = results.map((long) => {
            //         return long[1]
            //     }).reduce( ( a, b ) => a + b, 0 ) / results.length;
            //     centerLong = +(centerLong).toFixed(4);
            //    
            //     centerCoords = [centerLat, centerLong];
            //     return centerCoords;
            // }).then((coord) => {
            //     if(!coord.includes(NaN)){
            //         this.setState({
            //             currentLocation: {
            //                 lat: coord[0],
            //                 lng: coord[1]
            //             }
            //         });
            //     }   
            // });
            
        }
    }
    // center map considering markers' location center
    recenterMap = () => {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {            
            setTimeout(function(){
                let center = new maps.LatLng(curr.lat, curr.lng);
                map.panTo(center)
            }, 0);            
        }
    }

    render() {
        const styles = {
            map: {
                width: '100%',
                height: '100%'
            },
            wrapper: {
                width: '100%',
                height: '75vh'
            }
            
        };
        return (
            <div style={styles.wrapper}>
                <div ref="map" style={styles.map}>
                    loading map...
                </div>
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
    zoom: 3,
    initialCenter: {
        lat: 45,
        lng: 180
    }
};
