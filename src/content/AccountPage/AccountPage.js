import React from 'react';
import AccountTable from './AccountTable';
import axios from 'axios';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.state = {
      headers: [
        {
          key: 'date',
          header: 'DATE',
        },
        {
          key: 'type',
          header: 'TYPE',
        },
        {
          key: 'amount',
          header: 'AMOUNT',
        },
        {
          key: 'balance',
          header: 'BALANCE',
        },
        {
          key: 'k_symbol',
          header: 'K_SYMBOL',
        },
      ],
      rows: [],
      rowsforpage: [],
      startRow: 0,
      endRow: 10,
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50],
    };
  }

  tabletitle = 'My Transactions';

  handlePagination(event) {
    const { page, pageSize } = event;
    if (page && pageSize) {
      var nrrows = this.state.rows.length;
      console.log('Page = ' + page);
      console.log('Pagesize = ' + pageSize);
      console.log('Number of rows = ' + nrrows);

      var startRow = (page - 1) * pageSize;
      var endRow = startRow + pageSize;
      if (endRow > nrrows) endRow = nrrows;

      console.log('Startrow = ' + startRow);
      console.log('Endrow = ' + endRow);

      // Now set it up for pagination
      console.log("This is the full data : ", this.state.rows)
      var mydatapaged = this.state.rows.slice(
        startRow,
        endRow
      );
      console.log('This is the paged data : ', mydatapaged);

      this.setState((prevState, props) => {
        return {
          page,
          pageSize,
          startRow,
          endRow,
          rowsforpage: mydatapaged,
        }
      });
    }
  }

  compare(a, b) {
    const dateA = a.date;
    const dateB = b.date;

    let comparison = 0;
    if (dateA > dateB) {
      comparison = -1;
    } else if (dateA < dateB) {
      comparison = 1;
    }
    return comparison;
  }

  paginateData() {}

  updateData() {
    //const apiUrl = 'http://localhost:8080/transaction/getByClient?key=1';
    const apiUrl = '/transaction/getByClient?key=1';

    axios
      .get(apiUrl)
      .then(repos => {
        var mydata = repos.data;
        var x = 0;
        mydata.forEach(function(row) {
          row.id = x.toString();
          x = x + 1;
        });

        // Now sort it by date
        mydata.sort(this.compare);
        console.log('This is your sorted data ', mydata);

        // Now set it up for pagination
        var mydatapaged = mydata.slice(this.state.startRow, this.state.endRow);

        this.setState((prevState, props) => {
          return { rows: mydata, rowsforpage: mydatapaged }
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
          <div className="accounttable bx--col-lg-16">
            <AccountTable
              state={this.state}
              tabletitle={this.tabletitle}
              updateData={this.updateData}
              handlePagination={this.handlePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
