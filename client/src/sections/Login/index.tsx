import { useApolloClient, useMutation } from '@apollo/client';
import { Alert, Layout, Spin, Typography } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, useHistory } from 'react-router-dom';
import { LOG_IN } from '../../lib/graphql';
import { LogIn as LogInData, LogInVariables } from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import { User } from '../../lib/types';
import { displayErrorMessage, displaySuccessNotification } from '../../lib/utils';
import GoogleLightNormal from './assets/google_light_normal.svg';
import './styles/index.scss';

interface Props {
  user: User,
  setUser: (user: User) => void;
}

const { Content } = Layout;
const { Title } = Typography;

const getCodeFromUrl = () => {
  const params = new URL(window.location.href).searchParams;
  return params.get('code');
}

export const Login = ({ user, setUser }: Props) => {
  const client = useApolloClient();
  const history = useHistory();

  const [logIn, { data: logInData, loading: loggingIn, error: logInError }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      const user = data?.logIn;
      if (user) {
        setUser(user);
        sessionStorage.setItem('token', user.token);
        displaySuccessNotification('Log In', 'You have successfully logged in!');
      }
    },
  });
  const logInRef = useRef(logIn);

  const handleSignInBtnClick = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL
      });

      if (data && data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch {
      displayErrorMessage('Log in failed! Please try again later!');
    }
  }

  useEffect(() => {
    const code = getCodeFromUrl();

    if (code) {
      logInRef.current({
        variables: {
          input: {
            code,
          }
        }
      })
    }
  }, []);

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

  if (user.id) {
    history.replace('/');
  }

  const logInErrorElement = logInError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong! :("
      description="Failed to log in using your Google account. Please try again later!"
    />
  ) : null;

  return (
    <Content className="login">
      <Helmet>
        <title className="login-title">Login</title>
      </Helmet>
      {logInErrorElement}
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
