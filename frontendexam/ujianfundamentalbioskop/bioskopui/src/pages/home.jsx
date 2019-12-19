  
import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {Carousel} from "react-bootstrap"
const url = "http://localhost:2000/";

class Home extends Component {
  state = {
    dataMovies: []
  };

  componentDidMount() {
    Axios.get(`${url}movies`)
      .then(res => {
        this.setState({ dataMovies: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderMovies = () => {
    return this.state.dataMovies.map((val, index) => {
      return (
        <div className="col-md-3 py-5 pr-3 pl-1 ">
          <div className="card kartu" style={{ width: "100%" }}>
            <div className="gambaar1">
              <Link
                className="card-textt"
                to={`/view-details/${val.id}`}
                className="btn btn-sm btn-outline-info"
              >
                <img
                  style={{height:"500px"}}
                  src={val.image}
                  className="card-img-top kartu gambar"
                  alt="..."
                />
              </Link>
            </div>
            <div className="card-body">
              <h5 className="card-title">{val.title}</h5>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div><Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdna.artstation.com/p/assets/images/images/002/138/496/large/fang-rui-.jpg?1457743606"
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://miro.medium.com/max/2560/1*eF8k4mMP-Djwv4oKh6MzKg.jpeg"
          alt="Third slide"
        />
    
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static.rogerebert.com/uploads/review/primary_image/reviews/mood-indigo-2014/hero_MoodIndigo-2014-1.jpg"
          alt="Third slide"
        />
    
        
      </Carousel.Item>
    </Carousel>

      
      <div className="mt-10 mx-5">
        <div
          className="row py-5"
          style={{ paddingLeft: "10%", paddingRight: "10%" }}
        >
          {this.renderMovies()}
        </div>
        
      </div>
      </div>
    );
  }
}

export default Home;