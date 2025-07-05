import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import VotingModule from './components/VotingModule.jsx';
import reducer from './reducers/index.js';
import { GlobalStyles } from './styles/GlobalStyles.js';

// Create Redux store
const store = createStore(reducer, applyMiddleware(thunk));

// Module component
const Module = () => (
  <Provider store={store}>
    <GlobalStyles />
    <VotingModule />
  </Provider>
);

// Export module configuration for Nexus
const moduleConfig = {
  name: 'voting-module',
  displayName: 'Voting',
  component: Module
};

// Export for UMD (Nexus module system)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = moduleConfig;
}

// Export for ES6 modules
export default moduleConfig;