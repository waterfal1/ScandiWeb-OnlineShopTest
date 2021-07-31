import React from 'react';
// @ts-ignore
import  renderHTML from 'react-render-html';

export default class Description extends React.Component<{ description: string }> {
  render() {
    return renderHTML(this.props.description)
  }
}
