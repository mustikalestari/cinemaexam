import React, { Component } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoginSuccessAction,Tambahcart } from "./redux/actions";
import Axios from "axios";
import { APIURL } from "./suport/apiUrl";

// import SimpleSlider from "./components/carousel";
import Header from "./components/header";
import Footer from "../src/components/footer";
import Home from "./pages/home";
import ManageAdmin from "./pages/manageadmin";
import NowPlaying from "./pages/nowPlaying";
import Cart from "./pages/cart";
import ViewDetails from "./pages/viewDetails";
import Belitiket from "./pages/belitiket";
import Login from "./pages/login";
import Register from "./pages/register";
import notfound from './pages/notfound'
import Logout from "./pages/logout";
import ChangePass from "./pages/changepass";
import Managestudio from "./pages/managestudio";

class App extends Component {
  state = {
    loading: true,
    datacart:[]
  };

  componentDidMount() {
    var id = localStorage.getItem("tari");
    console.log(id,'id')
    console.log(this.props.userId)
    Axios.get(`${APIURL}users/${id}`)
      .then(res => {
        console.log(res,'res')
        this.props.LoginSuccessAction(res.data);
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=false`)
          .then((res1)=>{
            console.log(res1,'res1')
              var datacart=res1.data
              console.log('datacart',datacart)
              console.log('resdata',res1.data)
              this.setState({
                datacart:datacart,
                loading:false
              })
      }).catch(err => {
        console.log(err);
      })
    }).catch((err)=>{
      console.log(err)
    }).finally(() => {
        // console.log('asd')
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }
    console.log(this.state.datacart.length,'length')
    this.props.Tambahcart(this.state.datacart.length)
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/manageadmin"} component={ManageAdmin} />
          <Route exact path={"/now-playing"} component={NowPlaying} />
          <Route exact path={"/cart"} component={Cart} />
          <Route exact path={"/view-details/:id"} component={ViewDetails} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/belitiket"} component={Belitiket} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/logout"} component={Logout} />
          <Route exact path={"/changepass"} exact component={ChangePass}/>
          <Route path={'/managestudio'} exact component={Managestudio}/>
          <Route path={'/history'} exact component={History} />
          <Route path='/*' component={notfound} />
          
        </Switch>
        <Footer />
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    AuthLog: state.Auth.login,
    Tambcart:state.tambahcart,
    userId:state.Auth.id,
  };
};

export default connect(MapStateToProps, { LoginSuccessAction,Tambahcart })(App);
