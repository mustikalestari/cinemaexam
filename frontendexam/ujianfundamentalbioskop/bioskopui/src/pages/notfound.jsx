import React, { Component } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Spinner
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  LoginSuccessAction,
  Loginthunk,
  Login_error
} from "./../redux/actions";

class Logout extends Component {
  state = {
    modalkonfirmasiLogout: true,
    logout: false,
    modalbacktohome: false
  };

  componentDidMount() {
    // console.log("Status Login:" + this.props.Auth.login);
    // console.log("Username:" + this.props.Auth.username);
    // console.log("Password:" + this.props.Auth.password);
  }

  render() {
    if (this.state.logout && this.state.modalbacktohome) {
      return (
        <Modal isOpen={this.state.modalbacktohome}>
          <ModalHeader>You have been logged out!</ModalHeader>
          <ModalFooter>
            <a href={"/"}>
              <Button color="warning">Oke</Button>
            </a>
          </ModalFooter>
        </Modal>
      );
    }

    if (this.state.logout) {
      localStorage.clear();
      this.setState({ modalbacktohome: true });
      this.props.Loginthunk("","");
    }

    return (
      <div>
        <Modal isOpen={true} toggle={false}>
          <ModalHeader>Are you sure that want to logout from this website?</ModalHeader>
          <ModalFooter>
            <Link to={"/"}>
              <Button color="warning">Back to Home</Button>
            </Link>
            <Button
              color="danger"
              onClick={() => {
                this.setState({ logout: true });
              }}
            >
              Logout
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    Auth: state.Auth
  };
};

export default connect(MapstateToprops, {
  LoginSuccessAction,
  Loginthunk,
  Login_error
})(Logout);
