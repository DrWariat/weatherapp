const container = document.querySelector('.weather__container')
const search = document.querySelector('.weather__search')
const rezult = document.querySelector('.weather__rezult')
const details = document.querySelector('.weather__details')
const invalid = document.querySelector('.weather__invalid')
const btnRefresh = document.getElementById('invalid')

// two event start aplication - click and enter 
search.addEventListener('click', functioWeather)
search.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submit").click();
      }
})


// refresh invalid btn
btnRefresh.addEventListener('click', () => {
    window.location.reload()
})


// function api 
function functioWeather() {

    const APIKey = '0086f846a371b5f5ed3f177dee44f699';
    const city = document.querySelector('.weather__search input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '350px';
                search.style.display = 'none';
                details.style.display = 'none';
                rezult.style.display = 'none';
                invalid.style.display = 'block';
                invalid.classList.add('fadeIn');
                return;
            }

            invalid.style.display = 'none';
            invalid.classList.remove('fadeIn');

            const icon = document.querySelector('.weather__rezult i');
            const temperature = document.querySelector('.weather__rezult-temperature');
            const description = document.querySelector('.weather__rezult-description');
            const humidity = document.querySelector('.weather__details-humidity span');
            const wind = document.querySelector('.weather__details-wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                 icon.classList = 'bx bx-sun';
                    break;

                case 'Rain':
                 icon.classList = 'bx bx-cloud-rain';
                    break;

                case 'Snow':
                 icon.classList = 'bx bx-cloud-snow';
                    break;

                case 'Clouds':
                 icon.classList = 'bx bx-cloud';
                    break;

                case 'Haze':
                 icon.classList = 'bx bx-wind';
                    break;

                default:
                 icon.classList = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            rezult.style.display = '';
            details.style.display = '';
            rezult.classList.add('fadeIn');
            details.classList.add('fadeIn');
            container.style.height = '500px';


        });
    }
