import React from 'react';
import './Header.style.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/a-logo.svg';
import cart from '../../assets/cart.svg';
import HeaderCurrencies from './HeaderCurrencies.component';
import CartMenu from './HeaderCartMenu.component';
import { query } from '../../Pages/Home/getData';
import { ApolloQueryResult } from '@apollo/client';

export default class Header extends React.Component<{stateCurrency: string,
  setCurrency: (value: string) => {type: string, payload: string}, categoryThings: string,
  setNewCategory:  (value: string) => {type: string, payload: string}, stateSelectedItem: number,
  setGoods: (value: number) => {type: string, payload: number} }, {cartBar: boolean, activeCategoryId: number,
  currentCurrency: string, cartWindowClose: boolean, loading: boolean, data: ApolloQueryResult<any> }> {

  constructor(props: { stateCurrency: string; setCurrency: (value: string) => { type: string; payload: string; };
  categoryThings: string; setNewCategory: (value: string) => { type: string; payload: string; };
  stateSelectedItem: number; setGoods: (value: number) => { type: string; payload: number; }; } |
    Readonly<{ stateCurrency: string; setCurrency: (value: string) => { type: string; payload: string; };
    categoryThings: string; setNewCategory: (value: string) => { type: string; payload: string; };
    stateSelectedItem: number; setGoods: (value: number) => { type: string; payload: number; }; }>) {
    super(props)
    this.state = {data: {data: {}, loading: false, networkStatus: 0}, cartBar: false, activeCategoryId: 0,
      currentCurrency: '$', cartWindowClose: false, loading: false }
  }

  componentDidMount(): void {
    query(`
      query { category {
        name
        products {
        category
        prices {
        currency
        amount
        }
      }}}
    `)
        .then(result => {
          this.setState({loading: true, data: result})
        })
  }

  lightChange(newCategoryId: number, categoryName: string) {
    this.setState({ activeCategoryId:  newCategoryId})
    const oldClassCategory = document.getElementById(`navbar-text${this.state.activeCategoryId}`);
    if (oldClassCategory === null) return;
    oldClassCategory.className = 'navbar-link-block';
    this.props.setNewCategory(categoryName)
    const newClassCategory = document.getElementById( `navbar-text${newCategoryId}`);
    if (newClassCategory == null) return;
    newClassCategory.className = 'navbar-link-block text-active';
  }

  navbarLinks() {
    const products = this.state.data.data.category.products;
    // @ts-ignore
    return products
      .map((product: {category: string}) => product.category)
      .reduce((accum: string, current: string) => {
        return accum.includes(current) ? accum : [accum, current]})
      .map((category: string, index: number) => {
      return (
          <NavLink key={index} to='/'>
        <li key={index} className={'nav-text_row'}>
          <div onClick={() => this.lightChange(index, category)} id={'navbar-text' + String(`${index}`)}
             className={this.state.activeCategoryId === index && this.state.activeCategoryId !== 0
                 ? 'navbar-link-block text-active' : 'navbar-link-block'}>
            {category}
          </div>
        </li>
      </NavLink>
      );
    })
  }

  backButton = (): void => {
    this.props.setNewCategory('')
  }

  handleCurrency = (index: string): void => {
    this.props.setCurrency(index)
    const currency = document.getElementById(index)
    if (currency === null) {return; }
    this.setState({ cartBar: false, currentCurrency: currency.innerHTML })
  }

  changeCurrency = (): void => {
    if (!this.state.cartBar)
      this.setState({ cartBar: true})
    else
      this.setState({ cartBar: false })
  }

  setCartBar = (): void => {
    if (!this.state.cartWindowClose)
      this.setState({ cartWindowClose: true })
    else
      this.setState({ cartWindowClose: false })
  }

  toggleCartWindow = (): void => {
    this.setState({ cartWindowClose: false })
  }

  render(): React.ReactNode {
    if (!this.state.loading)
      return '....Loading'
    const { cartWindowClose, currentCurrency, cartBar } = this.state;
    const currencies = this.state.data.data.category.products[0].prices
    return (
      <>
        {cartWindowClose ? <div onClick={this.toggleCartWindow} className='dark-side' /> : <></>}
        <nav className='header_bar'>
          <ul className='nav-list'>{this.navbarLinks()}</ul>
          <NavLink to='/'>
            <img onClick={this.backButton} src={logo} alt='Back Button' />
          </NavLink>
          <div className='currency-icons'>
            <div className='column-container'>
              <div className='currency-container' onClick={this.changeCurrency}>
                {currentCurrency}
                <div className='arrow-down' />
              </div>
              {cartBar ? <HeaderCurrencies currencies={currencies} handleCurrency={this.handleCurrency} /> : <></>}
            </div>
            <img onClick={this.setCartBar} className='a-number-of' src={cart} alt='Cart' />
              {sessionStorage.length > 0 ? <div className='number'>{sessionStorage.length}</div>: <></>}
            {cartWindowClose ?
            <CartMenu toggleCartWindow={this.toggleCartWindow} stateCurrency={this.props.stateCurrency}
                      setCurrency={this.props.setCurrency} stateSelectedItem={this.props.stateSelectedItem}
                      setGoods={this.props.setGoods} />
             : <></>}
          </div>
        </nav>
      </>
      );
  }
}
