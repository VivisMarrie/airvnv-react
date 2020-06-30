import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { FaStar } from 'react-icons/fa';
import Pagination from "react-js-pagination";
import Place from '../../models';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
  place: Place | undefined,
  show: boolean
}

const ModalCards: React.FC<Props> = (props) => {
    const [show, setShow] = useState(props.show);

    const place = props.place;
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>  
        {place?
          <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
          <Modal.Title>{place.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        : <></>
        }
      </>
    );
  }
  
export default ModalCards;