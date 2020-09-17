import { Layout } from 'antd';
import React, { useState } from 'react';
import { DirectContacts } from '../../lib/components';
import { ChatWindow } from '../../lib/components/ChatWindow';
import { OpenChat } from '../../lib/graphql/mutations/Chat/__generated__/OpenChat';

import './styles/index.scss';

const { Sider, Content } = Layout;

export const Home: React.FC = () => {
  const [activeChat, setActiveChat] = useState<null | OpenChat['openChat']>(
    null
  );

  return (
    <Layout className="home">
      <Sider className="home__sider" width={250}>
        <DirectContacts setActiveChat={setActiveChat} />
      </Sider>
      <Content className="home__content">
        {activeChat && <ChatWindow chat={activeChat} />}
      </Content>
    </Layout>
  );
};
