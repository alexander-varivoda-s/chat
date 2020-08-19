import { ApolloClient, ApolloProvider, InMemoryCache, useMutation } from '@apollo/client';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LOG_IN } from './lib/graphql';
import { LogIn as LogInData, LogInVariables } from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { User } from './lib/types';
import { Home, Login, NotFound } from './sections';
import './styles/index.scss';

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

const App = () => {
  const [user, setUser] = useState<User>(initialUser);

  const [logIn, { loading }] = useMutation<LogInData, LogInVariables>(LOG_IN);
  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, [])


  return (
    <Layout className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route component={NotFound} />
      </Switch>
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
