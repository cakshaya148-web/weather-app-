import React from 'react';
import styled from 'styled-components/native';

const DetailsContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 20px;
  margin: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const DetailsTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const DetailsLabel = styled.Text`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const DetailsValue = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const { current, daily } = weather;
  const today = daily[0];

  return (
    <DetailsContainer>
      <DetailsTitle>Weather Details</DetailsTitle>
      
      <DetailsRow>
        <DetailsLabel>Feels Like</DetailsLabel>
        <DetailsValue>{Math.round(current.main.feels_like)}°C</DetailsValue>
      </DetailsRow>
      
      <DetailsRow>
        <DetailsLabel>Humidity</DetailsLabel>
        <DetailsValue>{current.main.humidity}%</DetailsValue>
      </DetailsRow>
      
      <DetailsRow>
        <DetailsLabel>Wind Speed</DetailsLabel>
        <DetailsValue>{Math.round(current.wind.speed)} m/s</DetailsValue>
      </DetailsRow>
      
      <DetailsRow>
        <DetailsLabel>Pressure</DetailsLabel>
        <DetailsValue>{current.main.pressure} hPa</DetailsValue>
      </DetailsRow>
      
      <DetailsRow>
        <DetailsLabel>Visibility</DetailsLabel>
        <DetailsValue>{Math.round(current.visibility / 1000)} km</DetailsValue>
      </DetailsRow>
      
      <DetailsRow>
        <DetailsLabel>High</DetailsLabel>
        <DetailsValue>{Math.round(today.main.temp_max)}°C</DetailsValue>
      </DetailsRow>
      
      <DetailsRow>
        <DetailsLabel>Low</DetailsLabel>
        <DetailsValue>{Math.round(today.main.temp_min)}°C</DetailsValue>
      </DetailsRow>
    </DetailsContainer>
  );
};

export default WeatherDetails;