const APIKey = "0e298a61b51e5c09366e6a12b31a9aff";
const APIURL = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKey}&units=metric&q=`;

const windSpeed = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");

const getWeather = async (city) => {
  let dataAJAX = await fetch(APIURL + city);
  if (dataAJAX.status === 404) {
    document.querySelector(".invalid").style.display = "block";
    weatherDiv.style.display = "none";
  } else {
    let dataJSON = await dataAJAX.json();

    windSpeed.innerText = dataJSON.wind.speed + " km/h";
    humidity.innerText = dataJSON.main.humidity + "%";
    cityName.innerText = dataJSON.name;
    temp.innerText = Math.round(dataJSON.main.temp) + "°c";
    console.log(dataJSON);
    if (dataJSON.weather[0].main === "Clouds") {
      weatherIcon.src = "assets/clouds.png";
    } else if (dataJSON.weather[0].main === "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (dataJSON.weather[0].main === "Rain") {
      weatherIcon.src = "assets/Rain.png";
    } else if (dataJSON.weather[0].main === "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (dataJSON.weather[0].main === "Mist") {
      weatherIcon.src = "assets/mist.png";
    }
    document.querySelector(".invalid").style.display = "none";
    weatherDiv.style.display = "block";
  }
};

searchBtn.addEventListener("click", async () => {
  await getWeather(searchBox.value);
  if (searchBox.value && dataAJAX.status === 200) {
    weatherDiv.style.display = "block";
  }
});

searchBox.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    await getWeather(searchBox.value);
    if (searchBox.value && dataAJAX.status === 200) {
      weatherDiv.style.display = "block";
    }
  }
});
