export function fetchStations() {    
    return fetch("https://dev.citizen-ocean.org/api/stations/")
        .then((res) => res.json())
}

export function searchStations(event) {    
    let esc = encodeURIComponent;
    let query = Object.keys(event)
        .map((k) => esc(k) + '=' + esc(event[k]))
        .join('&');    
    // https://dev.citizen-ocean.org/api/stations/query?
    // mindate=value&maxdate=value
    // &month=value&season=value&
    // minlat=value&maxlat=value&minlon=value&maxlon=value
    console.log(`stations/query?${query}`);
    return fetch(`https://dev.citizen-ocean.org/api/stations/query?${query}`)
        .then((res) => res.json())
}