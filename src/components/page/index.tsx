import React, {useState, useEffect} from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

import { FaStar } from 'react-icons/fa';
import Pagination from "react-js-pagination";
import './styles.css';
import Place from '../../models';
import Col from 'react-bootstrap/Col';

interface Props {
    data : Place[]
}

enum ColorsBadges {
    SUPERHOST= 'info',
    PLUS= 'dark'
}

const Page: React.FC<Props> = ({data}) => {
    const [activePage, setActivePage] = useState<number>(1);
    const [totalItens, setTotalItens] = useState<number>(0);
    const [resultToRender, setResultToRender] = useState<Place[]>([]);
    
    useEffect(() => {       
        setTotalItens(data.length);
        const indexOfLast = activePage * 9;
        const indexOfFirst = indexOfLast - 9;
        if(data.length > 0)
            setResultToRender(data.slice(indexOfFirst, indexOfLast));            
          
    },[data, activePage]);

    const handlePageChange = (pageNumber:number) => {
        setActivePage(pageNumber);
    }    

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
                                <a id="cardlink-" data-toggle="modal" data-target="#modalCard" href="/" className="stretched-link">{null}</a>
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
        </>
    )

}

export default Page;