const mapbox = document.querySelector('.mapbox-call')
const mapboxBuffer = document.querySelector('.call')

mapbox.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/bangalore.json?access_token=pk.eyJ1Ijoic2F2aXRhcjAyIiwiYSI6ImNrOGM1ZXo5OTAyY3Yzbm9jdHJ1bTVyajcifQ.15iE2VXcOcKOI1w6_tU2UQ&limit=5')
    .then( (response) => {
        response.json().then( (data) => {
            mapboxBuffer.textContent = data.features[0]         
        } )
    })
})