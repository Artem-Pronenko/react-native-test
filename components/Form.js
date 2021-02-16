import React, {useState} from 'react';
import styled from 'styled-components';

const Form = ({addedMessage}) => {
  const [value, setValue] = useState('Enter message');
  return (
    <FormAddedMessage>
      <InputEnterMessage
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <ButtonSend onPress={() => addedMessage(value)}>
        <TextButton>Send</TextButton>
      </ButtonSend>
    </FormAddedMessage>
  );
};

const InputEnterMessage = styled.TextInput`
  border-bottom-color: gray;
  border-bottom-width: 1px;
  flex: 1;
`;

const FormAddedMessage = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  background-color: white;
`;

const ButtonSend = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #2d76ff;
  width: 55px;
`;

const TextButton = styled.Text`
  color: aliceblue;
  font-size: 18px;
`;

export default Form;
