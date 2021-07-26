import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';
import HeaderContainer from './Components/Header/Header.container';
import HomeContainer from './Pages/Home/Home.container';
import GoodContainer from './Pages/Goods/Goods.container.';
import CartContainer from './Pages/Cart/Cart.container';

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <HeaderContainer />
        <Switch>
          <Route exact path='/' component={HomeContainer}/>
          <Route exact path='/goods' component={GoodContainer}/>
          <Route exact path='/cart' component={CartContainer}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

