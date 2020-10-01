import React from 'react';
import axios from 'axios';
import {
  Button,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from 'carbon-components-react';

class TechPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  clearMaps() {
    // Call the clear map api
    let apiUrl = '/techinfo/clearmaps';
    console.log('Connecting to ' + apiUrl);

    // Connect using the axios library.
    // For now we get the full data set in one go.
    // If this becomes too big, we'll need to add start and end info based on the pagination
    axios
      .get(apiUrl)
      .then(repos => {
        var mydata = repos.data;

        console.log('Incoming data ', mydata);

        // finally refresh
        this.updateData();
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

  updateData() {
    // Get the data from Hazelcast
    let apiUrl = '/techinfo/getoverview';
    console.log('Connecting to ' + apiUrl);

    // Connect using the axios library.
    // For now we get the full data set in one go.
    // If this becomes too big, we'll need to add start and end info based on the pagination
    axios
      .get(apiUrl)
      .then(repos => {
        var mydata = repos.data;

        console.log('Incoming data ', mydata);

        this.setState((prevState, props) => {
          return { rows: mydata };
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
      <div className="bx--grid bx--grid--full-width bx--grid--no-gutter account-page">
        <div className="bx--row account-page__r1">
          <div className="bx--col-lg-16 techtable">
            <div className="bx--data-table-header">
              <h4 className="bx--data-table-header__title">
                Hazelcast IMDG Info
              </h4>
            </div>
          </div>
          <div className="bx--col-lg-16 techtable">
            <div className="refreshbutton">
              <Button onClick={() => this.updateData()}>Refresh</Button>
              <Button kind="danger" onClick={() => this.clearMaps()}>
                Clear Maps
              </Button>
            </div>
          </div>
          <div className="bx--col-lg-16">
            <StructuredListWrapper>
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head>Map Name</StructuredListCell>
                  <StructuredListCell head>Map Size</StructuredListCell>
                  <StructuredListCell head>Sample Content</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {this.state.rows.map(row => (
                  <StructuredListRow key={row.id}>
                    <StructuredListCell noWrap>
                      {row.mapname}
                    </StructuredListCell>
                    <StructuredListCell>{row.mapcount}</StructuredListCell>
                    <StructuredListCell>{row.mapsample}</StructuredListCell>
                  </StructuredListRow>
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default TechPage;
