const apikey = CONFIG.apikey;
const apiurl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

async function checkweather(city){
    const response = await fetch(apiurl.replace("{city name}", city).replace("{API key}", apikey));

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
    
    var data = await response.json();
    console.log(data);
    const weathericon = document.querySelector(".weather-icon");
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds"){
        weathericon.src = "https://openweathermap.org/img/wn/04d@2x.png";
    }else if (data.weather[0].main == "Clear"){
        weathericon.src = "https://openweathermap.org/img/wn/01d@2x.png";
    }else if (data.weather[0].main == "Rain"){
        weathericon.src = "https://openweathermap.org/img/wn/09d@2x.png";
    }else if (data.weather[0].main == "Drizzle"){
        weathericon.src = "https://openweathermap.org/img/wn/10d@2x.png";
    }else if (data.weather[0].main == "Mist"){
        weathericon.src = "https://openweathermap.org/img/wn/50d@2x.png";
    }else{
        weathericon.src = "https://openweathermap.org/img/wn/01d@2x.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

searchbtn.addEventListener("click",()=>{
    checkweather(searchbox.value);
})