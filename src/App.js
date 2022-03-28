import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Creator from './components/Creator';
import Explorer from './components/Explorer';
import algosdk from 'algosdk';

function App() {
  const [account, setAccount] = useState(null);
  
  const createWallet = () => {
    setAccount(algosdk.generateAccount());
  }

  return (
    <div className="App">
      <Navigation />
      <Routes >
        <Route path='/' element={<Creator account={account} createWallet={createWallet} />} exact />
        <Route path='/explore' element={<Explorer account={account} />} />
        <Route render={function () {
          return <p>Not found</p>
        }} />
      </Routes>
    </div>
  );
}

export default App;
