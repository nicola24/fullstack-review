import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log('AJAX POST SENT: ', term);
    $.ajax({
      method:'POST',
      url:'/repos',
      contentType:'application/json',
      data: JSON.stringify({term: term}),
      success: (data) => {
        console.log('DATA SENT!', data);
      },
      error: (data) => {
        console.error('FAILED TO SEND!', data);
      }
    });
  }

  // retreive () {
  //   console.log();
  //   $.ajax({
  //     method: 'GET',
  //     url: '/repos',
  //     data:,
  //     success: (data) => {
  //       console.log('DATA RETREIVED', data);
  //     },
  //     error: (data) => {
  //       console.error('FAILED TO RETREIVE DATA', data);
  //     }
  //   });
  // }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
