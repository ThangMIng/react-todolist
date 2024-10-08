import React, { Component } from 'react';

class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.observer = null;
    this.lastElementRef = React.createRef();
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(this.handleIntersect);
    if (this.lastElementRef.current) {
      this.observer.observe(this.lastElementRef.current);
    }
  }

  componentWillUnmount() {
    if (this.observer && this.lastElementRef.current) {
      this.observer.unobserve(this.lastElementRef.current);
    }
  }

  handleIntersect = (entries) => {
    if (entries[0].isIntersecting && this.props.hasMore) {
      this.props.loadMore();
    }
  };

  render() {
    return <div ref={this.lastElementRef} style={{ height: '20px' }} />;
  }
}

export default InfiniteScroll;
