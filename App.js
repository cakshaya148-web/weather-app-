
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Alert, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { config } from './config';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import SearchBar from './components/SearchBar';

const Container = styled(LinearGradient).attrs({
  colors: ['#74b9ff', '#0984e3'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
})`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: white;
  font-size: 18px;
  margin-top: 10px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  border-radius: 25px;
  border-width: 2px;
  border-color: white;
`;

const RetryButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get coordinates from city name using OpenWeather Geocoding API
  const getCoordinates = async (query) => {
    try {
      const response = await fetch(
        `${config.OPENWEATHER_GEOCODING_URL}?q=${encodeURIComponent(query)}&limit=1&appid=${config.API_KEY}`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, name: cityName, country, state } = data[0];
        const formattedAddress = state ? `${cityName}, ${state}, ${country}` : `${cityName}, ${country}`;
        return { lat, lng: lon, formattedAddress };
      } else {
        throw new Error('Location not found');
      }
    } catch (err) {
      throw new Error('Failed to get location coordinates');
    }
  };


  // Get weather data from OpenWeather API
  const getWeatherData = async (lat, lng) => {
    try {
      // Get current weather
      const currentResponse = await fetch(
        `${config.OPENWEATHER_BASE_URL}?lat=${lat}&lon=${lng}&appid=${config.API_KEY}&units=metric`
      );
      
      // Get 5-day forecast
      const forecastResponse = await fetch(
        `${config.OPENWEATHER_FORECAST_URL}?lat=${lat}&lon=${lng}&appid=${config.API_KEY}&units=metric`
      );
      
      if (currentResponse.status === 401 || forecastResponse.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API key in the .env file');
      }
      
      if (currentResponse.status === 429 || forecastResponse.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later');
      }
      
      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      
      if (currentData.cod !== 200) {
        throw new Error(currentData.message || 'Weather data not available');
      }
      
      if (forecastData.cod !== '200') {
        throw new Error(forecastData.message || 'Forecast data not available');
      }
      
      // Transform data to match One Call API format
      return {
        current: currentData,
        daily: forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 7), // Daily data
        hourly: forecastData.list.slice(0, 12) // Next 12 hours
      };
    } catch (err) {
      if (err.message.includes('API key') || err.message.includes('rate limit')) {
        throw err;
      }
      throw new Error('Failed to fetch weather data. Please check your internet connection');
    }
  };

  // Main function to fetch weather
  const fetchWeather = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get coordinates from the search query
      const coordinates = await getCoordinates(query);
      const { lat, lng, formattedAddress } = coordinates;
      
      // Get weather data
      const weatherData = await getWeatherData(lat, lng);
      
      setWeather(weatherData);
      setLocation(formattedAddress);
    } catch (err) {
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search function
  const handleSearch = (query) => {
    if (query.trim()) {
      fetchWeather(query);
    }
  };

  // Load default weather on app start (optional)
  useEffect(() => {
    // You can uncomment this to load weather for a default location
    // fetchWeather('New York');
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color="white" />
          <LoadingText>Loading weather data...</LoadingText>
        </LoadingContainer>
      );
    }

    if (error) {
      return (
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
          <RetryButton onPress={() => setError(null)}>
            <RetryButtonText>Try Again</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      );
    }

    if (!weather) {
      return (
        <ErrorContainer>
          <ErrorText>Search for a city to see the weather</ErrorText>
        </ErrorContainer>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <WeatherCard weather={weather} location={location} />
        <WeatherDetails weather={weather} />
        <HourlyForecast weather={weather} />
        <DailyForecast weather={weather} />
      </ScrollView>
    );
  };

    return (
      <Container>
        <StatusBar style="light" />
        <SearchBar onSearch={handleSearch} loading={loading} />
        {renderContent()}
      </Container>
    );
}