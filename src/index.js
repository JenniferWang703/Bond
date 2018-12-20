import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppTheme from './AppTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
console.log(AppTheme)
ReactDOM.render(<MuiThemeProvider theme={AppTheme}><App /></MuiThemeProvider>, document.getElementById('root'));
