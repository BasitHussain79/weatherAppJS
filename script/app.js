const citySearch = document.querySelector("form");
const weatherDetails = document.querySelector(".weather-details");
const timeImage = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const card = document.querySelector(".card");

// Forecast Constructor Object
const forecast = new Forecast();
console.log(forecast);

const updateUI = (data) => {
  //   const city = data.cityDets;
  //   const weather = data.weather;

  const { cityDets, weather } = data;
  const html = `
            <h4 class="my-3">${cityDets.EnglishName}</h4>
            <div class="my-2">${weather.WeatherText}</div>
            <div class="display-3 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
            </div>
        `;

  weatherDetails.innerHTML = html;

  //   let time = null;
  if (weather.IsDayTime) {
    timeImage.setAttribute("src", "../img/day.svg");
  } else {
    timeImage.setAttribute("src", "../img/night.svg");
  }

  const weatherIcon = `../img/icons/${weather.WeatherIcon}.svg`;

  icon.setAttribute("src", weatherIcon);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// Get Data
const getData = async (city) => {
  //   console.log(city);
  const cityDets = await forecast.getCity(city);
  const weather = await forecast.getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = citySearch.city.value.trim();
  citySearch.reset();

  getData(city)
    .then((data) => {
      console.log(data);
      updateUI(data);
    })
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  getData(localStorage.getItem("city"))
    .then((data) => {
      console.log(data);
      updateUI(data);
    })
    .catch((err) => console.log(err));
}
