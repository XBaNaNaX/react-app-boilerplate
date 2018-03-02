import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TextBox from './Components/Controls/TextBox';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {units: null};
    }

    async loadUnit() {
        let _this = this;
        await axios.get('https://inventory-react.herokuapp.com/api/units')
            .then(function (response) {
                _this.setState({units: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async componentDidMount() {
        this.loadUnit();
    }

    render() {
        let {units} = this.state;
        let _this = this;
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>

                    <TextBox className={"txt1"} id={"txt1"} handleChange={(txt) => {
                        console.log(txt.target.value)
                    }}/>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        axios.post('https://inventory-react.herokuapp.com/api/units', {
                            name: document.getElementById("txt1").value
                        })
                            .then(function (response) {
                                document.getElementById("txt1").value = "";
                                console.log(response);
                                _this.loadUnit();
                            })
                            .catch(function (error) {
                                document.getElementById("txt1").value = "";
                                console.log(error);
                            });
                    }}>Add Unit</button>
                </div>
                <div style={{
                    height: '200px',
                    overflowY: 'scroll',
                    width: '50%',
                    backgroundColor: 'antiquewhite',
                    display: 'inline-block',
                    marginTop:'20px'
                }}>
                {
                    units !== null ?
                        units.map((unit, index) => {
                            return <div key={index}><h3>{unit._id}:{unit.name}
                            <button data-unitid={unit._id} onClick={(e)=>{
                                e.preventDefault()
                                const unit_id = e.target.attributes.getNamedItem('data-unitid').value
                                axios.delete('https://inventory-react.herokuapp.com/api/units/' +unit_id).then(function(response){
                                    console.log(response);
                                    _this.loadUnit();
                                });
                            }} style={{color:'red'}}>&#10006;</button>
                            </h3>
                            </div>
                        })
                    : <h1>Loading...</h1>
                }
                </div>
            </div>
        );
    }
}

export default App;
