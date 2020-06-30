import React, {useState, useEffect, MouseEvent} from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import Pagination from "react-js-pagination";
import './styles.css';
import Place from '../../models';
import Col from 'react-bootstrap/Col';
import ModalCards from '../modalCards';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import GoogleMapReact from 'google-map-react';

interface Props {
    data : Place[],
    qtdHospedes: number | undefined,
    qtdDiarias:number | undefined
}

enum ColorsBadges {
    SUPERHOST= 'info',
    PLUS= 'dark'
}

const Page: React.FC<Props> = (props) => {
    const [activePage, setActivePage] = useState<number>(1);
    const [totalItens, setTotalItens] = useState<number>(0);
    const [resultToRender, setResultToRender] = useState<Place[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [placeModal, setPlaceModal] = useState<Place>();

    
    useEffect(() => {       
        setTotalItens(props.data.length);
        const indexOfLast = activePage * 9;
        const indexOfFirst = indexOfLast - 9;
        if(props.data.length > 0)
            setResultToRender(props.data.slice(indexOfFirst, indexOfLast));            
          
    },[props.data, activePage]);

    const handlePageChange = (pageNumber:number) => {
        setActivePage(pageNumber);
    }    

    const handleShowModal = (event: MouseEvent<HTMLElement>, place:Place) => {
        event.preventDefault();
        setShowModal(true);
        setPlaceModal(place);
    }    

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Row className="mt-2 pr-3">
                {                    
                    resultToRender.length > 0 ?    
                        resultToRender.map((place) => (
                        <span key={place.id} className='col-sm-4 my-2 pr-0' >
                            <Card className='h-100 card-link'>
                            <Card.Img variant="top" src={place.photo} />
                            <Card.Body>
                                <Card.Text>
                                    <Badge className={`badge-${ColorsBadges[place.tag as keyof typeof ColorsBadges]}`} >{place.tag}</Badge>
                                    <small className="text-muted"> {place.propertyType}</small>
                                    <small><span className="float-right"><FaStar color='#FF5A5F' />{place.score}</span></small>
                                </Card.Text >
                                <h6>{place.name}</h6>
                                <Card.Text>
                                    <small><b>{place.priceCurrency} {place.price}</b>/Noite</small>
                                    { place.total ? 
                                        <span className="float-right">
                                        <small className="text-muted">Total: <b>{place.priceCurrency}  {place.total}</b></small>
                                    </span> : <></> }
                                </Card.Text>
                                <a id="cardlink-" data-toggle="modal" data-target="#modalCard" href="/" onClick={(event) => handleShowModal(event, place)} className="stretched-link">{null}</a>
                            </Card.Body>
                            </Card>
                        </span>
                    ))     
                    : <Col className="d-flex justify-content-center my-3"><Spinner animation="border" /></Col>                
                }
            </Row>
            <span className="justify-content-center d-flex">
                <Pagination
                itemClass="page-item"
                linkClass="page-link"   
                activePage={activePage}
                itemsCountPerPage={9}
                totalItemsCount={totalItens}
                hideNavigation
                onChange={handlePageChange}
                />
            </span>

            {placeModal?
            <Modal show={showModal} onHide={handleClose} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{placeModal.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col xs={7}>
                        <Image className='w-100' src={placeModal.photo} />
                        <div style={{ height: '350px', width: '100%' }}>      
                            <GoogleMapReact
                                bootstrapURLKeys={{ key:'AIzaSyDaFk5VnjfifE28TQBw1lPuO8ngWFnEdNU' }}
                                defaultCenter={{lat: placeModal.lat, lng: placeModal.lng}}
                                defaultZoom={12}
                                >         
                                <Marker key={placeModal.id} lat={placeModal.lat} lng={placeModal.lng} />                                     
                            </GoogleMapReact>
                        </div>
                       
                    </Col>
                    <Col >
                        <Badge className={`badge-${ColorsBadges[placeModal.tag as keyof typeof ColorsBadges]}`} >{placeModal.tag}</Badge>
                        <small className="text-muted"> {placeModal.propertyType}</small>

                        <p>Quarto em apart-hotel 2 hóspedes 1 quarto 2 camas 1 banheiros privado
                        Self check-in Faça check-in sem problemas com o porteiro. Comodidades para a vida diária O anfitrião equipou este espaço para estadias longas — Wi-Fi, estacionamento gratuito, ar condicionado e aquecedor incluídos</p>

                        <Card >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <b>{placeModal.priceCurrency} {placeModal.price}</b> por Noite
                                <br/>
                                <FaStar color='#FF5A5F' />{placeModal.score}<small className="text-muted">(155 comentários)</small>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Datas <span className="float-right">{props.qtdDiarias} Dias</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Hóspedes <span className="float-right">{props.qtdHospedes} Hóspedes</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {placeModal.priceCurrency}{placeModal.price} x {props.qtdDiarias} noites<span className="float-right">{placeModal.priceCurrency}{placeModal.total}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Total { placeModal.total ? 
                                <span className="float-right">
                                {placeModal.priceCurrency}{placeModal.total}
                                </span> : <></> }
                            </ListGroup.Item>
                            <ListGroup.Item><Button variant="danger" block>Reservar</Button></ListGroup.Item>
                        </ListGroup>
                        </Card>

                    </Col>
                </Row>

                </Modal.Body>
            </Modal>
            : <></>
            }
            {/* <ModalCards show={showModal} place={placeModal} /> */}
        </>
    )

}

export default Page;

const Marker = (props:MarkerProps) => {
    return ( 
        <div className="container">
            <FaMapMarkerAlt size={35} color="#FF5A5F" strokeWidth={5} stroke="black" />         
        </div>        
    )
}

interface MarkerProps {
    lat: number,
    lng: number
};