import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
  useMutation
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Layout, Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppHeader } from './lib/components';
import { LOG_IN } from './lib/graphql';
import {
  LogIn as LogInData,
  LogInVariables
} from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { User } from './lib/types';
import { Home, Login } from './sections';
import './styles/index.scss';

const httpLink = new HttpLink({
  uri: '/api',
  headers: {
    'CSRF-TOKEN': sessionStorage.getItem('token') || ''
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://${window.location.host}/graphql`,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const { Content } = Layout;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
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
};

const App = () => {
  const [user, setUser] = useState<User>(initialUser);

  const [logIn, { loading }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      const loggedInUser = data?.logIn;
      if (loggedInUser) {
        setUser(loggedInUser);
        sessionStorage.setItem('token', loggedInUser.token);
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
    );
  }

  return (
    <Layout className="app">
      <AppHeader user={user} setUser={setUser} />
      {user.id ? <Home /> : <Login code={code} setUser={setUser} />}
    </Layout>
  );
};

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
