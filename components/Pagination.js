import React, {useState} from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

const Pagination = ({buttons, getDay}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <ChooseDayButton onPress={() => setShowMenu(!showMenu)}>
        <TitleWrapper>
          <Title>Choose a day</Title>
          <Icon size={20} name={showMenu ? 'sort-up' : 'sort-down'} />
        </TitleWrapper>
      </ChooseDayButton>
      {showMenu && (
        <PaginationWrapper>
          {buttons.length &&
            buttons.map((item, index) => (
              <Button key={index} onPress={() => getDay(index)}>
                <ButtonText>{item.date.slice(5).replace('-', '.')}</ButtonText>
              </Button>
            ))}
        </PaginationWrapper>
      )}
    </>
  );
};

const PaginationWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  max-width: 200px;
  margin: 0 auto;
`;

const Button = styled.TouchableOpacity`
  padding: 3px 10px;
  border-radius: 30px;
  background-color: #3a85ff;
  margin-vertical: 5px;
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const TitleWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Title = styled.Text`
  color: black;
  font-weight: bold;
  margin-right: 2px;
  font-size: 18px;
`;

const ChooseDayButton = styled.TouchableOpacity``;

export default Pagination;
