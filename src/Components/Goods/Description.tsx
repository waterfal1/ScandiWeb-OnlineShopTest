import React from 'react';

export default class Description extends React.Component<{ description: string }> {
  render() {
    return (
      <p className='description' dangerouslySetInnerHTML={createMarkup(this.props.description)} />
    )
  }
}

function createMarkup(input: string) {
  return {__html: input};
}
