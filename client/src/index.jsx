import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import CowTable from './CowTable.jsx';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currName: '',
      currDesc: '',
      cowList: []
    }

    this.getTheCows = this.getTheCows.bind(this);
    this.postCow = this.postCow.bind(this);
    this.selectCow = this.selectCow.bind(this);
  }

  selectCow(cow) {
    console.log(cow)
    this.setState({
      currName: cow.name,
      currDesc: cow.description
    })
  }

  getTheCows() {
    axios({
      method: 'get',
      url: '/api/cows'
    })
      .then(({data}) => {
        console.log('Successfully retrieved cows: ', data)
        this.setState({
          cowList: data[0]
        })
      })
      .catch((err) => {
        console.log('Could not retrieve cows: ', err)
      })
  }

  componentDidMount() {
    this.getTheCows()
  }

  postCow(name, desc) {
    axios({
      method: 'post',
      url: 'api/cows',
      data: {
        name: name,
        description: desc
      }
    })
      .then((insertedCow) => {
        console.log('Correctly inserted: ', insertedCow)
        this.getTheCows()
      })
      .catch((err) => {
        console.log('Could not insert cow')
      })
  }


  render() {
    //console.log('Cowsss: ', this.state.cowList)

    return (
      <div>
          Hello There! Welcome to the Cow List! Moooo
        <div>Currently selected cow: {this.state.currName ? this.state.currName + ' : ' + this.state.currDesc : 'No cow selected'}</div>
        <div>
          There are currently {this.state.cowList.length} cows in the Database:
        </div>
        <div>
          <CowTable
            cows={this.state.cowList}
            key='1'
            selectCow={this.selectCow}
          />
        </div>

        <br />


        <Search onClickInsertCow={this.postCow}/>

      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);