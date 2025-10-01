
import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';


const Card = styled.View`
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

const LocationText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const TemperatureText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 10px;
`;

const DescriptionText = styled.Text`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
  text-transform: capitalize;
`;

const DateText = styled.Text`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const WeatherCard = ({ weather, location }) => {
  if (!weather) return null;

  const { main, weather: weatherInfo } = weather.current;
  const { description } = weatherInfo[0];

  return (
    <Card>
      <LocationText>{location}</LocationText>
      <TemperatureText>{Math.round(main.temp)}°C</TemperatureText>
      <DescriptionText>{description}</DescriptionText>
      <DateText>{moment().format('dddd, MMMM Do YYYY')}</DateText>
    </Card>
  );
};
export default WeatherCard;