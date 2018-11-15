import React from 'react';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    window.scrollTo({
      top: 0, // could be negative value
      left: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return null;
  }
}
export default ScrollToTop;
