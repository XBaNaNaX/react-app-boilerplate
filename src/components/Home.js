import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import Modal from 'react-modal';

import DropDownList from './Controls/dropdown';
import TextBox from './Controls/TextBox';

import '../components/home.scss';
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const liff = window.liff;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactMaster: null,
            contacts: null,
            groups: null,
            roles: null,
            selected: null,
            selectedGroup: null,
            modalIsOpen: false,
            contactForm: null,
            cId: null,
            cName: null,
            cNickname: null,
            cOffice: null,
            cRole: null,
            cGroup: null,
            cMobile: null,
            displayName : '',
            userId : '',
            pictureUrl : '',
            statusMessage : ''
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.initialize = this.initialize.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
        document.getElementsByTagName('body')[0].style = 'overflow: hidden'; 
    }
    
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
      this.setState({modalIsOpen: false, contactForm: null});
      document.getElementsByTagName('body')[0].style = 'overflow: auto'; 
    }
    
    componentUnmount(event) {
      event.preventDefault();
      liff.sendMessages([{
          type: 'text',
          text: "Bye Bye!!!"
      }]).then(() => {
          liff.closeWindow();
      });
    }

    async loadContact() {
        let _this = this;
        let api_url = process.env.REACT_APP_API_URL;
        await axios.get(api_url+'/contacts')
            .then(function (response) {
                _this.setState({contacts: response.data,contactMaster:response.data});
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

    async loadRoles() {
        let _this = this;
        let api_url = process.env.REACT_APP_API_URL;
        await axios.get(api_url+'/roles')
            .then(function (response) {
                let roleList = [];
                roleList.push(response.data.map((role, index)=>{
                    let objRole = {};
                    objRole.label = role.title;
                    objRole.value = role.title;
                    return objRole;
                }));
                
                
                _this.setState({roles: roleList});
            })
            .catch(function (error) {
                console.log(error);
        });
    }
    async loadGroups() {
        let _this = this;
        let api_url = process.env.REACT_APP_API_URL;
        await axios.get(api_url+'/groups')
            .then(function (response) {
                let groupList = [];
                groupList.push(response.data.map((group, index)=>{
                    let objRole = {};
                    objRole.label = group.title;
                    objRole.value = group.title;
                    return objRole;
                }));
                
                
                _this.setState({groups: groupList});
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    onGroupChange = (_this) => {
        let {contacts,contactMaster,selectedGroup} = this.state;
        selectedGroup = _this.value;
        contacts = contactMaster.filter((contact,index)=>{
            return contact.group === _this.value
        });

        this.setState({contacts:contacts,selectedGroup: selectedGroup});
    } 

    async componentDidMount() {
        this.loadContact();
        this.loadRoles();
        this.loadGroups();
        this.initialize();
    }

    initialize() {
        liff.init(async (data) => {
            let profile = await liff.getProfile();
            this.setState({
                displayName: profile.displayName,
                userId: profile.userId,
                pictureUrl: profile.pictureUrl,
                statusMessage: profile.statusMessage
            });
        });
    }
    
    onRoleChange = (_this) => {
        let {contacts,contactMaster,selected} = this.state;
        selected = _this.value;
        contacts = contactMaster.filter((contact,index)=>{
            return contact.role === _this.value
        });

        this.setState({contacts:contacts,selected: selected});
    }

    updateContact() {
        let _this = this;
        let api_url = process.env.REACT_APP_API_URL;
        let data = {
            contact_id: document.getElementById("contact-id").value,
            name: document.getElementById("contact-name").value,
            nickname: document.getElementById("contact-nickname").value,
            office: document.getElementById("contact-office").value,
            mobile: document.getElementById("contact-mobile").value
        }
        axios.post(api_url + '/contacts/update', {
                data: data
            })
            .then(function (response) {
                console.log(response);
                _this.loadContact();
                alert(response.data.message);
                _this.closeModal();
            })
            .catch(function (error) {
                console.log(error);
                _this.closeModal();
            });
    }

    lineNavBar() {
        const {displayName,pictureUrl,statusMessage} = this.state;

        return ( <div className={"row"} style={{margin: '0'}}>
        <div className={"col-lg-12 col-md-12 col-sm-12 profile-wrapper"}>
            <div className={"profile-img"} style={{backgroundImage: pictureUrl ? `url("`+pictureUrl+`")` :`url("https://via.placeholder.com/150")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={"profile-name"}>
                <label className={"d-block profile-name-label display-name"}>{displayName}</label>
                <label className={"d-block profile-name-label status-messages"}>{statusMessage}</label>
            </div>
        </div>
    </div>);
    }

    render() {
        let {contacts,groups,roles,selected,selectedGroup, contactForm,cName,cNickname,cOffice,cMobile,cRole,cGroup,cId} = this.state;
        let _this = this;
        let props = this.props;
        const columns = [{
                Header: 'Name',
                accessor: 'name', // String-based value accessors!
                minWidth: 200
            },{
                Header: 'Nickname',
                accessor: 'nickname', // String-based value accessors!
                minWidth: 100
            },{
                Header: 'Email',
                accessor: 'email',
                Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
                minWidth: 200
            },{
                Header: 'Role',
                accessor: 'role' // String-based value accessors!
            },{
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
            },
            {
                Header: 'ID',
                accessor: '_id',
                maxWidth: 0,
                style:{'display':'none'}
            }]
        const customStyles = {
                content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        return (
            <div id={'app-base'} style={{display:'block',width:'100%'}}>
            
                {_this.lineNavBar()}

                <h1 style={{margin:'auto 20px', paddingTop: '100px'}}>Contacts</h1>
                <div className={'flex-baseline'}>
                    <label className={'label-contact'}>Search : </label>
                    <TextBox className="primary" id="contact-search" handleChange={(e)=>{
                        if (e.target.value.length >= 3) {                        
                            _this.searchContact()
                        } else {
                            _this.loadContact()
                        }
                    }} />
                </div>
                { contacts !== null ? 
                    <div>
                        <div className={'flex-baseline'}>
                            <label className={'label-contact'}>Role : </label><DropDownList onHandleChange={_this.onRoleChange} options={roles[0]} defaultValue={selected}/>
                        </div>
                        <div className={'flex-baseline'}>
                            <label className={'label-contact'}>Group : </label><DropDownList onHandleChange={_this.onGroupChange} options={groups[0]} defaultValue={selectedGroup}/>
                        </div>
                    </div>    
                    : 'Fetching roles...'
                }                

                { contacts !== null ?
                    <ReactTable
                        getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                          return {
                            onClick: (e) => {
                                _this.setState({
                                contactForm: rowInfo,
                                cName: rowInfo.original.name,
                                cNickname: rowInfo.original.nickname,
                                cOffice: rowInfo.original.office,
                                cMobile: rowInfo.original.mobile,
                                cRole: rowInfo.original.role,
                                cGroup: rowInfo.original.group,
                                cId: rowInfo.original._id
                              })
                              console.log(rowInfo);
                              _this.openModal();
                            },
                            style: {
                              background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                              color: rowInfo.index === this.state.selected ? 'white' : 'black'
                            }
                          }
                        }else{
                          return {}
                        }
                      }}
                        data={contacts}
                        columns={columns}
                    />: 'Loading data ...'
                }
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >

                    <h2 ref={subtitle => this.subtitle = subtitle} style={{margin:0}}>Contact form</h2>
                    <button onClick={this.closeModal} className={"close-btn"}>x</button>
                    <div className={"contact-form"}>
                        {
                            contactForm != null ?
                            <div className={""}>
                                <input type={'hidden'} value={cId} id={'contact-id'}/>

                                <div className={'flex-baseline'}>
                                    <label className={'label-contact'}>Name : </label>
                                    <TextBox className="primary" id="contact-name" handleChange={(e)=>{ cName = e.target.value; _this.setState({cName: cName})}} value={cName}/>
                                </div>
                                
                                <div className={'flex-baseline'}>
                                    <label className={'label-contact'}>Nickname : </label>
                                    <TextBox className="primary" id="contact-nickname" handleChange={(e)=>{ cNickname = e.target.value; _this.setState({cNickname: cNickname})}} value={cNickname}/>
                                </div>

                                <div className={'flex-baseline'}>
                                    <label className={'label-contact'}>Office : </label>
                                    <TextBox className="primary" id="contact-office" handleChange={(e)=>{ cOffice = e.target.value; _this.setState({cOffice: cOffice})}} value={cOffice}/>
                                </div>

                                <div className={'flex-baseline'}>
                                    <label className={'label-contact'}>Mobile : </label>
                                    <TextBox className="primary" id="contact-mobile" handleChange={(e)=>{ cMobile = e.target.value; _this.setState({cMobile: cMobile})}} value={cMobile}/>
                                </div>

                                <div className={'flex-baseline'}>
                                    <label className={'label-contact'}>Role : </label><DropDownList onHandleChange={(e)=>{
                                         _this.setState({cRole: e.value})
                                    }} options={roles[0]} defaultValue={{"label":cRole,"value":cRole}}/>
                                </div>
                                
                                <div className={'flex-baseline'}>
                                    <label className={'label-contact'}>Group : </label><DropDownList onHandleChange={(e)=>{
                                         _this.setState({cGroup: e.value})
                                    }} options={groups[0]} defaultValue={{"label":cGroup,"value":cGroup}}/>
                                </div>
                                
                                <hr/>
                                
                                <div className={'modal-footer'}>
                                    <div className={'d-flex-end'}>
                                        <button title={'update contact'} className={'submit-btn'} onClick={(e)=>{
                                            if(window.confirm("Want to update?")){_this.updateContact()}
                                        }}>Update Contact</button>
                                        <button className={'secondary-btn'} onClick={()=>{_this.closeModal()}}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            : 
                            <p style={{color:'red', fontWeight:"bold",fontSize:"2em"}}>Can't get this contact.</p>
                        }
                        <div className={""}>
                            <label htmlFor={'contact-name'} className={'contact-label'}></label>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

Modal.setAppElement('#root');

export default Home;