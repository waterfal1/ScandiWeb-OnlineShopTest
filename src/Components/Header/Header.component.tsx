import React from 'react';
import './Header.style.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/a-logo.svg';
import { query } from '../../Pages/Home/getData';
import { ApolloQueryResult } from '@apollo/client';
import { goodsCollection } from "../functions";
import CurrenciesAndCart from "./CurrenciesAndCart";

export default class Header extends React.Component<{stateCurrency: number,
  setCurrency: (value: number) => {type: string, payload: number}, categoryThings: string,
  setNewCategory:  (value: string) => {type: string, payload: string}, stateSelectedItem: number,
  setGoods: (value: number) => {type: string, payload: number} }, {cartBar: boolean, activeCategoryId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentCurrency: string, cartWindowClose: boolean, loading: boolean, data: ApolloQueryResult<any> }> {
  private wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props: { stateCurrency: number; setCurrency: (value: number) => { type: string; payload: number; };
  categoryThings: string; setNewCategory: (value: string) => { type: string; payload: string; };
  stateSelectedItem: number; setGoods: (value: number) => { type: string; payload: number; }; }) {
    super(props)
    this.wrapperRef = React.createRef();
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
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClickOutside = (event: {target: any}): void => {
    if (this.wrapperRef.current === null) { return }
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ cartBar: false, cartWindowClose: false })
    }
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
    return products
      .map((product: {category: string}) => product.category)
      .reduce((accum: string, current: string) => {
        return accum.includes(current) ? accum : [accum, current]})
      .map((category: string, index: number) => {
      return (
        <NavLink key={index} to='/'>
          <li key={index} className='nav-text_row'>
            <div onClick={() => this.lightChange(index, category)} id={'navbar-text' + String(`${index}`)}
               className={this.state.activeCategoryId === index && this.state.activeCategoryId !== 0
                 ? 'navbar-link-block text-active' : 'navbar-link-block'}>
            {category.toUpperCase()}
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
    this.props.setCurrency(parseInt(index, 10))
    const currency = document.getElementById(index)
    if (currency === null) { return; }
    this.setState({ cartBar: false, currentCurrency: currency.innerHTML })
    sessionStorage.setItem('Currency', currency.innerHTML);
  }

  changeCurrency = (): void => {
    if (!this.state.cartBar) {
      this.setState({cartBar: true, cartWindowClose: false})
    }
    else
      this.setState({ cartBar: false })
  }

  setCartBar = (): void => {
    if (!this.state.cartWindowClose)
      this.setState({ cartWindowClose: true, cartBar: false })
    else
      this.setState({ cartWindowClose: false })
  }

  toggleCartWindow = (): void => {
    this.setState({ cartWindowClose: false, cartBar: false })
  }

  render(): React.ReactNode {
    if (!this.state.loading) return '....Loading'
    const { cartWindowClose, currentCurrency, cartBar } = this.state;
    const currencies = this.state.data.data.category.products[0].prices;
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    const goodsAmount = goodsCollection(goodsFromStorage);
    return (
      <>
        {cartWindowClose ? <div onClick={this.toggleCartWindow} className='dark-side' /> : null}
        <nav className='header_bar'>
          <ul className='nav-list'>{this.navbarLinks()}</ul>
          <NavLink to='/'>
            <img onClick={this.backButton} src={logo} alt='Back Button' />
          </NavLink>
          <div ref={this.wrapperRef} className='currency-icons'>
            <CurrenciesAndCart changeCurrency={this.changeCurrency}  cartWindowClose={cartWindowClose}
                               currencies={currencies} currentCurrency={currentCurrency}   goodsAmount={goodsAmount}
                               stateCurrency={this.props.stateCurrency} handleCurrency={this.handleCurrency}
                               setCartBar={this.setCartBar} setCurrency={this.props.setCurrency}
                               setGoods={this.props.setGoods} stateSelectedItem={this.props.stateSelectedItem}
                               toggleCartWindow={this.toggleCartWindow} cartBar={cartBar} />
          </div>
        </nav>
      </>
      );
  }
}
