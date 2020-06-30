import React, { useState, ChangeEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import logo from '../../images/favicon.png';
import { FaSearch } from 'react-icons/fa';

interface Props {
    currentPage: string,
    setQtdHospedes: (qtdHospedes: number) => void,
    setQtdDiarias: (qtdDiarias: number) => void,
}

const Header:React.FC<Props> = (props) => {
    const currentPage = props.currentPage;
    const [qtdHospedes, setQtdHospedes] = useState<number>();
    const [qtdDiarias, setQtdDiarias] = useState<number>();

    const handleQtdHospedes = useCallback(event => {
        setQtdHospedes(parseInt(event.target.value));
       // props.setQtdHospedes(parseInt(event.target.value));
    }, []);
    
    const handleQtdDiarias = useCallback(event => {
        setQtdDiarias(parseInt(event.target.value));
        //props.setQtdDiarias(parseInt(event.target.value));
    }, []);

    const handleSearch = () => {
        if(qtdHospedes && qtdDiarias){
            props.setQtdHospedes(qtdHospedes);
            props.setQtdDiarias(qtdDiarias);
        }
    };
    /*function handleQtdHospedes(event: ChangeEvent<HTMLInputElement>) {
        setQtdHospedes(parseInt(event.target.value));
        props.setQtdHospedes(parseInt(event.target.value));
        
    }
    
    function handleQtdDiarias(event: ChangeEvent<HTMLInputElement>) {
        setQtdDiarias(parseInt(event.target.value));
        props.setQtdDiarias(parseInt(event.target.value));
    }*/

return (
    <Navbar bg="white" expand="lg" className="sticky-top border-bottom shadow-sm justify-content-between">
        <Navbar.Brand color='#ff0088'>          
        <Link to='/'><p style={{color:   '#FF5A5F'}} className='h2' >
                <Image src={logo} width="35" height="35" rounded />
                airvnv</p></Link>
        </Navbar.Brand>
 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="mx-auto">
                <InputGroup className="mb-3">
                    <FormControl 
                    placeholder="Quantidade de Hóspedes"               
                    onChange={handleQtdHospedes} type="number"
                    />
                    <FormControl
                    placeholder="Quantidade de Diárias" type="number"               
                    onChange={handleQtdDiarias}
                    /> 
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={handleSearch}><FaSearch/></Button>
                    </InputGroup.Append>
                </InputGroup>
            </Nav>
            <Nav className="ml-auto">
                <Link to='/' className={currentPage === 'home' ? 'nav-item nav-link active' : 'nav-item nav-link' }>Home</Link>
                <Link to='/about'className={currentPage === 'about' ? 'nav-item nav-link active' : 'nav-item nav-link' } >Sobre</Link>                
            </Nav>               
        </Navbar.Collapse>
    </Navbar>
);
}

export default Header;


