
import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Table, ModalHeader, ModalBody,Modal,ModalFooter } from "reactstrap";
import { APIURL } from "./../suport/apiUrl";
import {Tambahcart} from './../redux/actions'

class Cart extends Component {
  state = {
    datacart: null,
    modaldetail:false,
    indexdetail:0,
    modalcheckout:false,
    hargacheckout:0
  };


  componentDidMount(){
    console.log(this.props)
    Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
    .then((res)=>{
        var datacart=res.data
        var qtyarr=[]
        console.log('resdata',res.data)
        res.data.forEach(element => {
            qtyarr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
            // {this.props.Tambahcart()}
        });
        var qtyarrfinal=[]
        // console.log(qtyarr)
        Axios.all(qtyarr)
        .then((res1)=>{
            res1.forEach((val)=>{
                qtyarrfinal.push(val.data)
            })
            console.log(qtyarrfinal)
            var datafinal=[]
            datacart.forEach((val,index)=>{
                datafinal.push({...val,qty:qtyarrfinal[index]})
            })
            console.log(datafinal)
            this.setState({
                datacart:datafinal
            })
        }).catch((err)=>{

        })
    }).catch((err)=>{
        console.log(err)
    })
 }

 
totalcheckout=()=>{
  var pesanan=this.state.datacart
  for(var i=0;i<pesanan.length;i++){
      this.state.hargacheckout+=pesanan[i].totalHarga
  }
  return(this.state.hargacheckout)
}

bayarcheckout=()=>{
  var pesanan=this.state.datacart
  for(var i=0;i<pesanan.length;i++){
      var data={
          userId:pesanan[i].userId,
          movieId:pesanan[i].movieId,
          jadwal:pesanan[i].jadwal,
          totalHarga:pesanan[i].totalHarga,
          bayar:true,
          id:pesanan[i].id
      }
      var id=data.id
      // console.log(data)
      Axios.put(`${APIURL}orders/${id}`,data)
      .then(res=>{
          this.componentDidMount()
      }).catch(err=>{
          console.log(err)
      })
  }
  this.setState({modalcheckout:false})
}

  renderCart = () => {
    if (this.state.datacart !== null) {
      // if (this.state.datacart.length === 0) {
      //   return (
      //     <tr>
      //       <td>Cart Kosong</td>
      //     </tr>
      //   );
      // }
      return this.state.datacart.map((val, index) => {
        console.log(val)
        return (
          <tr key={index}>
            <td style={{ width: 100 }}>{index + 1}</td>
            <td style={{ width: 300 }}>{val.movie.title}</td>
            <td style={{ width: 100 }}>{val.jadwal}</td>
            <td style={{ width: 100 }}>{val.qty.length}</td>
            <td style={{width:100}}>{val.totalharga}</td>

            <td style={{ width: 100 }}> <button onClick={()=>this.setState({modaldetail:true})}>Details</button>
            </td>
          </tr>
        );
      });
    }
  };
  render() {
    if (this.props.AuthLog) {
      return (
        <div>
          <center>
            <Modal isOpen={this.state.modaldetail} toggle={()=>{this.setState({modaldetail:false})}}>
                    <ModalHeader>
                      Details
                    </ModalHeader>
                    <ModalBody>
                      <Table>
                        <thead>
                          <tr>
                            <th> No. </th>
                            <th> Bangku </th>
                          </tr>
                        </thead>
                        <tbod>
                          {this.state.datacart!==null && this.state.datacart.length!==0 ?
                          this.state.datacart[this.state.indexdetail].qty.map((val,index)=>{
                            return(
                              <tr key={index}>
                          <td>{index+1}</td>
                              <td>{'abcdefghijklmnopqrstu'.toLocaleUpperCase()[val.row]+(val.seat+1)}</td>
                              </tr>
                            )
                          })
                          :
                          null
                        }
                        </tbod>
                      </Table>
                    </ModalBody>
            </Modal>
            <Modal isOpen={this.state.modalcheckout} toggle={()=>this.setState({modalcheckout:false,hargacheckout:0})} size='sm'>
                        {this.state.modalcheckout?
                            <ModalBody>
                                Total harga pesanan anda adalah :
                                Rp. {this.totalcheckout()}
                            </ModalBody>
                        :
                            null
                        }
                        
                        <ModalFooter>
                            <button className='mt-2 mb-2 btn btn-primary' onClick={this.checkout}>Bayar bayar!!</button>
                        </ModalFooter>
                    </Modal>
            <Table style={{ width: 600 }}>
              <thead>
                <tr>
                  <th style={{ width: 100 }}>No.</th>
                  <th style={{ width: 300 }}>Title</th>
                  <th style={{ width: 100 }}>Jadwal</th>
                  <th style={{ width: 100 }}>jumlah</th>
                  <th style={{width:100}}>Harga</th>
                  <th style={{ width: 100 }}>Detail</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
              <tfoot>
                <button className='btn btn-warning'>checkout</button>
              </tfoot>
            </Table>
          </center>
        </div>
      );
    
    }
    return <div>404 not found</div>;
  }
}

const MapstateToprops = state => {
  return {
    AuthLog: state.Auth.login,
    UserId: state.Auth.id,
    Tambcart:state.tambcart
  };
};
export default connect(MapstateToprops,{Tambahcart})(Cart);