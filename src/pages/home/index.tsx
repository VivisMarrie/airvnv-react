import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SimpleMap from './../../components/map';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import logo from '../../images/favicon.png';

import Footer from '../../components/footer';
import Page from '../../components/page';


interface JsonReq {
    airvnv : Place[]
}

interface Place {
    id: number,
    photo: string,
    propertyType: string,
    name: string,
    price: number,
    priceCurrency: string,
    lat: number,
    lng: number,
    score: number,
    tag: string
}

const Home = () => {

    const [jsnResponse, setjsnResponse] = useState<Place[]>([]);

    useEffect(() => {
        axios
          .get<JsonReq>(
            "https://v2-api.sheety.co/33ddb6f9591aa44f82386f033548141d/airvnv/airvnv"
          )
          .then(({data}) => {        
            // if(search){               
            //     response.data = response.data.filter(emote => emote.keywords.includes(search.toLowerCase()));
            // }           
            //const result = [...data];
            setjsnResponse(data.airvnv);
            console.log("effect executa", data.airvnv);
            

          }).catch((Error) => {
            console.error(Error);
          });      
      },[]);


    return(
        <>      
            <Navbar bg="white" expand="lg" className="sticky-top border-bottom shadow-sm justify-content-between">
                <Navbar.Brand href="#home" color='#ff0088'>          
                <p style={{color:   '#ff0088'}} className='h2' ><Image src={logo} width="35" height="35" rounded />
                         airvnv</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Sobre</Nav.Link>                
                    </Nav>               
                </Navbar.Collapse>
            </Navbar>

            
            <Container className='mt-2'>
                {/* <SimpleMap/>  */}

                <Page {...jsnResponse} />
            

            </Container>

            <Footer/>
        </>
    )
};

export default Home;