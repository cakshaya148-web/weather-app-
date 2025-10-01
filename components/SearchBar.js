import React, { useState } from 'react';
import styled from 'styled-components/native';

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  padding: 10px 20px;
  margin: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding: 10px;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #3498db;
  border-radius: 20px;
  padding: 10px 20px;
  margin-left: 10px;
`;

const SearchButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        placeholder="Enter city name"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <SearchButton onPress={handleSearch} disabled={loading}>
        <SearchButtonText>{loading ? '...' : 'Search'}</SearchButtonText>
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
