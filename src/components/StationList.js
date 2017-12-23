import React, { Component } from 'react';

class StationList extends Component {
    constructor() {
        super();
        this.state = {
            stations: []
        };
    }   

    loadStations() {   
        
    }

    componentDidMount() {
        // this.loadStations();
        fetch("https://dev.citizen-ocean.org/api/stations/").then(response => {            
            return response.json();
        }).then((jsonData) => {
            this.setState({stations: jsonData[0].results});            
            
        }).catch(function() {
            console.log("error");
        })
    }

    render(){
        console.log(this.state.stations);
        return(
            <div className="content-list">
                {/*{this.state.stations.toString()}*/}
                {/*{this.state.stations.map((station) => {*/}
                        {/*{station.toString();}*/}
                    {/*}*/}
                {/*)}*/}
            </div>
        );
    }
}

export default StationList;