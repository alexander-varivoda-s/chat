import { ApolloClient, ApolloProvider, InMemoryCache, useMutation } from '@apollo/client';
import { Layout, Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppHeader } from './lib/components';
import { LOG_IN } from './lib/graphql';
import { LogIn as LogInData, LogInVariables } from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { User } from './lib/types';
import { Home, Login } from './sections';
import './styles/index.scss';

const { Content } = Layout;

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
  headers: {
    'CSRF-TOKEN': sessionStorage.getItem('token') || '',
  },
});

const initialUser: User = {
  id: null,
  displayName: null,
  email: null,
  avatar: null,
  token: null
};

const getCodeFromUrl = () => {
  const params = new URL(window.location.href).searchParams;
  return params.get('code') || '';
}

const App = () => {
  const [user, setUser] = useState<User>(initialUser);

  const [logIn, { loading }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      const user = data?.logIn;
      if (user) {
        setUser(user);
        sessionStorage.setItem('token', user.token);
      }
    }
  });

  const logInRef = useRef(logIn);
  const code = getCodeFromUrl();

  useEffect(() => {
    if (!code && !user.id) {
      logInRef.current();
    }
  }, [code, user]);

  if (loading) {
    return (
      <Layout className="app app--loading">
        <Content>
          <Spin size="large" tip="Starting app..." />
        </Content>
      </Layout>
    )
  }

  return (
    <Layout className="app">
      <AppHeader user={user} setUser={setUser} />
      {user.id ? <Home /> : <Login code={code} setUser={setUser} />}
    </Layout>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
