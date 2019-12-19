import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../support/apiUrl";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ViewDetails extends Component {
  state = {
    datafilm: [],
    notloginyet: false,
    kelogin: false,
    belitiketok: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    Axios.get(`${APIURL}movies/${id}`)
      .then(res => {
        this.setState({ datafilm: [res.data] });
      })
      .catch(err => console.log(err));
  }

  onBeliTiketClick = () => {
    if (this.props.AuthLog) {
      this.setState({ belitiketok: true });
    } else {
      this.setState({ notloginyet: true });
    }
  };

  renderMovies = () => {
    const { datafilm } = this.state;
    return datafilm.map((val, index) => {
      return (
        <div className="container">
          <div className="movie-details">
            <div className="movie-image">
              <img alt={val.title} src={val.image} style={{height:'600px'}} />
            </div>

            <div className="movie-description">
              <div className="movie-title">
                <h5>Title:</h5>
                <p>{val.title}</p>
              </div>

              <div className="movie-duration">
                <h5>Duration:</h5>
                <p>{val.durasi}</p>
              </div>

              <div className="movie-cast">
                <h5>Cast:</h5>
                <p>{val.cast}</p>
              </div>

              <div className="movie-director">
                <h5>Director:</h5>
                <p>{val.sutradara}</p>
              </div>

              <div>
                <h5>Produksi:</h5>
                <p>{val.produksi}</p>
              </div>
            </div>
          </div>

          <div className="movie-sinopsis">
            <h5>Synopsis</h5>
            <p>{val.sinopsis}</p>
          </div>

          <div className="movie-trailers">
            <h5>Trailers</h5>
            <div className="videos">
              <iframe
                title="Trailers 1"
                className="trailers"
                width="560"
                height="315"
                src={val.trailers}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
          <Modal
            isOpen={this.state.notloginyet}
            centered
            toggle={() => this.setState({ notloginyet: false })}
          >
            <ModalBody>
              Maaf Anda belum login. Silahkan Login terlebih dahulu.
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-info"
                onClick={() => this.setState({ kelogin: true })}
              >
                Ok
              </button>
            </ModalFooter>
          </Modal>
          <center>
            <div className="mt-5">
              <button
                className="btn btn-warning"
                onClick={this.onBeliTiketClick}
              >
                Book Now
              </button>
            </div>
          </center>
        </div>
      );
    });
  };

  render() {
    if (this.state.kelogin) {
      return <Redirect to={"/login"} />;
    }
    if (this.state.belitiketok) {
      return (
        <Redirect to={{ pathname: "/belitiket", state: this.state.datafilm }} />
      );
    }
    return (
      <div>
        <div className="container mt-4">
          <Link to="/" className="btn btn-primary ml-3" style={{color:"#beebe9"}}>
            Back To Home
          </Link>
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    AuthLog: state.Auth.login
  };
};

export default connect(MapStateToProps)(ViewDetails);
