import React from 'react';
import Campobase from './components/Campobase';
import { Provider } from 'react-redux';
//import { ConfigureStore} from '.redux/configureStore';
import  { store }  from './redux/configureStore';

//const store = ConfigureStore();

export default class App extends React.Component {
  render(){
    return (
        <Provider store={store}>
          <Campobase/>
        </Provider>
    );
  }
}
