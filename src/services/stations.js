export function fetchStations() {    
    return fetch("https://dev.citizen-ocean.org/api/stations/")
        .then((res) => res.json())
}

export function searchStations(event) {
    
    let esc = encodeURIComponent;
    let query = Object.keys(event)
        .map((k) => esc(k) + '=' + esc(event[k]))
        .join('&');
    // const minDate = event['min-date'];
    // const maxDate = event['max-date'];
    // https://dev.citizen-ocean.org/api/stations/query?
    // mindate=value&maxdate=value
    // &month=value&season=value&
    // minlat=value&maxlat=value&minlng=value&maxlng=value
    return fetch(`https://dev.citizen-ocean.org/api/stations/query?${query}`)
        .then((res) => res.json())
}