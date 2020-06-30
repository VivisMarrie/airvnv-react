import React from 'react';

import Container from 'react-bootstrap/Container';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import foto from "./../../images/eu.jpg"
import Image from 'react-bootstrap/Image';

const About = () => {
    return(
        <>      
            {/* <Header currentPage="about" qtdDiarias={undefined} qtdHospedes={undefined} /> */}
            
            <Container className='mt-2'>
                <br />
                <div className="row justify-content-center align-items-center pt-10">
                    <div className="col-sm-12 col-lg-5 text-right">
                        <Image fluid src={foto} roundedCircle />
                    </div>
                    <div className="col-sm-12 col-lg-7 justify-content-center ml-auto">
                        <h1>Sobre mim:</h1>
                        Desenvolvedora full stack com ênfase no back-end. Maior experiência com Java e Python e seus frameworks.
                        <br />
                        Esse projeto é uma nova versão do <Link to={{pathname: 'https://airvnv.netlify.app'}}>https://airvnv.netlify.app/</Link>, experimentando com React e Typescript.
                        <br /><br />
                        <ul className="list-unstyled">
                            <li><Link to={{pathname: 'https://www.linkedin.com/in/vivribeiro/'}} target="_blank" style={{ color: '#000000' }}>
                                <FaLinkedinIn color='#5c32a8' size={30}/>@vivribeiro</Link></li> 
                            <li><Link to={{pathname: 'https://github.com/VivisMarrie/'}} target="_blank" style={{ color: '#000000' }}>
                                <FaGithub color='#5c32a8' size={30} />@VivisMarrie</Link></li> 
                            <li><Link to={{pathname: 'https://www.instagram.com/vivismarrie/'}} target="_blank" style={{ color: '#000000' }}>
                                <FaInstagram color='#5c32a8' size={30}/>@vivismarrie</Link></li> 
                        </ul> 
                    </div>
                </div>
                <br />
                     
            
            </Container>
            <Footer/>
        </>
    )
};

export default About;