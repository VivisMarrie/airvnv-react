import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import Place from '../../models';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import GoogleMapReact from 'google-map-react';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
  placeModal: Place | undefined,
  showModal: boolean,
  qtdHospedes: number | undefined,
  qtdDiarias:number | undefined,
  handleClose: () => void
}

enum ColorsBadges {
  SUPERHOST= 'info',
  PLUS= 'dark'
}

const ModalCards: React.FC<Props> = (props) => {
    const showModal = props.showModal;
    const placeModal = props.placeModal;
  
    const handleClose = () => props.handleClose();
  
    return (
    <>  
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
    </>
    );
  }
  
export default ModalCards;

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