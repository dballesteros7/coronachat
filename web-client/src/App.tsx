import React from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { Template } from './model/model';

function App() {

  //TODO(MB) replace sample template with one returned by the server
  let template: Template = {
    header: `Bienvenidos a la OMS

      Obtenga información y orientación de la OMS sobre el brote de coronavirus COVID-19.
      
      ¿Qué le gustaría saber sobre coronavirus?
      
      Escriba el número (o emoji) para acceder a la información sobre estos temas:`,
    menuItems: [
      {
        index: 1,
        title: 'Últimas cifras',
        content: '',
        footerItems: [
          'Escriba 0 para ir al Menú'
        ]
      },
      {
        index: 2,
        title: 'Cómo protegerse',
        content: '',
        footerItems: [
          'Escriba 0 para ir al Menú'
        ]
      },
      {
        index: 3,
        title: 'Preguntas frecuentes',
        content: '',
        footerItems: [
          'Escriba 0 para ir al Menú'
        ]
      }
    ]
  }

  return (
    <div className="App">
      <h1>
        Main message
      </h1>
      <MainMessageForm template={template}/>
    </div>
  );
}

export default App;
