const container = document.querySelector('.container');
const search    = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '1a8f8273544ed643905dfe03bb395950'
    const city = document.querySelector('.search-box input').value;

    if(city == '')
        return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        if(json.cod == '404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        // Set the temperature and description text
        temperature.innerHTML = `${json.main.temp}<span>°C</span>`;
        description.innerHTML = json.weather[0].description;

        // Set the humidity and wind values
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} km/h`;

        // Update image based on weather condition
        switch (json.weather[0].main) {

            case 'Clear':
                image.src = "Images/clear.jpg";
                break;

            case 'Clouds':
                image.src = "Images/cloud.png";
                break;

            case 'Mist':
                image.src = "Images/mist.jpg";
                break;

            case 'Rain':
                image.src = "Images/rain.jpeg";
                break;

            case 'Snow':
                image.src = "Images/snow.jpg";
                break;

            case 'Haze':
                image.src = "Images/mist.jpg";
                break;

            default:
                image.src = "Images/cloud.png";
        }
    });
});