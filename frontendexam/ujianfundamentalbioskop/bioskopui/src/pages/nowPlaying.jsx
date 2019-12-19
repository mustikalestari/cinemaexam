import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../support/apiUrl";
import { Link } from "react-router-dom";
class NowPlaying extends Component {
  state = {
    dataFilm: []
  };

  // Get data film
  componentDidMount() {
    Axios.get(`${APIURL}movies`)
      .then(res => {
        this.setState({ dataFilm: res.data });
      })
      .catch(err => console.log(err));
  }

  // Display data film - Now Playing
  renderNowPlaying = () => {
    const { dataFilm } = this.state;
    return dataFilm.map((val, index) => {
      if (val.status === "Playing Now") {
        return (
          <div className="col-md-4" key={index}>
            <div className="card">
              <img alt={val.title} src={val.image} />
              <div className="card-title">
                <p className="m-2">{val.title}</p>
              </div>
              <div className="card-text">
                <a href="/" className="btn btn-sm btn-outline-primary">
                  Book Now
                </a>
                <Link
                  to={`/view-details/${val.id}`}
                  className="btn btn-sm btn-outline-warning"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <div className="back-home">
          <a href="/" className="btn btn-secondary">
            Back To Home
          </a>
        </div>

    
    
        <div className="section-1">
          <img
            alt="section-1"
            src="https://media.21cineplex.com/webcontent/gallery/pictures/157285280844221_287x421.jpg"
          />
          <img
            className="sectionn-1"
            alt="section-1"
            src="https://media.21cineplex.com/webcontent/gallery/pictures/157380448937451_287x421.jpg"
          />

          <img
            className="sectionnn-1"
            alt="section-1"
            src="https://media.21cineplex.com/webcontent/gallery/pictures/157250534676979_287x421.jpg"
          />
        </div>


        <div className="section-2">
          <div className="container">
            <div className="label-text">
              <Link className="btn btn-sm btn-outline-warning">Book Now</Link>
              &nbsp; &nbsp; &nbsp;
            </div>
            <div className="labell-text">
              <Link className="btn btn-sm btn-outline-warning">Book Now</Link>
              &nbsp; &nbsp; &nbsp;
            </div>
            <div className="labelll-text">
              <Link className="btn btn-sm btn-outline-warning">Book Now</Link>
              &nbsp; &nbsp; &nbsp;
            </div>
            <div className="row">{this.renderNowPlaying()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
