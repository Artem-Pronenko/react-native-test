import React, {useState, useEffect} from 'react';
import {SearchBar, Button} from 'react-native-elements';
import {ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import MainScreen from './components/MainScreen';
import styled from 'styled-components';
import useFetch from './hooks/useFetch';
import Pagination from './components/Pagination';
import TempHours from './components/TempHours';

const App = () => {
  const [search, setSearch] = useState('');
  const [dayTemp, setDayTemp] = useState(0);
  const apiUriLocation = 'http://ip-api.com/json/';
  const apiKey = 'c965717d743848e29e4205616211702';
  const apiUri = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=${10}&q=`;

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
      setSearch(responseLocation.city);
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
      <SafeAreaView>
        <ScrollView>
          <MainContent>
            {(!response || isLoading || isLoadingLocation) && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {(error || errorLocation) && <Error>Error!: {error.message}</Error>}
            {responseLocation && response && !error && (
              <>
                <MainScreen
                  location={response.location}
                  current={response.current}
                />
                <Pagination
                  buttons={response.forecast.forecastday}
                  getDay={setDayTemp}
                />
                <TempHours hour={response.forecast.forecastday[dayTemp].hour} />
              </>
            )}
          </MainContent>
        </ScrollView>
      </SafeAreaView>
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
  padding-bottom: 120px;
`;
export default App;
