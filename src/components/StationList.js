import React, { Component } from 'react';

class StationList extends Component {

    state = {
        stations: []
    };

    async loadStations() {
        this.setState({
            stations: await fetch("https://kor.su/api/stations/")
                .then(response =>response.json())
                .catch(function() {
                    console.log("error");
                })
        })
    }

    componentDidMount() {
        this.loadStations();
        console.log('test', this.state.stations);
    }

    render(){
        return(
            <ul className="content-list">
                {/*{this.state.stations.map((station, index) => (*/}
                    {/*<li className="content-list__item" key={index}>*/}
                        {/**/}
                    {/*</li>*/}
                {/*))}*/}
            </ul>
        );
    }
}

export default StationList;