import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const HourlyContainer = styled.View`
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

const HourlyTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

const HourlyScrollView = styled.ScrollView`
  flex-direction: row;
`;

const HourlyItem = styled.View`
  align-items: center;
  margin-right: 20px;
  min-width: 60px;
`;

const HourlyTime = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const HourlyTemp = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const HourlyDescription = styled.Text`
  font-size: 12px;
  color: #888;
  text-align: center;
  text-transform: capitalize;
`;

const HourlyForecast = ({ weather }) => {
  if (!weather || !weather.hourly) return null;

  const hourlyData = weather.hourly.slice(0, 12); // Next 12 hours

  return (
    <HourlyContainer>
      <HourlyTitle>Hourly Forecast</HourlyTitle>
      <HourlyScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourlyData.map((hour, index) => (
          <HourlyItem key={index}>
            <HourlyTime>
              {index === 0 ? 'Now' : moment.unix(hour.dt).format('HH:mm')}
            </HourlyTime>
            <HourlyTemp>{Math.round(hour.main.temp)}°C</HourlyTemp>
            <HourlyDescription>{hour.weather[0].description}</HourlyDescription>
          </HourlyItem>
        ))}
      </HourlyScrollView>
    </HourlyContainer>
  );
};

export default HourlyForecast;
