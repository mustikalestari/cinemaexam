import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {APIURL} from '../suport/apiUrl'
import swal from 'sweetalert2'
import {gantiPassword} from './../redux/actions'
import Axios from 'axios'
import Swal from 'sweetalert2';

class  ChangePass extends Component {
    state = {
        backtohome:false
      }
    onClickPass=()=>{
        var newpass=this.refs.newpass.value
        var oldpass=this.refs.oldpass.value
        var password=this.refs.confirmpass.value
        
        var updatepass={
            username: this.props.username,
            password,
            role:this.props.role
        }
        if(oldpass===''||newpass===''||password===''){
            Swal.fire({
                icon:'error',
                title:'failed',
                text:'you havent enter the password'
            })
        }else if(oldpass==newpass){
            Swal.fire({
                icon:'warning',
                title:'warning',
                text:'inpun any password that is not your current password'
            })
        }else if(oldpass!==this.props.passuser){
            Swal.fire({
                icon:'error',
                title:'error',
                text:'your password doesnt match'
            })
        }else{
            Axios.patch(`${APIURL}users/${this.props.userId}`,updatepass)
            .then(res=>{
                Swal.fire({
                    title:'kamu yakin?',
                    icon:'question',
                    showCancelButton: true,
                    cancelButtonText:'No',
                    confirmButtonText:'sure'
                }).then(result=>{
                    if(result.value){
                        this.props.gantiPassword(res.data)
                        this.setState({backtohome:true})
                        Swal.fire({
                            icon:'success',
                            title:'succesfully changed',
                            showConfirmButton:false,
                            timer:1500
                        })
                    }
                })
            })
            .catch(err=>{   
                console.log(err)
            })
        }
    }
    render() {
        
        if(this.state.backtohome||this.props.loginuser==false){
            return<Redirect to='/'/>
        }
        return (
            <div>
                <center className='center'>
                    <h3 style={{color:'white'}} className='mt-5'>Change Password</h3>
                    <div className="form-group mt-3" style={{width:'20%'}}>
                        <input type="text" ref='registerusername' className="form-control mt-4" disabled placeholder={this.props.username} />
                    </div>

                    <div className="form-group" style={{width:'20%'}}>
                        <input type="password" ref='oldpass' className="form-control" placeholder='Enter current password' />
                        {/* <i><FaEyeSlash/></i> */}
                    </div>

                    <div className="form-group" style={{width:'20%'}}>
                        <input type="password" ref='newpass' className="form-control" placeholder='Enter new password' />
                        {/* <i><FaEyeSlash/></i> */}
                    </div>

                    <div className="form-group" style={{width:'20%'}}>
                        <input type="password" ref='confirmpass' className="form-control" placeholder="Confirm new password" />
                    </div>

                    <div className="form-group" style={{width:'50%'}}>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <button className='btn btn-primary' onClick={this.onClickPass}>Change My Pass, duh</button>
                    </div>
                </center>
            </div>
        );
    }
}
const MapStateToProps=state=>{
    return{
        username:state.Auth.username,
        loginuser:state.Auth.login,
        userId:state.Auth.id,
        passuser:state.Auth.password,
        role:state.Auth.role
    }
}

 
export default connect(MapStateToProps, {gantiPassword})(ChangePass)