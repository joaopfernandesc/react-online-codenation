import React from 'react';

import Topbar from "./components/Topbar"
import Filters from "./components/Filters"
import Contacts from "./components/Contacts"

import './App.scss';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      contacts: []
    }
  }

  componentDidMount(){
    fetch("https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts")
      .then(response => response.json())
      .then(response => this.setState({contacts: response}));
  }

  render() {
    return (
      <>
        <Topbar />

        <Filters />
        
        <Contacts contacts={this.state.contacts}/>
      </>
    )
  }
}

export default App;
