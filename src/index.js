// Import third party libraries
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import bootstrap from 'angular-ui-bootstrap';

// Import styles
import 'angular/angular-csp.css';
import './styles/index.scss';

// Import config for libraries
import routeConfig from './routeConfig';

// Import components
import home from './pages/home';
import topNav from './containers/top-nav';
import angucompleteAlt from '../public/_assets/angucomplete';

// This is our main angular application with dependencies
const app = angular
  .module('app', [
    bootstrap,
    uiRouter,
    ngAnimate,
    ngMessages,
    "angucomplete-alt",

    home,
    topNav,
  ]);

// Enable HTML5 mode for routes
app.config(['$locationProvider', ($locationProvider) => {
  $locationProvider.hashPrefix('#');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
}]);

// Load config for ui-router
app.config(routeConfig(app));

export default app;
