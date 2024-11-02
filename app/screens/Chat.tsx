import { Box } from '@gluestack-ui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { dialogflowConfig } from '../../DialogflowConfig';
import { RouterProps } from '../../types/routerProps';
import { ChatImage } from '../assets/images';
import { UserContext } from '../context/UserContext';

const eduBot = {
  _id: 2,
  name: 'edu',
  avatar: ChatImage,
};
interface state {
  messages: IMessage[];
  id: number;
  name: string;
}
interface DialogflowQueryResult {
  queryResult: {
    fulfillmentMessages: { text: { text: string[] } }[];
  };
}
const Chat = ({ navigation }: RouterProps) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  if (!user) {
    return;
  }

  useEffect(() => {
    if (user) {
      Dialogflow_V2.setConfiguration(
        dialogflowConfig.client_email,
        dialogflowConfig.private_key,
        Dialogflow_V2.LANG_PORTUGUESE_BRAZIL,
        dialogflowConfig.project_id
      );
    }
  }, [user]);

  const sendBotResponse = (text: any) => {
    let msg = {
      _id: Math.round(Math.random() * 1000000),
      text,
      createdAt: new Date(),
      user: eduBot,
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg])
    );
  };

  const onSend = (messages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (messages.length > 0) {
      const message = messages[0].text;

      Dialogflow_V2.requestQuery(
        message,
        (result) => {
          const resultTyped = result as DialogflowQueryResult;
          const fulfillmentMessages =
            resultTyped.queryResult.fulfillmentMessages;
          if (
            fulfillmentMessages.length > 0 &&
            fulfillmentMessages[0].text.text.length > 0
          ) {
            const text = fulfillmentMessages[0].text.text[0];
            sendBotResponse(text);
          } else {
            sendBotResponse('Desculpe, não entendi a resposta.');
          }
        },
        (error) => console.log(error)
      );
    }
  };

  return (
    <Box bg="white" h="100%">
      <GiftedChat
        messages={messages}
        onSend={(message) => onSend(message)}
        user={{ _id: user.uid }}
      />
    </Box>
  );
};

export default Chat;
