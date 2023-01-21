import React from 'react';
import ReactDOM from 'react-dom';
import Layout  from './Components/CommonComponents/Layout';
import Login from './Components/PageComponents/Login';
import {HashRouter, Route} from 'react-router-dom'
import Home from '../src/Components/PageComponents/Home';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import DataProvider from './context/DataProvider';
import Logout from './Components/PageComponents/LogOut';
import Chat from './Components/PageComponents/Chat';

import './styles/index.scss';
import DashBoard from './Components/PageComponents/Dashboard';

const root = document.getElementById('root');
ReactDOM.render(
  <DataProvider location={Location}>
    <ChakraProvider>
      <HashRouter> 
        <Layout>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logOut" component={Logout} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/dashBoard" component={DashBoard} />
        </Layout>
      </HashRouter>
    </ChakraProvider>
  </DataProvider>, root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
