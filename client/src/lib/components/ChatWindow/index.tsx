import { useMutation, useSubscription } from '@apollo/client';

import { Button, Input, List } from 'antd';
import React, { useState } from 'react';
import { SEND_DIRECT_MESSAGE } from '../../graphql';
import { OpenChat } from '../../graphql/mutations/Chat/__generated__/OpenChat';
import {
  NewDirectMessage,
  NewDirectMessageVariables,
} from '../../graphql/mutations/Message/__generated__/NewDirectMessage';
import { NEW_DIRECT_MESSAGE } from '../../graphql/subscriptions';
import { OnNewDirectMessage } from '../../graphql/subscriptions/Chat/__generated__/OnNewDirectMessage';

interface Props {
  chat: OpenChat['openChat'];
}

export const ChatWindow = ({ chat }: Props): JSX.Element => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chat.messages);
  const [sendMessage] = useMutation<
    NewDirectMessage,
    NewDirectMessageVariables
  >(SEND_DIRECT_MESSAGE);

  useSubscription<OnNewDirectMessage>(NEW_DIRECT_MESSAGE, {
    onSubscriptionData({ subscriptionData }) {
      const directMessage = subscriptionData.data?.directMessageCreated;
      if (directMessage) {
        setMessage('');
        setMessages([...messages, directMessage]);
      }
    },
  });

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const handleMessageSend = () => {
    if (message.length > 0) {
      sendMessage({
        variables: {
          input: {
            chatId: chat.id,
            content: message,
          },
        },
      });
    }
  };

  return (
    <div className="chat-window">
      <List>
        {messages &&
          messages
            .sort((a, b): number => {
              const aDate = new Date(a.created);
              const bDate = new Date(b.created);

              const aTimestamp = aDate.getTime();
              const bTimestamp = bDate.getTime();

              return aTimestamp - bTimestamp;
            })
            .map((m) => <List.Item key={m.id}>{m.content}</List.Item>)}
      </List>
      <Input value={message} onChange={handleMessageChange} />
      <Button onClick={handleMessageSend}>Send</Button>
    </div>
  );
};
