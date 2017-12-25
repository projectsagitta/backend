export function fetchStations() {    
    return fetch("https://dev.citizen-ocean.org/api/stations/")
        .then((res) => res.json())
}

export function searchStations(event) {
    const minDate = event.target.min.value;
    const maxDate = event.target.max.value;
    return fetch(`https://dev.citizen-ocean.org/api/stations/query?starttime=${minDate}&endtime=${maxDate}`)
        .then((res) => res.json())
}