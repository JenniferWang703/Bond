import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppTheme from './AppTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
console.log(AppTheme)
ReactDOM.render(
<MuiThemeProvider theme={AppTheme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
    </MuiPickersUtilsProvider>
</MuiThemeProvider>
    , document.getElementById('root'));
