import React from 'react';

export default class CurrentCurrency extends React.Component {
  render() {
    return (
      <>
        {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
      </>
    )
  }
}
