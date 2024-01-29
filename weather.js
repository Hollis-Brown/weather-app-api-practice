// Required parts to this Fetch() API project
// 1. Fetch() API
// 2. DOM Manipulation
// 3. Event Listeners
// 4. Local Storage
// 5. .json() method
// 6. .then() method
// 7. Promise.all() and Promise.any() methods
// 8. Use async and await keywords
// 9. A function that uses web-workers to convert celcius to fahrenheit 

// Initialization of DOM elements
const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const weatherContainer = document.getElementById('weatherContainer');
const quoteHeader = document.getElementById('quote_header'); // Change this to quote_header

// Variables to store user input and weather data
let city = '';
let weatherData = null;

// Function to fetch quotes from the ZenQuotes API
const fetchQuotes = async () => {
  const quotesUrl = "https://zenquotes.io/api/quotes/";

  try {
    const response = await fetch(quotesUrl);
    if (!response.ok) throw new Error('Failed to fetch quotes');

    const txt = await response.text();
    console.log("Received quote:", txt);

    quoteHeader.innerHTML += `<blockquote>${txt}</blockquote>`;
  } catch (error) {
    console.warn(error.message);
  }
};


// Function to fetch weather data from the OpenWeatherMap API
const fetchData = async () => {
  // Construct the weather URL with the updated city
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ee9719cb63ae4b1ee948ea9b63a048bd`;

  try {
    const [weatherResponse, _] = await Promise.all([
      fetch(weatherUrl),
      fetchQuotes() // Fetch quotes concurrently
    ]);

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    renderWeather(weatherData); // Call the function to update the UI with the fetched data
    console.log(weatherData);
  } catch (error) {
    console.warn(error.message);
  }
};

// Function to update the UI with weather information
const renderWeather = (weatherData) => {
  weatherContainer.innerHTML = '';

  // Create HTML elements to display weather information
  const cityName = document.createElement('h2');
  cityName.textContent = weatherData.name;

  const temperature = document.createElement('p');
  temperature.textContent = `Temperature: ${weatherData.main.temp}°C`;

  const description = document.createElement('p');
  description.textContent = `Description: ${weatherData.weather[0].description}`;

  const feelsLike = document.createElement('p');
  feelsLike.textContent = `Feels like: ${weatherData.main.feels_like}°C`;

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

  const pressure = document.createElement('p');
  pressure.textContent = `Pressure: ${weatherData.main.pressure}`;

  const windSpeed = document.createElement('p');
  windSpeed.textContent = `Wind Speed: ${weatherData.wind.speed}m/s`;

  weatherContainer.appendChild(cityName);
  weatherContainer.appendChild(temperature);
  weatherContainer.appendChild(description);
  weatherContainer.appendChild(feelsLike);
  weatherContainer.appendChild(humidity);
  weatherContainer.appendChild(pressure);
  weatherContainer.appendChild(windSpeed);
};

// Event handler for input change
const handleInputChange = () => {
  city = cityInput.value;
};

// Event handler for form submission
const handleSubmit = () => {
  fetchData();
};

// Attach event listeners to input and submit button
cityInput.addEventListener('input', handleInputChange);
submitButton.addEventListener('click', handleSubmit);

// Initial data fetch on page load
fetchData();




