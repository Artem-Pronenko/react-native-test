import React, {useState, useEffect} from 'react';
import {SearchBar, Button} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import City from './components/City';
import styled from 'styled-components';
import useFetch from './hooks/useFetch';

const App = () => {
  const [search, setSearch] = useState('');
  const apiUriLocation = 'http://ip-api.com/json/';
  const apiKey = 'c965717d743848e29e4205616211702';
  const apiUri = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

  const [{response, isLoading, error}, doFetch] = useFetch(apiUri);
  const [
    {
      response: responseLocation,
      isLoading: isLoadingLocation,
      error: errorLocation,
    },
    doFetchLocation,
  ] = useFetch(apiUriLocation);

  useEffect(() => {
    doFetchLocation();
  }, [doFetchLocation]);

  useEffect(() => {
    if (responseLocation) {
      doFetch(responseLocation.city);
    }
  }, [doFetch, responseLocation]);

  const getWeather = () => {
    doFetch(search || responseLocation.city);
  };

  return (
    <>
      <SearchBar
        placeholder="Enter city name"
        onChangeText={setSearch}
        value={search}
      />
      <Button
        title={'Search'}
        loading={isLoading || isLoadingLocation}
        onPress={() => getWeather()}
      />
      <MainContent>
        {(!response || isLoading || isLoadingLocation) && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        {(error || errorLocation) && <Error>Error!: {error.message}</Error>}
        {responseLocation && response && !error && (
          <City location={response.location} current={response.current} />
        )}
      </MainContent>
    </>
  );
};
const Error = styled.Text`
  font-size: 18px;
  color: red;
`;
const MainContent = styled.View`
  padding-top: 20px;
  padding-horizontal: 20px;
`;
export default App;
