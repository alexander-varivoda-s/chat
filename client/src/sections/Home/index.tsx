import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Layout, List, Typography } from 'antd';
import React from 'react';
import './styles/index.scss';

const { Sider, Content } = Layout;
const { Text } = Typography;

export const Home = () => {
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

  return (
    <Layout className="home">
      <Sider className="home__sider" width={250}>
        <List
          header={directMessagesHeaderElement}
          className="direct-messages"
        >
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
      <Content className="home__content">Home Content</Content>
    </Layout>
  );
};
