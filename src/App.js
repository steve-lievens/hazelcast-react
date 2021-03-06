import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import AccountPage from './content/AccountPage';
import TechPage from './content/TechPage';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/tech" component={TechPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
