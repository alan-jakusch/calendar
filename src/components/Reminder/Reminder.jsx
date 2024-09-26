import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { getWeatherByCity } from "api/Api";
import PropTypes from "prop-types";
import { isDateToday } from "utils/dateUtils";

const useStyles = makeStyles(() => ({
  reminder: {
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      cursor: "pointer",
    },
  },
  imageContainer: {
    width: "50px",
  },
  image: {
    width: "100%",
  },
}));

const Reminder = ({ city, date, time, text, onClick }) => {
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    async function loadWeather() {
      if (!isDateToday(date)) {
        return setWeather({
          description: "Forecast is not available",
          iconUrl: null,
        });
      }
      try {
        const _weather = await getWeatherByCity(city);
        const { weather: weatherInfo } = _weather;
        const iconCode = weatherInfo[0].icon;
        const _iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        setWeather({
          description: weatherInfo[0].description,
          iconUrl: _iconUrl,
        });
      } catch (error) {
        setWeather({
          description: "Forecast is not available",
          iconUrl: null,
        });
      }
      setLoading(false);
    }
    loadWeather();
  }, [city, date]);

  return (
    <div onClick={onClick} className={classes.reminder}>
      {!loading && weather?.iconUrl && (
        <div className={classes.imageContainer}>
          <img
            src={weather.iconUrl}
            alt={weather.description}
            className={classes.image}
          />
        </div>
      )}
      <ListItemText primary={text} secondary={`${time}, ${city}`} />
    </div>
  );
};

Reminder.propTypes = {
  city: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Reminder;
