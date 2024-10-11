import React from 'react';

const infiniteScroll = (WrappedComponent, itemsPerPage) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 0,
      };
      this.listRef = React.createRef(); 
    }

    componentDidMount() {
      this.listRef.current.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      this.listRef.current.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
      const { currentPage } = this.state;
      const { data } = this.props;
      const { scrollTop, scrollHeight, clientHeight } = this.listRef.current;

      const nearBottom = scrollTop + clientHeight >= scrollHeight ;

      if (nearBottom && (currentPage + 1) * itemsPerPage < (data ? data.length : 0)) {
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
      }
    };

    render() {
      const { currentPage } = this.state;
      const { data } = this.props;
      const paginatedData = data ? data.slice(0, (currentPage + 1) * itemsPerPage) : [];

      return (
        <div ref={this.listRef} style={{ overflowY: 'auto', maxHeight: '400px' }}> 
          <WrappedComponent {...this.props} data={paginatedData} />
        </div>
      );
    }
  };
};

export default infiniteScroll;
