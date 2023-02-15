const btnEl = document.querySelector('button');
const humiEl = document.querySelector('.humidity');
const windEl = document.querySelector('.wind');
const containerEl = document.querySelector('.container');
const errorEl = document.querySelector('.not-found');
const weatherboxEl = document.querySelector('.weather-box');


btnEl.addEventListener('click', () => {
    updateWeather();
});

function updateWeather() {
    const apiKey = '8e14ad8611e262f230afab32c9555557';
    const inputEl = document.querySelector('input').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputEl}&appid=${apiKey}`;

    const weatherData = {
        "01d": { description: "clear sky", imgSrc: "./images/clear-sky.png" },
        "01n": { description: "clear sky", imgSrc: "./images/clear-sky-night.png" },
        "02d": { description: "few clouds", imgSrc: "./images/few-clouds.png" },
        "02n": { description: "few clouds", imgSrc: "./images/few-clouds-night.png" },
        "03d": { description: "scattered clouds", imgSrc: "./images/scattered-clouds.png" },
        "03n": { description: "scattered clouds", imgSrc: "./images/scattered-clouds-night.png" },
        "04d": { description: "broken clouds", imgSrc: "./images/scattered-clouds.png" },
        "04n": { description: "broken clouds", imgSrc: "./images/scattered-clouds-night.png" },
        "09d": { description: "shower rain", imgSrc: "./images/shower-rain.png" },
        "09n": { description: "shower rain", imgSrc: "./images/shower-rain-night.png" },
        "10d": { description: "rain", imgSrc: "./images/shower-rain.png" },
        "10n": { description: "rain", imgSrc: "./images/shower-rain-night.png" },
        "11d": { description: "thunderstorm", imgSrc: "./images/thunderstorm.png" },
        "11n": { description: "thunderstorm", imgSrc: "./images/thunderstorm-night.png" },
        "13d": { description: "snow", imgSrc: "./images/snow.png" },
        "13n": { description: "snow", imgSrc: "./images/snow-night.png" },
        "50d": { description: "mist", imgSrc: "./images/mist.png" },
        "50n": { description: "mist", imgSrc: "./images/mist-night.png" },
      };

    weatherboxEl.classList.remove('active');  
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const weatherConditionCode = data.weather[0].icon;
            const weatherInfo = weatherData[weatherConditionCode];

            const weatherDescription = weatherInfo.description; 
            const weatherImgSrc = weatherInfo.imgSrc;

            
            document.querySelector(".description").textContent = weatherDescription;
            document.querySelector(".weather-box-img").setAttribute("src", weatherImgSrc); 
            
            errorEl.classList.remove('active');
            weatherboxEl.classList.add('active');
            
            const tempEl = document.querySelector('.temperature');
            let temp = data.main.temp;

            tempEl.innerText = Math.floor(temp-273) + "°";

            containerEl.style.height = "500px";
            humiEl.innerHTML = `
            <i class="fa-solid fa-water"></i>
            <div class="text">
                <span>${ data.main.humidity }</span>
                <p>Humidity</p>
            </div>
            `;
            windEl.innerHTML = `
            <i class="fa-solid fa-wind"></i>
            <div class="text">
                <span>${ data.wind.speed } km/h </span>
                <p>Wind Speed</p>
            </div>
            `;
        })
        .catch(error => {
            console.log(error)
            errorEl.classList.add("active");
            weatherboxEl.classList.remove('active');
            humiEl.innerHTML = ``;
            windEl.innerHTML = ``;
        });
}