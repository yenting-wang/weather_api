import React, { useState, useEffect } from "react";

function WeatherComponent({ cityCode }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [cityCode]);

  return (
    <>
      {weatherData && (
        <>
          {weatherData[0].timeSeries[0].areas.map((area) => (
            <React.Fragment key={area.area.name}>
              <h2>{area.area.name}</h2>
              <p>{area.weathers}</p>
              <p>{area.winds}</p>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
}

export default WeatherComponent;
