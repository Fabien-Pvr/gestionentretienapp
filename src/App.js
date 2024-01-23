import logo from './image/LogoP2I.svg';
import './CSS/App.css';
import React from 'react';
import EntretienList from './EntretienList';
import MaterielList from './MaterielList';
import Footer from './Footer';
import FormMateriel from './FormMateriel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <MaterielList /> */}
        {/* <EntretienList /> */}
        <FormMateriel/>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
