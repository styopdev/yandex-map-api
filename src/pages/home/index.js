import angular from 'angular';
import component from './home.component';

import './home.scss';

const module = angular
  .module('home', [

  ])
  .component('home', component)
  .name;

export default module;
