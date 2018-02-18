import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import ReposResult from './components/ReposResult.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

componentDidMount() {
  this.fetch((data) => {
    this.setState({
      repos: data
    });
  });
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

  fetch (callback) {
    $.ajax({
      url: '/repos',
      method:'GET',
      success: (data) => {
        console.log('DATA RECEIVED!', data);
        callback(data);
      },
      error: (data) => {
        console.error('FAILED TO RECEIVED DATA!', data);
      }
    });
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
        <ReposResult reposresult={this.state.repos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
