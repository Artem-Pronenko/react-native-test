import React from 'react';
import {View, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styled from 'styled-components';

const Message = ({message}) => {
  return (
    <SafeAreaViewMessage>
      <ScrollView>
        {message.map((item) => (
          <MessageWrap
            key={item.id}
            style={item.myMessage && {flexDirection: 'row-reverse'}}>
            <ImgUser
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <View>
              <UserName style={item.myMessage && {textAlign: 'right'}}>
                {item.userName}
              </UserName>
              <TextMessage>{item.text}</TextMessage>
            </View>
          </MessageWrap>
        ))}
      </ScrollView>
    </SafeAreaViewMessage>
  );
};

const SafeAreaViewMessage = styled.SafeAreaView`
  padding-bottom: 50px;
`;

const MessageWrap = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
`;

const UserName = styled.Text`
  font-weight: bold;
  margin-bottom: 0;
  margin-horizontal: 5px;
`;

const TextMessage = styled.Text`
  margin-horizontal: 5px;
  max-width: 320px;
`;

const ImgUser = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

export default Message;
