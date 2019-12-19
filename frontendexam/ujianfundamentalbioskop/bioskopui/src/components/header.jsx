import React, { Component } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";

export class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    // console.log(this.props.AuthLog);
    console.log(this.props.Tambcart,'tambahcart')
    return (
      <div>
        <Navbar expand="md" className="navbar">
          <NavLink
            href="/"
            style={{ fontWeight: "2000px", fontSize: 21, color: "#465881" }}
            className="navbar-brand"
          >
            {/* <img alt="Logo" src={Logo} /> */}
            CATHAY CINEPLEXES &nbsp;
            <MdEventSeat style={{ fontSize: 23 }} />
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="home" href="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                
                {/* {this.props.role==="admin" ?( */}
                  {this.props.namauser === '' ? null : this.props.role === 'admin' ? (
                  <div className="mt-2 mr-3 ml-3 user d-flex">
                    <NavLink href={"manageadmin"}>Manage Admin</NavLink>
                    <NavLink href={"managestudio"}>Manage Studio</NavLink>
                  </div>
                ):null}
              </NavItem>
              <NavItem>
                <NavLink href="/upcoming-film" className="nav-link">
                  Upcoming Movies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/cart" className="nav-link">
                  <FaShoppingCart style={{ fontSize: 21 }} />
                  &nbsp;
                  Cart 
                </NavLink>
              </NavItem>
              {this.props.namauser === "" ? (
                <Link to="/login"   style={{ color: "white" }} className="nav-link btn btn-secondary">
                  Login/SignUp
                </Link>
              ) : null}

              {this.props.namauser === "" ? null : (
                <Link to="" className="nav-link">
                  <span className='ml-4'>{this.props.Tambcart}</span><FaUserAlt style={{ fontSize: 17 }} />
                  &nbsp;
                  {this.props.namauser}
                </Link>
              )}
              {this.props.namauser===""?null:(
                <Link
                to="/changepass"
                className="nav-link"
                >
                Change Password
                </Link>
              )}
              {this.props.namauser ==="" ? null:(
                <Link to="/history"
                className="nav-link"
                
                >
                History
                </Link>
              )}
              {this.props.namauser === "" ? null : (
                <Link
                  to="/logout"
                  style={{ color: "white" }}
                  className="nav-link btn btn-secondary"
                >
                  Logout
                </Link>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    AuthLog: state.Auth.login,
    namauser: state.Auth.username,
    role:state.Auth.role,
    Tambcart:state.Tambahcart
  };
};

export default connect(MapStateToProps)(Header);