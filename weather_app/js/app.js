//WEB API 
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=metric&appid=...'

//Date
let today = new Date();
let date = today.getDate()+' / '+(today.getMonth()+1)+' / '+today.getFullYear();
//console.log(date);

//Event listener for the click
document.getElementById('generate').addEventListener('click', newSearch);


function newSearch(query) {
    const newLocation = document.getElementById('zip').value;
    //console.log(newLocation);
    
    getWeatherData(baseURL, newLocation, apiKey)
    .then(function(weatherData) {
        //console.log(weather);
            const city = weatherData.name;
            const country = weatherData.sys.country;            
            const temp = weatherData.main.temp;           
            const tempFeels = weatherData.main.feels_like; 
            console.log(city);
            console.log(country);
            console.log(temp);
            console.log(tempFeels);
            console.log(date);  
            postData('/add', {
                city,
                country,
                temp,
                tempFeels,
            }).then(updateUI(weatherData));        
    })
    
}

const getWeatherData = async (baseURL, newLocation, apiKey) => {
    const res = await fetch(baseURL + newLocation + apiKey)
    try {
        const weatherData = await res.json();
        return weatherData;
    }catch(error) {
        console.log("error", error);
    }
};

/* Function to POST data */
async function postData(url, data) {
    //console.log(data);
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
}

function updateUI(weatherData) {
    //console.log(weatherData);
    const placeCity = document.querySelector('.location .city')
    const placeCountry = document.querySelector('.location .country');
    const placeTemp = document.querySelector('.weather_info .temp');
    const placeTempFeels = document.querySelector('.weather_info .temp_feels');
    const placeDate = document.querySelector('.details .date');
    const placeInput = document.querySelector('.details .user_input');
    const userFeels = document.getElementById('feelings').value;
    placeCity.innerHTML = weatherData.name;
    placeCountry.innerHTML = weatherData.sys.country;
    placeTemp.innerHTML = weatherData.main.temp + " °C";
    placeTempFeels.innerHTML = weatherData.main.feels_like + " °C";
    placeDate.innerHTML = date;
    placeInput.innerHTML = userFeels;
}

document.getElementById('generate').addEventListener('click', showTitle);

function showTitle() {
    const tempTitle = document.querySelector('.temperature');
    const feelsTitle = document.querySelector('.feelslike');
    tempTitle.style.display = "inline";
    feelsTitle.style.display = "inline";
};
    
