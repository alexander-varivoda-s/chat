import { useMutation, useQuery } from '@apollo/client';
import { Alert, Layout, Spin, Typography } from 'antd';
import cx from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, useLocation } from 'react-router-dom';
import { LOG_IN } from '../../lib/graphql';
import { LogIn as LogInData, LogInVariables } from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import { User } from '../../lib/types';
import { displaySuccessNotification } from '../../lib/utils';
import GoogleLightDisabled from './assets/google_light_disabled.svg';
import GoogleLightNormal from './assets/google_light_normal.svg';
import './styles/index.scss';

interface Props {
  setUser: (user: User) => void;
}

const { Content } = Layout;
const { Title } = Typography;

const getCodeFromUrl = (search: string) => {
  const params = new URLSearchParams(search);

  return params.get('code');
}

export const Login = ({ setUser }: Props) => {
  const location = useLocation();
  const code = getCodeFromUrl(location.search);

  const { data, loading, error } = useQuery<AuthUrlData>(AUTH_URL, {
    skip: code !== null
  });

  const [logIn, { data: logInData, loading: loggingIn, error: logInError }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setUser(data.logIn);
        displaySuccessNotification('Log In', 'You have successfully logged in!');
      }
    },
  });

  const logInRef = useRef(logIn);

  const handleSignInBtnClick = () => {
    if (data && data.authUrl) {
      window.location.href = data.authUrl;
    }
  }

  useEffect(() => {
    if (code) {
      logInRef.current({
        variables: {
          input: {
            code,
          }
        }
      })
    }
  }, [code])

  if (loading) {
    return (
      <Content className="login">
        <Spin size="large" />
      </Content>
    );
  }

  if (loggingIn) {
    return (
      <Content className="login">
        <Spin size="large" tip="Logging in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    return (
      <Redirect to="/" />
    );
  }

  const logInErrorElement = logInError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong! :("
      description="Failed to log in using your Google account. Please try again later!"
    />
  ) : null;

  const loginDisabled = error !== undefined;

  return (
    <Content className="login">
      <Helmet>
        <title className="login-title">Login</title>
      </Helmet>
      {logInErrorElement}
      <Title level={2}>Use your Google account to sign in</Title>
      <button
        aria-label="Sign in with Google"
        className={cx("login-btn", { "login-btn--disabled": loginDisabled })}
        disabled={loginDisabled}
        onClick={handleSignInBtnClick}
      >
        <img
          alt="Google Icon"
          aria-label="Google Icon"
          className="login-btn__icon"
          src={loginDisabled ? GoogleLightDisabled : GoogleLightNormal}
        />
        <span className="login-btn__text">Sign in with Google</span>
      </button>
    </Content >
  );
};
