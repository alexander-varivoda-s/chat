import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { User } from './lib/types';
import { Home, Login, NotFound } from './sections';
import './styles/index.scss';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
});

const initialUser: User = {
  id: null,
  displayName: null,
  email: null,
  avatar: null
};

const App = () => {
  const [user, setUser] = useState<User>(initialUser);

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
