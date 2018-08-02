import React, {Component} from 'react';

import './signup.scss';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'SignUp'}>
                <div className="sign-up-wrapper">
                    <div className="student-block">
                        <div className="student-content">
                            <div className="student-avatar">

                            </div>
                            <div className="student-text">
                                I'm a Student
                            </div>
                            <div className="btn-wrapper">
                                <button className="btn-sign-up-student">
                                    <span> Create an account </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="tutor-block">
                        <div className="tutor-content">
                            <div className="tutor-avatar">

                            </div>
                            <div className="tutor-text">
                                I'm a Tutor
                            </div>
                            <div className="btn-wrapper">
                                <button className="btn-sign-up-tutor" onClick={() => {console.log("you clicked ")}}>
                                    <span> Create an account </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}