import React from 'react';
import AccountTable from './AccountTable';
import axios from 'axios';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateDataLoop = this.updateDataLoop.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.state = {
      // The headers define which columns we'll show in the DataTable.
      headers: [
        {
          key: 'DATE',
          header: 'DATE',
        },
        {
          key: 'ROW',
          header: 'ROW',
        },
        {
          key: 'TRANS_ID',
          header: 'TRANS_ID',
        },
        {
          key: 'CLIENT_ID',
          header: 'CLIENT_ID',
        },
        {
          key: 'TYPE',
          header: 'TYPE',
        },
        {
          key: 'AMOUNT',
          header: 'AMOUNT',
        },
        {
          key: 'BALANCE',
          header: 'BALANCE',
        },
        {
          key: 'OPERATION',
          header: 'OPERATION'
        }
      ],
      rows: [],
      rowsforpage: [],
      startRow: 0,
      endRow: 10,
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50],
      tableheader: "My Transactions",
      tablerefreshloop: false
    };
  }

  // Method called when invoking one of the pagination elements below the table
  handlePagination(event) {
    // info coming from the paging control
    const { page, pageSize } = event;
    if (page && pageSize) {
      // Let's print the incoming numbers for debugging purposes.
      var nrrows = this.state.rows.length;
      console.log('Page = ' + page);
      console.log('Pagesize = ' + pageSize);
      console.log('Number of rows = ' + nrrows);

      // Calculate start and end row based on input
      var startRow = (page - 1) * pageSize;
      var endRow = startRow + pageSize;
      // Cut it off at the end
      if (endRow > nrrows) endRow = nrrows;

      // Print the results for debugging purposes
      console.log('Startrow = ' + startRow);
      console.log('Endrow = ' + endRow);

      // Now get the rows we need by slicing the full data set
      console.log('This is the full data : ', this.state.rows);
      var mydatapaged = this.state.rows.slice(startRow, endRow);
      console.log('This is the paged data : ', mydatapaged);

      // And finally update the state (which will re-render the component)
      this.setState((prevState, props) => {
        return {
          page,
          pageSize,
          startRow,
          endRow,
          rowsforpage: mydatapaged,
        };
      });
    }
  }

  // Helper function to sort the data on the "date" attribute
  compare(a, b) {
    const dateA = a.DATE;
    const dateB = b.DATE;

    let comparison = 0;
    if (dateA > dateB) {
      comparison = -1;
    } else if (dateA < dateB) {
      comparison = 1;
    }
    return comparison;
  }

  // Helper function to sort the data on the "row" attribute
  compare2(a, b) {
    const rowA = a.ROW;
    const rowB = b.ROW;

    let comparison = 0;
    if (rowA > rowB) {
      comparison = -1;
    } else if (rowA < rowB) {
      comparison = 1;
    }
    return comparison;
  }

  initiateHeader() {
    let apiUrl = '/ui/getheader';
    console.log('Connecting to ' + apiUrl);

    // Connect using the axios library.
    axios
      .get(apiUrl)
      .then(repos => {
        var mydata = repos.data;
        console.log("Table Header = " + mydata.tableheader);

        this.setState((prevState, props) => {
          return { tableheader: mydata.tableheader };
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

  updateDataLoop() {
    //this.interval = setInterval(() => this.updateData(), 1000);

    if(this.interval){
      clearInterval(this.interval);
      this.interval = null;
    } else {
      this.interval = setInterval(() => this.updateData(), 1000);
    }
  }

  updateData() {
    // Get the data from Hazelcast

    // Get all the transactions from a single account (account is set in the quarkus project via env.)
    // FYI : in dev mode, the package.json has a proxy defined to allow to connect
    // to another port. In this case 8080 where the quarkus client is running.
    let apiUrl = '/transaction/getByAccount';
    console.log('Connecting to ' + apiUrl);

    // Connect using the axios library.
    // For now we get the full data set in one go.
    // If this becomes too big, we'll need to add start and end info based on the pagination
    axios
      .get(apiUrl)
      .then(repos => {
        var mydata = repos.data;
        var x = 0;

        // Now sort it by date
        mydata.sort(this.compare2);
        console.log('This is your sorted data ', mydata);

        // Data manipulation
        mydata.forEach(function(row) {
          // console.log(row);
          // We need a property called "id" for the Carbon DataTable, so adding it here
          row.id = x.toString();
          // Shorten the type value
          if(row.TYPE === "CREDIT") row.TYPE = "CR";
          if(row.TYPE === "WITHDRAWAL") row.TYPE = "WD";
          if(row.K_SYMBOL === "null") row.K_SYMBOL = "";

          // convert the date to string if number
          if(typeof row.DATE === 'number') {
            row.DATE = row.DATE.toString();
          }

          // convert the date if string
          if(typeof row.DATE === 'string' || row.DATE instanceof String) {
            var date = new Date(row.DATE.substring(0,4),row.DATE.substring(4,5),row.DATE.substring(5,6));
            row.DATE = date.toDateString()  
          }

          // Convert the ingest time property
          if(typeof row.INGEST_TIME === 'string' || row.INGEST_TIME instanceof String){
            var date2 = new Date(row.INGEST_TIME);
            row.INGEST_TIME = date2.toUTCString();  
          }

          x = x + 1;
        });


        // Now set it up for pagination based on the component state
        var mydatapaged = mydata.slice(this.state.startRow, this.state.endRow);

        this.setState((prevState, props) => {
          return { rows: mydata, rowsforpage: mydatapaged };
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
    this.initiateHeader();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="bx--grid bx--grid--full-width bx--grid--no-gutter account-page">
        <div className="bx--row account-page__r1">
          <div className="accounttable bx--col-lg-16">
            <AccountTable
              state={this.state}
              updateDataLoop={this.updateDataLoop}
              handlePagination={this.handlePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
