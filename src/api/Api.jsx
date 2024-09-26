export const getWeatherByCity = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    const cityResponse = await fetch(url);

    if (!cityResponse.ok) {
      throw new Error("City not found");
    }
    const weatherData = await cityResponse.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
