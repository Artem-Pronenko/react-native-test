import React, {useState} from 'react';

import Form from './components/Form';
import Message from './components/Message';

const App = () => {
  const [message, setMessage] = useState([]);

  const addedMessage = (text) => {
    setMessage([
      ...message,
      {
        userName: 'Artem',
        text,
        id: Date.now(),
        myMessage: true,
      },
    ]);
  };

  return (
    <>
      <Message message={message} />
      <Form addedMessage={addedMessage} />
    </>
  );
};

export default App;
