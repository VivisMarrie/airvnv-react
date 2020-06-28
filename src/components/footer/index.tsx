import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FaLinkedinIn, FaGithub, FaInstagram, FaReact, FaBootstrap, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { GiWhiteCat } from 'react-icons/gi';

function Footer() {
  return (
    <Container fluid className='footer border-top shadow-md'>
        <Row className='align-items-center justify-content-center'>
            <Col sm={4} className='d-flex justify-content-end pr-3'>
                <ul className="list-unstyled">
                    <li><Link to={{pathname: 'https://www.linkedin.com/in/vivribeiro/'}} target="_blank" ><FaLinkedinIn color='#5c32a8' size={30}/>@vivribeiro</Link></li> 
                    <li><Link to={{pathname: 'https://github.com/VivisMarrie/'}} target="_blank"><FaGithub color='#5c32a8' size={30} />@VivisMarrie</Link></li> 
                    <li><Link to={{pathname: 'https://www.instagram.com/vivismarrie/'}} target="_blank"><FaInstagram color='#5c32a8' size={30}/>@vivismarrie</Link></li> 
                </ul> 
            </Col>
            <Col sm={4} className='d-flex text-center pt-3'>
                <ul className="list-unstyled">
                    <li><GiWhiteCat size={80}/></li>
                    <li>Desenvolvido por Viviane para o desafio da Gama Academy - Hiring Coders</li>
                </ul>
            </Col>
            <Col sm={4}>
                <ul className="list-unstyled">
                    <li>Built with:<br/>
                        <FaReact/> <FaBootstrap/>
                    </li>             
                    <li>
                        <Link to={{pathname: 'https://www.linkedin.com/in/vivribeiro/'}} target="_blank" ><FaCode color='#5c32a8' size={35}/></Link>
                    </li> 
            </ul>
            </Col>
        </Row>
    </Container>
  );
}

export default Footer;


