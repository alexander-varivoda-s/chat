import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { Layout, Typography } from 'antd';
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import GoogleLightNormal from './assets/google_light_normal.svg';
import './styles/index.scss'

const { Content } = Layout;
const { Title } = Typography;

export const Login = () => {
  const { data, loading, error } = useQuery<AuthUrlData>(AUTH_URL);

  const handleSignInBtnClick = () => {
    if (data && data.authUrl) {
      window.location.href = data.authUrl;
    }
  }
  return (
    <Content className="login">
      <Helmet>
        <title className="login-title">Login</title>
      </Helmet>
      <Title level={2}>Use your Google account to sign in</Title>
      <button
        aria-label="Sign in with Google"
        className="login-btn"
        onClick={handleSignInBtnClick}
      >
        <img
          alt="Google Icon"
          aria-label="Google Icon"
          className="login-btn__icon"
          src={GoogleLightNormal}
        />
        <span className="login-btn__text">Sign in with Google</span>
      </button>
    </Content >
  );
};
