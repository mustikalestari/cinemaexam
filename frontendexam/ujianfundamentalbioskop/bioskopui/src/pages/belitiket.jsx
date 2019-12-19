

import React, { Component } from "react";

import { connect } from "react-redux";

import Axios from "axios";

import { APIURL } from "../suport/apiUrl";

import { Redirect } from "react-router-dom";

import Numeral from "numeral";

import { Modal, ModalBody, ModalFooter } from "reactstrap";



class Belitiket extends Component {

  state = {

    datamovie: {},

    seats: 260,

    baris: 0,

    booked: [],

    loading: true,

    jam: 12,

    pilihan: [],

    openmodalcart: false,

    redirecthome: false

  };



  componentDidMount() {

    this.onJamchange();

  }



  onJamchange = () => {

    var studioId = this.props.location.state[0].studioId;

    var movieId = this.props.location.state[0].id;

    Axios.get(`${APIURL}studios/${studioId}`)

      .then(res1 => {

        Axios.get(`${APIURL}orders?movieId=${movieId}&jadwal=${this.state.jam}`)

          .then(res2 => {

            var arrAxios = [];

            res2.data.forEach(val => {

              arrAxios.push(

                Axios.get(`${APIURL}ordersDetails?orderId=${val.id}`)

              );

            });

            var arrAxios2 = [];

            Axios.all(arrAxios)

              .then(res3 => {

                res3.forEach(val => {

                  arrAxios2.push(...val.data);

                });

                this.setState({

                  datamovie: this.props.location.state[0],

                  seats: res1.data.jumlahKursi,

                  baris: res1.data.jumlahKursi / 20,

                  booked: arrAxios2,

                  loading: false

                });

              })

              .catch(err => {

                console.log(err);

              });

          })

          .catch(err2 => {

            console.log(err2);

          });

      })

      .catch(err1 => {

        console.log(err1);

      });

  };



  onButtonjamclick = val => {

    this.setState({ jam: val, pilihan: [] });

    this.onJamchange();

  };



  onPilihSeatClick = (row, seat) => {

    var pilihan = this.state.pilihan;

    pilihan.push({ row: row, seat }); 

    this.setState({ pilihan: pilihan });

  };



  onOrderClick = () => {

    var userId = this.props.Userid;

    var movieId = this.state.datamovie.id;

    var pilihan = this.state.pilihan;

    var jadwal = this.state.jam;

    var totalharga = this.state.pilihan.length * 30000;

    var bayar = false;

    var dataorders = {

      userId,

      movieId,

      totalharga,

      jadwal,

      bayar

    };

    console.log(dataorders)

    Axios.post(`${APIURL}orders`, dataorders)

      .then(res => {

        console.log(res.data);

        var dataordersdetail = [];

        pilihan.forEach(val => {

          dataordersdetail.push({

            orderId: res.data.id,

            seat: val.seat,

            row: val.row

          });

        });

        console.log(dataordersdetail);

        var dataordersdetail2 = [];

        dataordersdetail.forEach(val => {

          dataordersdetail2.push(Axios.post(`${APIURL}ordersDetails`, val));

        });

        Axios.all(dataordersdetail2)

          .then(res1 => {

            console.log(res1);

            this.setState({ openmodalcart: true });

          })

          .catch(err => {

            console.log(err);

          });

      })

      .catch(err => {

        console.log(err);

      });

  };



  renderHargadanQuantity = () => {

    var jumlahtiket = this.state.pilihan.length;

    var harga = jumlahtiket * 30000;

    return (

      <div className="mt-3">

        {jumlahtiket} tiket x {"Rp." + Numeral(30000).format("Rp,0.00")} ={" "}

        {"Rp." + Numeral(harga).format("Rp,0.00")}

      </div>

    );

  };



  onCancelseatClick = (row, seat) => {

    var pilihan = this.state.pilihan;

    var rows = row;

    console.log(rows);

    var seats = seat;

    console.log(seats);

    var arr = [];

    for (var i = 0; i < pilihan.length; i++) {

      console.log(pilihan[i]);

      if (pilihan[i].row !== rows || pilihan[i].seat !== seats) {

        arr.push(pilihan[i]);

      } else {

      }

    }

    this.setState({ pilihan: arr });

  };



  renderSeat = () => {

    var arr = [];

    for (let i = 0; i < this.state.baris; i++) {

      arr.push([]);

      for (let j = 0; j < this.state.seats / this.state.baris; j++) {

        arr[i].push(1);

      }

    }

    for (let j = 0; j < this.state.booked.length; j++) {

      arr[this.state.booked[j].row][this.state.booked[j].seat] = 3;

    }

    for (let a = 0; a < this.state.pilihan.length; a++) {

      arr[this.state.pilihan[a].row][this.state.pilihan[a].seat] = 2;

    }

    

    var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

    var jsx = arr.map((val, index) => {

      return (

        <div key={index}>

          {val.map((val1, i) => {

            if (val1 === 3) {

              return (

                <button

                  key={i}

                  disabled

                  className="rounded btn-disble mr-2 mt-2 bg-danger text-center"

                 

                >

                  {alphabet[index] + (i + 1)}

                </button>

              );

            } else if (val1 === 2) {

              return (

                <button

                  key={i}

                  onClick={() => this.onCancelseatClick(index, i)}

                  className="rounded  btn-order mr-2 mt-2 btn-pilih text-center"

                >

                  {alphabet[index] + (i + 1)}

                </button>

              );

            }

            return (

              <button

                key={i}

                onClick={() => this.onPilihSeatClick(index, i)}

                className="rounded btn-order mr-2 mt-2 text-center"

              >

                {alphabet[index] + (i + 1)}

              </button>

            );

          })}

        </div>

      );

    });

    return jsx;

  };



  renderButton = () => {

    return this.state.datamovie.jadwal.map((val, index) => {

      if (this.state.jam === val) {

        return (

          <button className="mx-2 btn btn-outline-primary mt-3">

            {val}.00

          </button>

        );

      }

      return (

        <button

          className="mx-2 btn btn-outline-primary mt-3"

          onClick={() => this.onButtonjamclick(val)}

        >

          {val}.00

        </button>

      );

    });

  };



  btnOk=()=>{

    window.location.reload()

  }

  render() {

    if (this.props.location.state && this.props.AuthLog) {

      if (this.state.redirecthome) {

        return <Redirect to={"/"} />;

      }

      return (

        <div>

          <Modal isOpen={this.state.openmodalcart}>

            <ModalBody>Your item has succesfully added </ModalBody>

            <ModalFooter>

              <button

                onClick={this.btnOk}

                className="btn btn-info"

              >

                Ok

              </button>

            </ModalFooter>

          </Modal>



          <center className="mt-1">

            {this.state.loading ? null : this.renderButton()}

            <div>

              {this.state.pilihan.length ? (

                <button

                  className="btn btn-primary mt-3"

                  onClick={this.onOrderClick}

                >

                  Order

                </button>

              ) : null}

            </div>

            {this.state.pilihan.length ? this.renderHargadanQuantity() : null}

          </center>

          <hr></hr>

          <div className="d-flex justify-content-center mt-4">

            <div>{this.state.loading ? null : this.renderSeat()}</div>

          </div>

        </div>

      );

    }

    return <div>404 not found</div>;

  }

}



const MapStateToProps = state => {

  return {

    AuthLog: state.Auth.login,

    Userid: state.Auth.id

  };

};



export default connect(MapStateToProps)(Belitiket);