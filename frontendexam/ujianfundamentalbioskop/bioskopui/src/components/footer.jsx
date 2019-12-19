import React, { Component } from 'react';
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
    FaEnvelope,
    FaLinkedin
} from 'react-icons/fa';
import { NavLink } from 'reactstrap';

class Footer extends Component {
	render() {
		return (
			<div className='footer'>
				<div className='footer-icon'>
					<a href='/' className='facebook'>
						<FaFacebookF />
					</a>
					<a href='https://www.instagram.com/mustikaclestari/' className='instagram'>
						<FaInstagram />
					</a>
					<a href='/' className='twitter'>
						<FaTwitter />
					</a>
					<a href='/' className='email'>
						<FaEnvelope />
					</a>
                    <a href='/' className='linked'>
						<FaLinkedin />
					</a>
				</div>
				<div className='footer-text'>
					<p>&copy; mustikaclestari/ class project = ticketing for any movie. </p>
				</div>
			</div>
		);
	}
}

export default Footer;