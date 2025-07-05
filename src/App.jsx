import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import VotingModule from './components/VotingModule';
import reducer from './reducers';
import { GlobalStyles } from './styles/GlobalStyles';

// Create Redux store
const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <VotingModule />
    </Provider>
  );
}

export default App;