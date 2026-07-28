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
    console.log(response);
}

    
// Display Weather function
function displayWeatherInfo(data) {

    console.log(data);
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