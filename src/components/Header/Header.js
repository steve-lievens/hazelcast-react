import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from 'carbon-components-react/lib/components/UIShell';
import Notification20 from '@carbon/icons-react/lib/notification/20';
import UserAvatar20 from '@carbon/icons-react/lib/user--avatar/20';
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TutorialHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logourl : 'https://dwglogo.com/wp-content/uploads/2016/05/IBM_logo.png'
    }
  }


  updateData() {
    let apiUrl = '/ui/getlogourl';
    console.log('Connecting to ' + apiUrl);

    // Connect using the axios library.
    // For now we get the full data set in one go.
    // If this becomes too big, we'll need to add start and end info based on the pagination
    axios
      .get(apiUrl)
      .then(repos => {
        var mydata = repos.data;
        console.log("LogoURL = " + mydata.logourl);

        this.setState((prevState, props) => {
          return { logourl: mydata.logourl };
        });
      })
      .catch(function(error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    return (
      <Header aria-label="Carbon Tutorial">
      <SkipToContent />
      <HeaderName element={Link} to="/" prefix="">
        <div className="cpylogodiv">
          <img
            className="cpylogo"
            src={this.state.logourl}
            alt="company logo"
          />
        </div>
      </HeaderName>
      <HeaderNavigation aria-label="Carbon Tutorial">
        <HeaderMenuItem element={Link} to="/account">
          Account Info
        </HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notifications">
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User Avatar">
          <UserAvatar20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="App Switcher">
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
    );
  }
}


export default TutorialHeader;
