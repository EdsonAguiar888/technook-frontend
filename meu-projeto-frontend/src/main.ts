

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


// Importações do Chart.js
import { Chart, registerables } from 'chart.js';


// Registra todos os componentes (Bar, Doughnut, Line, controllers, etc.)
Chart.register(...registerables);



bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));





// // Indicado pelo chatgpt


// import {
//   bootstrapApplication
// } from '@angular/platform-browser';

// import {
//   AppComponent
// } from './app/app.component';

// import {
//   appConfig
// } from './app/app.config';

// bootstrapApplication(
//   AppComponent,
//   appConfig
// ).catch(err =>
//   console.error(err)
// );