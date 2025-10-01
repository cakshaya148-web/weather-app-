import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const DailyContainer = styled.View`
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

const DailyTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

const DailyItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const DailyDate = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  flex: 1;
`;

const DailyDescription = styled.Text`
  font-size: 14px;
  color: #666;
  text-transform: capitalize;
  flex: 1;
  text-align: center;
`;

const DailyTemps = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const DailyHigh = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
`;

const DailyLow = styled.Text`
  font-size: 16px;
  color: #666;
`;

const DailyForecast = ({ weather }) => {
  if (!weather || !Array.isArray(weather.daily) || weather.daily.length === 0) return null;

  const fourDays = weather.daily.slice(0, 4);

  return (
    <DailyContainer>
      <DailyTitle>4-Day Forecast</DailyTitle>
      {fourDays.map((day) => {
        const desc = day?.weather?.[0]?.description || '';
        // Prefer One Call shape (temp.max/min); fall back to 3h forecast fields if ever present
        const max = Math.round(
          typeof day?.temp?.max === 'number' ? day.temp.max : day?.main?.temp_max ?? NaN
        );
        const min = Math.round(
          typeof day?.temp?.min === 'number' ? day.temp.min : day?.main?.temp_min ?? NaN
        );

        return (
          <DailyItem key={day?.dt ?? Math.random()}>
            <DailyDate>{day?.dt ? moment.unix(day.dt).format('dddd') : '-'}</DailyDate>
            <DailyDescription>{desc}</DailyDescription>
            <DailyTemps>
              <DailyHigh>{isNaN(max) ? '—' : `${max}°`}</DailyHigh>
              <DailyLow>{isNaN(min) ? '—' : `${min}°`}</DailyLow>
            </DailyTemps>
          </DailyItem>
        );
      })}
    </DailyContainer>
  );
};

export default DailyForecast;