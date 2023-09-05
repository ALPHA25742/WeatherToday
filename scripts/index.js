/**
 * The api handler for api.openweathermap.org.
 */
class api {
  /**
   *@param {String} key The api key.
   */
  constructor(key) {
    this.link1 = `https://api.openweathermap.org/data/2.5/weather?q=city&appid=`;
    this.link2 = `https://api.openweathermap.org/data/2.5/onecall?lat=lati&lon=long&appid=`;
    this.key = key;
  }
  /**
   * Fetches the current weather of a city.
   * @param {String} city City name
   * @return {object}
   */
  async getCurrentWeather(city) {
    //reconstructing the link for proper api fetch
    let link = this.link1.replace("city", city); // `https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=`
    link = link + this.key;

    let response = await this.fetchh(link);
    return response;
  }
  /**
   * Fetches the Hourly weather of a city.
   * @return {object}
   */
  async getHourlyWeather(city) {
    const obj = await this.getLatLon(city);
    let link = this.link2.replace("lati", obj.latitude); // `https://api.openweathermap.org/data/2.5/onecall?lat=100&lon=long&appid=`;
    link = link.replace("long", obj.longitude);

    link = link + this.key;
    let response = await this.fetchh(link);
    return response;
  }
  /**
   * Returns the latitude and longitute of a given city
   * @returns {object}
   */
  async getLatLon(city) {
    //reconstructing the link for proper api fetch
    let link = this.link1.replace("city", city); // `https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=`
    link = link + this.key;
    const data = await this.fetchh(link); // `https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=23113223`
    return {
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    };
  }
  /**
   * The proper implementation of fetch library with try catch.
   * @returns {object}
   */
  async fetchh(link) {
    try {
      const response = await fetch(link);
      return await response.json();
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  kelvintocelcius(x) {
    return Math.round(x - 273.15);
  }
}

let animator = (element, limit) => {
  let i = 0;
  if (limit > 0) {
    let timer = setInterval(() => {
      i++;
      element.innerHTML = `${i}&#176;C`;
      if (i == limit) {
        clearInterval(timer);
      }
    }, 80);
  } else if (limit < 0) {
    let timer = setInterval(() => {
      i--;
      element.innerHTML = `${i}&#176;C`;
      if (i == limit) {
        clearInterval(timer);
      }
    }, 80);
  } else {
    element.innerHTML = `${i}&#176;C`;
  }
};

let form = document.querySelector(".form");
let input = document.querySelector(".input");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let content = document.querySelector(".content");
  const WeatherAPI = new api("49cf3721193a77014b33ee2f1d79191b");

  WeatherAPI.getCurrentWeather(input.value).then((data) => {
    let location = document.querySelector(".location");
    let highCW = document.querySelector(".highCW");
    let lowCW = document.querySelector(".lowCW");
    let comment = document.querySelector(".comment");
    let speed = document.querySelector(".speed");
    let direction = document.querySelector(".direction");
    let humidity = document.querySelector(".humidity");
    location.innerHTML = `<p>${data.name}</p>`;
    animator(highCW, WeatherAPI.kelvintocelcius(data.main.temp_max));
    animator(lowCW, WeatherAPI.kelvintocelcius(data.main.temp_min));
    comment.textContent = data.weather[0].description;
    speed.innerHTML = `${data.wind.speed}KMPH`;
    direction.innerHTML = `${data.wind.deg}&#176; from north`;
    humidity.textContent = `${data.main.humidity}%`;
  });

  WeatherAPI.getHourlyWeather(input.value).then((data) => {
    let temp1 = document.querySelector(".temp1");
    let temp2 = document.querySelector(".temp2");
    let temp3 = document.querySelector(".temp3");
    let temp4 = document.querySelector(".temp4");
    let temp5 = document.querySelector(".temp5");
    let temp6 = document.querySelector(".temp6");
    let comment1 = document.querySelector(".comment1");
    let comment2 = document.querySelector(".comment2");
    let comment3 = document.querySelector(".comment3");
    let comment4 = document.querySelector(".comment4");
    let comment5 = document.querySelector(".comment5");
    let comment6 = document.querySelector(".comment6");
    let time1 = document.querySelector(".time1");
    let time2 = document.querySelector(".time2");
    let time3 = document.querySelector(".time3");
    let time4 = document.querySelector(".time4");
    let time5 = document.querySelector(".time5");
    let time6 = document.querySelector(".time6");

    animator(temp1, WeatherAPI.kelvintocelcius(data.hourly[1].temp));
    animator(temp2, WeatherAPI.kelvintocelcius(data.hourly[2].temp));
    animator(temp3, WeatherAPI.kelvintocelcius(data.hourly[3].temp));
    animator(temp4, WeatherAPI.kelvintocelcius(data.hourly[4].temp));
    animator(temp5, WeatherAPI.kelvintocelcius(data.hourly[5].temp));
    animator(temp6, WeatherAPI.kelvintocelcius(data.hourly[6].temp));
    comment1.textContent = data.hourly[1].weather[0].description;
    comment2.textContent = data.hourly[2].weather[0].description;
    comment3.textContent = data.hourly[3].weather[0].description;
    comment4.textContent = data.hourly[4].weather[0].description;
    comment5.textContent = data.hourly[5].weather[0].description;
    comment6.textContent = data.hourly[6].weather[0].description;
    time1.innerHTML = `${new Date(data.hourly[1].dt * 1000)
      .toTimeString()
      .slice(0, 5)}`;
    time2.innerHTML = `${new Date(data.hourly[2].dt * 1000)
      .toTimeString()
      .slice(0, 5)}`;
    time3.innerHTML = `${new Date(data.hourly[3].dt * 1000)
      .toTimeString()
      .slice(0, 5)}`;
    time4.innerHTML = `${new Date(data.hourly[4].dt * 1000)
      .toTimeString()
      .slice(0, 5)}`;
    time5.innerHTML = `${new Date(data.hourly[5].dt * 1000)
      .toTimeString()
      .slice(0, 5)}`;
    time6.innerHTML = `${new Date(data.hourly[6].dt * 1000)
      .toTimeString()
      .slice(0, 5)}`;
  });
  content.classList.remove("content");
});
