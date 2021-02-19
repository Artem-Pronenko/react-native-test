import React from 'react';
import styled from 'styled-components';

const TempHours = ({hour}) => {
  return (
    <>
      <DayTitle>
        Day: {new Date(hour[0].time.slice(0, 10)).toLocaleDateString()}
      </DayTitle>
      <TempHoursWrapper>
        {hour &&
          hour.map((item, index) => (
            <TempItem key={index}>
              <CloudBlock>
                <CloudImage
                  source={{
                    uri: 'https:' + item.condition.icon,
                  }}
                />
                <TempHoursTitle>{item.time.slice(11)}</TempHoursTitle>
              </CloudBlock>
              <TempText>
                Temperature: {item.temp_c}
                <Celsius>°C</Celsius>
              </TempText>
            </TempItem>
          ))}
      </TempHoursWrapper>
    </>
  );
};
const TempItem = styled.View`
  width: 45%;
`;

const CloudBlock = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TempHoursTitle = styled.Text`
  font-size: 16px;
`;
const CloudImage = styled.Image`
  width: 35px;
  height: 35px;
`;
const TempText = styled.Text`
  font-size: 16px;
  flex-direction: row;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;
const Celsius = styled.Text`
  font-size: 12px;
`;
const DayTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const TempHoursWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export default TempHours;
