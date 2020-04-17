/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import { style } from "variables/Variables";

import routes from "./routes";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      color: "black",
      hasImage: false,
      image: require('~/assets/img/sidebar-2.jpg'),
      fixedClasses: "dropdown show-dropdown open"
    };

    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      this.props.history.push('/login');
      return;
    }
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  handleLogout = () => {
    window.localStorage.clear();
    this.props.history.push('/login')
  }

  handleNotificationClick = ({message, icon, position, level}) => {
    if (!level) level = 'info';

    if (!icon) {
      switch (level) {
        case 'success':
          icon = 'pe-7s-check'
          break;
        case 'warning':
          icon = 'pe-7s-flag'
          break;
        case 'error':
          icon = 'pe-7s-close'
          break;
        default:
          icon = 'pe-7s-info'
          break;
      }
    }

    if (!position) position = 'tr';

    if(this.state._notificationSystem) 
    {
      this.state._notificationSystem.addNotification({
        title: <span data-notify="icon" className={icon || 'pe-7s-chat'} />,
        message: (
          <div>{message}</div>
        ),
        level: level,
        position: position,
        autoDismiss: 5
      });
    }
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          render={props => (
            <prop.component
              {...props}
              notification={this.handleNotificationClick}
            />
          )}
          key={key}
        />
      );
    });
  }

  getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  }

  render() {
    return (
      <div className="wrapper">
        <NotificationSystem 
          ref="notificationSystem" 
          style={style} 
        />
        <Sidebar 
          appName="Frontend" {...this.props} 
          image={this.state.image}
          hasImage={this.state.hasImage}
          color={this.state.color}
          routes={routes.map(r => ({...r, path: `/admin${r.path}`}))} 
        />
        <div 
          id="main-panel" 
          className="main-panel" ref="mainPanel"
        >
          <AdminNavbar
            {...this.props}
            handleLogout={this.handleLogout}
            brandText={this.getBrandText()}
          />
          <Switch>
            {this.getRoutes(routes.map(r => ({...r, path: `/admin${r.path}`})))}
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}
