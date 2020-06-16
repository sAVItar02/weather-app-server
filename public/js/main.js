const inputField = document.querySelector('.weather-input')
const weatherForm = document.querySelector('form')
const description = document.querySelector('.description')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const icon = document.querySelector('.icon')
const loader = document.querySelector('.loader')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = inputField.value

    ClearInfo()

    fetch('/weather?address='+location)
    .then( (response) => {
    response.json().then((data) => {
        if(data.error)
        {
            ClearInfo()
            loader.style.display = 'none'
            temperature.textContent = data.error
        }
        else
        {
            DisplayInfo(data)
        }
        })
    })   
})

function ClearInfo(){
    loader.style.display = 'block'

    description.textContent = ''
    temperature.textContent = ''
    humidity.textContent = ''
    icon.innerHTML = ''
}

function DisplayInfo(data){
    loader.style.display = 'none'
    description.textContent = data.description
    temperature.textContent = 'The temperature is ' + data.temperature + ' and it feels like ' + data.feelslike
    humidity.textContent = 'Humidity is ' + data.humidity
    icon.innerHTML = `<img src=${data.icon}>`
}



