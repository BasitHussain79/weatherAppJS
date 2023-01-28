class Forecast {
  constructor() {
    this.key = "yFwOqF0tT63cBb6gIPW55H1jdpMH955S";
    this.weatherURL =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURL =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  // async getData(city) {
  //   const cityDets = await getCity(city);
  //   const weather = await getWeather(cityDets.Key);
  //   return {
  //     cityDets,
  //     weather,
  //   };
  // }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
    return data[0];
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    return data[0];
  }
}

// const key = "yFwOqF0tT63cBb6gIPW55H1jdpMH955S";

// const getWeather = async (id) => {};

// const getCity = async (city) => {};

// getCity("karachi")
//   .then((data) => {
//     console.log(data);
//     return getWeather(data.Key);
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
