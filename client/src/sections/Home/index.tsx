import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Input, Layout, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FETCH_CHAT, SEND_DIRECT_MESSAGE } from '../../lib/graphql';
import {
  NewDirectMessage,
  NewDirectMessageVariables
} from '../../lib/graphql/mutations/Chat/__generated__/NewDirectMessage';
import {
  Chat,
  ChatVariables
} from '../../lib/graphql/queries/Chat/__generated__/Chat';
import { NEW_DIRECT_MESSAGE } from '../../lib/graphql/subscriptions';
import './styles/index.scss';

const { Sider, Content } = Layout;
const { Text } = Typography;

export const Home = (): JSX.Element => {
  const [message, setMessage] = useState('');
  const [sendDirectMessage] = useMutation<
    NewDirectMessage,
    NewDirectMessageVariables
  >(SEND_DIRECT_MESSAGE);

  const { data, subscribeToMore } = useQuery<Chat, ChatVariables>(FETCH_CHAT, {
    variables: {
      chatId: '5f58ccf946c3f19f242c001e'
    }
  });

  useEffect(() => {
    subscribeToMore({
      document: NEW_DIRECT_MESSAGE,
      updateQuery(prev, updateQueryData) {
        console.log('queryUpdate', updateQueryData);
        return prev;
      }
    });
  }, []);

  console.log('DATA', data);

  const directMessagesHeaderElement = (
    <Button
      size="small"
      className="direct-messages__btn"
      type="link"
      icon={<MessageOutlined />}
    >
      <Text>Direct Messages (2)</Text>
      <PlusOutlined />
    </Button>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <Layout className="home">
      <Sider className="home__sider" width={250}>
        <List header={directMessagesHeaderElement} className="direct-messages">
          <List.Item>
            <Button type="link" size="small" className="direct-messages__btn">
              <Text>Alexander</Text>
            </Button>
            <span className="online-indicator online-indicator--active" />
          </List.Item>
          <List.Item>
            <Button type="link" size="small" className="direct-messages__btn">
              <Text>User</Text>
            </Button>
            <span className="online-indicator" />
          </List.Item>
        </List>
      </Sider>
      <Content className="home__content">
        <List>
          {data?.chat &&
            data.chat.messages?.map((m) => <List.Item>{m.content}</List.Item>)}
        </List>
        <Input value={message} onChange={handleChange} />
        <Button
          onClick={() =>
            sendDirectMessage({
              variables: {
                input: {
                  userId: '107176647091913570561'
                }
              }
            })
          }
        >
          Send
        </Button>
      </Content>
    </Layout>
  );
};
