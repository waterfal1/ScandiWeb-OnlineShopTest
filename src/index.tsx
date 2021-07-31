import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import { setCurrency } from './store/Currency/actions';
import { setNewCategory } from './store/CategoryWasChosen/actions';
import { setGoods } from './store/ChoseGoods/actions';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const store = createStore(rootReducer);

const mapStateToProps = (state: { currency: { value: string; }; categoryChanging: { value: string; };
selectedItem: { value: number; }; }) => {
  return { stateCurrency: state.currency.value,
    categoryThings: state.categoryChanging.value,
    stateSelectedItem: state.selectedItem.value,
  }
}

const mapDispatchToProps = { setCurrency, setNewCategory, setGoods }

const WrapperApp = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <WrapperApp />
      </ApolloProvider>
    </Provider>,
  document.getElementById('root')
);
