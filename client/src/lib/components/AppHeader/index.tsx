import { WechatOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { LOG_OUT } from '../../graphql/mutations/LogOut';
import { LogOut as LogOutData } from '../../graphql/mutations/LogOut/__generated__/LogOut';
import { User } from '../../types';
import { displayErrorMessage } from '../../utils';
import './styles/index.scss';

interface Props {
  user: User;
  setUser(user: User): void;
};

const { Title } = Typography;
const { Header } = Layout;

export const AppHeader = ({ user, setUser }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: () => {
      sessionStorage.removeItem('token');
      setUser({
        id: null,
        displayName: null,
        email: null,
        avatar: null,
        token: null
      });
    },
    onError: () => {
      displayErrorMessage('Failed to log out! Please try again later!');
    }
  });

  const menu = user.id ? (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={() => logOut()}>Log Out</Button>
      </Menu.Item>
    </Menu>
  ) : (
      <Menu>
        <Menu.Item>
          <Link to="/login">
            <Button type="link">Log In</Button>
          </Link>
        </Menu.Item>
      </Menu>
    );

  return (
    <Header className="app-header">
      <Row align="middle" justify="space-between">
        <Col>
          <Title level={1} className="logo">
            <Link to="/" className="logo-link">
              <WechatOutlined />
              <span className="logo-link__text">Chat</span>
            </Link>
          </Title>
        </Col>
        <Col>
          <Dropdown
            arrow
            overlay={menu}
            placement="bottomCenter"
            overlayClassName="profile-dropdown"
          >
            <Avatar src={user.avatar || ''} size={48} />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
};
