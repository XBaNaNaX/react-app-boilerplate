import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";

require('dotenv').config();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {contacts: null};
    }

    async loadContact() {
        let _this = this;
        let api_url = process.env.REACT_APP_API_URL;
        await axios.get(api_url+'/contacts')
            .then(function (response) {
                _this.setState({contacts: response.data});
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    async searchContact() {
        let _this = this;
        let api_url = process.env.REACT_APP_API_URL;
        await axios.post(api_url+'/contacts/search', {
                textSearch: document.getElementById("contact-search").value
            })
            .then(function (response) {
                _this.setState({contacts: response.data});
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    async componentDidMount() {
        this.loadContact();
    }

    render() {
        let {contacts} = this.state;
        let _this = this;
        let props = this.props;
        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
          }, {
            Header: 'Email',
            accessor: 'email',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          }, {
            Header: 'Role',
            accessor: 'role' // String-based value accessors!
          }, {
            Header: 'Group',
            accessor: 'group' // String-based value accessors!
          },{
            Header: 'Mobile',
            accessor: 'mobile' // String-based value accessors!
          },{
            Header: 'Office',
            accessor: 'office' // String-based value accessors!
          },{
            Header: 'Department',
            accessor: 'department' // String-based value accessors!
          },{
            Header: 'Nickname',
            accessor: 'nickname' // String-based value accessors!
          }]

        return (
            <div>
                <h1>Contact</h1>
                <input type="text" id="contact-search" onChange={(e)=>{
                    console.log(e.target.value)
                    if (e.target.value.length >= 3) {
                        _this.searchContact()
                    }
                }}></input>
                { contacts !== null ?
                    <ReactTable
                        data={contacts}
                        columns={columns}
                    />: 'Loading data ...'
                }
            </div>
        );
    }
}

export default Home;