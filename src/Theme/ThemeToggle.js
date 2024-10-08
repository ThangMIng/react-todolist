import React, { Component } from 'react';
import { ThemeContext } from './ThemeContext';

class ThemeToggle extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ isDarkTheme, toggleTheme }) => (
          <button onClick={toggleTheme} className='switch'>
            {isDarkTheme ? 'Light' : 'Dark'}
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default ThemeToggle;