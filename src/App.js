import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import { Link } from 'react-router'

import logo from './logo.svg';
import './App.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

var styles = {
  drawer: {
    backgroundColor: '#0000ff',
    height: '100%'
  },
  menuItem: {
    fontSize: 14
  },
  nestedMenuItem: {
    fontSize: 14,
    paddingLeft: 10
  }
}

injectTapEventPlugin();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Drawer className="drawer" open={ true } width={ 250 } zDepth={ 1 }>
            <div className="">
              <div className="logo-container">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <h5>Practiweb</h5>
            </div>

            <Link to="/dashboard" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Inicio</MenuItem>
            </Link>


            <h4>Datos/Análisis</h4>
            <Link to="/company" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Total Compañía</MenuItem>
            </Link>

            <Link to="/stores" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Por tienda</MenuItem>
            </Link>

            <Link to="/polls" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Por encuesta</MenuItem>
            </Link>

            <Link to="/questions" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Por pregunta</MenuItem>
            </Link>

            <Link to="/advanced" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Avanzado/Personalizado</MenuItem>
            </Link>


            <h4>Administración</h4>
            <Link to="/abcd" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Encuestas</MenuItem>
            </Link>

            <Link to="/abcd" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Preguntas</MenuItem>
            </Link>

              <Link to="/abcd" className="menu-item-link" activeClassName="menu-item-link-active">
                <MenuItem className="menu-item" style={ styles.nestedMenuItem }>Opciones</MenuItem>
              </Link>

            <Link to="/abcd" className="menu-item-link" activeClassName="menu-item-link-active">
              <MenuItem className="menu-item" style={ styles.menuItem }>Empleados</MenuItem>
            </Link>

            <h4>Cuenta</h4>
            <Link to="/" className="menu-item-link">
              <MenuItem className="menu-item" style={ styles.menuItem }>Salir</MenuItem>
            </Link>
          </Drawer>

          <div className="app">
            <AppBar
            style={{position: 'fixed'}}
              title="Title"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              showMenuIconButton={ false }
            />

            <div className="app-container" style= {{paddingTop: '90px', paddingLeft: '40px', paddingRight: '40px'}}>
              {this.props.children}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
