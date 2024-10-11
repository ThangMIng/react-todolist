import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

export class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
    isDarkTheme: false,
  }
};
  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }));
  };

  render() {
    return (
      <ThemeContext.Provider value={{ 
        isDarkTheme: this.state.isDarkTheme,
        toggleTheme: this.toggleTheme 
      }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}