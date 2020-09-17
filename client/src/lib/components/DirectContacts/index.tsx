import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';

import { Button, List, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FETCH_USERS, OPEN_CHAT } from '../../graphql';
import {
  OpenChat,
  OpenChatVariables,
} from '../../graphql/mutations/Chat/__generated__/OpenChat';
import { Users } from '../../graphql/queries/User/__generated__/Users';

import './styles/index.scss';

interface Props {
  setActiveChat: (chat: OpenChat['openChat'] | null) => void;
}

const { Text } = Typography;

export const DirectContacts = ({ setActiveChat }: Props): JSX.Element => {
  const [selectedUser, setSelectedUser] = useState('');
  const { data } = useQuery<Users>(FETCH_USERS);
  const [openChat] = useMutation<OpenChat, OpenChatVariables>(OPEN_CHAT, {
    onCompleted({ openChat: chat }) {
      setActiveChat(chat);
    },
  });
  const openChatRef = useRef(openChat);

  const users = data?.users ? data.users : [];

  const handleUserSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { userid } = e.currentTarget.dataset;

    if (userid) {
      setSelectedUser(userid);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      openChatRef.current({
        variables: {
          input: {
            participant: selectedUser,
          },
        },
      });
    }
  }, [selectedUser]);

  const directMessagesHeaderElement = (
    <Button
      size="small"
      className="direct-contact__btn"
      type="link"
      icon={<MessageOutlined />}
    >
      <Text>Direct Messages ({users.length})</Text>
      <PlusOutlined />
    </Button>
  );

  return (
    <div className="direct-contacts">
      <List
        header={directMessagesHeaderElement}
        className="direct-contacts__inner"
      >
        {users.map((u) => (
          <List.Item key={u.id} className="direct-contact">
            <Button
              type="link"
              size="small"
              className="direct-contact__btn"
              data-userid={u.id}
              onClick={handleUserSelect}
            >
              <Text>{u.displayName}</Text>
              <span className="online-indicator" />
            </Button>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
