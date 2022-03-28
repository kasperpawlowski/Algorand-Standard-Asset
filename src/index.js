import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ClientContext from './components/ClientContext';
import algosdk from 'algosdk';

const token =	'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const server = 'http://localhost';
const port = 4001;

ReactDOM.render(
    <BrowserRouter>
    <ClientContext.Provider value={new algosdk.Algodv2(token, server, port)}>
      <App />
    </ClientContext.Provider>
    </BrowserRouter>, 
    document.getElementById('root')  
);