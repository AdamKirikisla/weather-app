// Declare HTML classes
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "1c8c5c76c2b0d39d32109c088ed961e4";

//Forms Logic
weatherForm.addEventListener('submit',async event => {
    event.preventDefault();

    const city = cityInput.value;

    // if there is a city, i.e 'true'
    if(city){

        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }

        catch(error){
            console.error(error);
            displayError(error);
        }

    }

    else{
        displayError("Please enter a valid city!");
    }
});

// Axios Logic
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
    // .data is a property on the Axios response object.
    //response.data is the actual JSON returned by Axios from the API
    // used for displayWeatherInfo()
}

    
// Display Weather function
function displayWeatherInfo(cityData) {

    // Resets card
    card.textContent = "";
    card.style.display = "flex";

    // Object destructuring to access data var
    const {name: city,
         main: {temp, humidity},
        weather: [{description}]} = cityData;


    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);


}

// Display Error message
function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message
    errorDisplay.classList.add('errorDisplay');

    // Resets card
    card.textContent = "";
    card.style.display = "flex";

    card.appendChild(errorDisplay);
}