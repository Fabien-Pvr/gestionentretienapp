import logo from './image/LogoP2I.svg';
import './CSS/App.css';
import React from 'react';
import EntretienList from './EntretienList';
import MaterielList from './MaterielList';
import Footer from './Footer';
import FormMateriel from './FormMateriel';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='ContainerInit'>
        <MaterielList />
        <EntretienList />
        {/* <FormMateriel/>
        <Home/> */}
          </div>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
