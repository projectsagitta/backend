export function fetchStations() {    
    return fetch("https://dev.citizen-ocean.org/api/stations/")
        .then((res) => res.json())
}

export function searchStations(event) {
    const minDate = event['range-picker'][0];
    const maxDate = event['range-picker'][1];
    return fetch(`https://dev.citizen-ocean.org/api/stations/query?starttime=${minDate}&endtime=${maxDate}`)
        .then((res) => res.json())
}