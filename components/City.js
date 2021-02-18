import React, {useState} from 'react';
import styled from 'styled-components';
import {Button} from 'react-native-elements';

const City = ({location, current}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <CityTitle>
        {location.name} {location.region}
      </CityTitle>
      <CloudBlock>
        <CloudText>{current.condition.text} </CloudText>
        <CloudImage
          source={{
            uri: 'https:' + current.condition.icon,
          }}
        />
      </CloudBlock>
      <TempText>
        Temperature: {current.temp_c}
        <Celsius>°C</Celsius>
      </TempText>

      <Button
        title={'Show details'}
        onPress={() => setShowDetails(!showDetails)}
      />
      {showDetails && (
        <DetailsBlock>
          <Details>
            Last updated: <Small>{current.last_updated}</Small>
          </Details>
          <Details>
            Local time: <Small>{location.localtime}</Small>
          </Details>
          <Details>
            Wind speed: <Small>{current.gust_kph}kph</Small>
          </Details>
        </DetailsBlock>
      )}
    </>
  );
};
const CloudBlock = styled.View`
  flex-direction: row;
  font-size: 30px;
  align-items: center;
`;
const CloudText = styled.Text`
  font-size: 24px;
`;
const CloudImage = styled.Image`
  width: 50px;
  height: 50px;
`;
const CityTitle = styled.Text`
  font-size: 30px;
`;
const TempText = styled.Text`
  font-size: 24px;
  flex-direction: row;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;
const Celsius = styled.Text`
  font-size: 17px;
`;
const Details = styled.Text`
  font-size: 19px;
  font-weight: bold;
`;
const Small = styled.Text`
  font-size: 16px;
  font-weight: normal;
`;

const DetailsBlock = styled.View``;
export default City;
