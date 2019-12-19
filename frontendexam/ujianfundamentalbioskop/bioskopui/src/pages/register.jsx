  
import React, { Component } from 'react';
import Axios from 'axios';
import { APIURL } from '../suport/apiUrl';
import { Link } from 'react-router-dom';


class Register extends Component {
    state = {
        daftuser:[],
        sama:false,
        berhasil:false,
        peringatan:''
    }

    onRegister=()=>{
        var userReg=this.refs.username.value
        var passReg=this.refs.password.value
        var data={
            username:userReg,
            password:passReg,
            role:'user'
        }
        
        Axios.get(`${APIURL}users?username=${userReg}`)
        .then(res=>{
            if(res.data.length){
                this.setState({peringatan:'username is already exist,try other username :(',sama:true,berhasil:false})
            }else(
                Axios.post(`${APIURL}users`,data)
                .then(res=>{
                    this.setState({peringatan:'succesfully registered :)',berhasil:true,sama:true})
                }).catch(err=>{
                    console.log(err)
                })
            )
        }).catch(err=>{
            console.log(err)
        })
    }


    render() { 
        return (
            <div className='bg-signin'>
               <div className="mt-3 d-flex justify-content-center">
                    <div className='kotak-signin mt-5 pt-3 pb-3 px-4'>
                        <h2>Register</h2>
                        <div className='mt-4 mb-4' style={{borderBottom:'1px solid black'}}>
                            <input type='text' className='from-control' style={{border:'transparent', width:'100%'}} ref='username' placeholder='your new username'/>
                        </div>
                        <div className=' mb-2' style={{borderBottom:'1px solid black'}}>
                            <input type='text' className='from-control' style={{border:'transparent', width:'100%'}}  ref='password' placeholder='your password' />
                        </div>
                        {
                            this.state.sama?
                            <div className="alert alert-danger mt-2">
                                {this.state.peringatan} <span onClick={()=>this.setState({peringatan:'',sama:false})} className='float-right font-weight-bold'><div>x</div></span>
                            </div>
                        :
                            null
                        }
                        <button className='btn btn-primary mt-3'onClick={this.onRegister}>Register it</button>
                        {this.state.berhasil?
                            <p className='mt-3'>lets <Link to={'/login'}>Log-in</Link></p>
                        :
                            null
                        }
                        {/* </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Register;