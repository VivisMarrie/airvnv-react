import React, {useState, useEffect} from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { FaStar } from 'react-icons/fa';
import Pagination from "react-js-pagination";

interface Props {
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

enum ColorsBadges {
    SUPERHOST= 'info',
    PLUS= 'dark'
}

const Page: React.FC<Place[]> = (props) => {
    const [propsState, setPropsState] = useState<Array<Place>>(props);
    const [activePage, setActivePage] = useState<number>(0);
    const [resultToRender, setResultToRender] = useState<Place[]>([]);

    console.log("filho renderiza", props);
    

    useEffect(() => {
        setPropsState(props);
        setActivePage(1);
        console.log("props",  props) 
        console.log("propsState", propsState) 

        const indexOfLast = activePage * 10;
        const indexOfFirst = indexOfLast - 10;    
        //props.map(place => console.log("item"));
       // console.log("slicing", props.length) 
      /*  if(props.length > 0){
            console.log("true ", activePage, indexOfFirst, indexOfLast, resultToRender);
            
            setResultToRender(props.slice(indexOfFirst, indexOfLast)) ;
            console.log("resultToRender tre ", props) 
        }*/
    }, [props]);

    

    useEffect(() => {

        console.log(propsState, "resultToRender2 ") 
        const indexOfLast = activePage * 10;
        const indexOfFirst = indexOfLast - 10;
        //if(props. !== undefined)
        // setResultToRender(propsState.slice(indexOfFirst, indexOfLast)) ;
          
    },[activePage]);

    return (
        <>
            <Row className="mt-2 pr-3">
                {                    
                        resultToRender ?    
                        resultToRender.map((place) => (
                        <span key={place.id} className='col-sm-4 my-2 pr-0' >
                            <Card className='h-100'>
                            <Card.Img variant="top" src={place.photo} />
                            <Card.Body>
                                <Card.Text>
                                    <Badge className={`badge-${ColorsBadges[place.tag as keyof typeof ColorsBadges]}`} >{place.tag}</Badge>
                                    <small className="text-muted"> {place.propertyType}</small>
                                    <small><span className="float-right"><FaStar color='#f542d4' />{place.score}</span></small>
                                </Card.Text >
                                <h6>{place.name}</h6>
                                <Card.Text>
                                    <small><b>{place.priceCurrency} {place.price}</b>/Noite</small>
                                </Card.Text>
                                <a id="cardlink-" data-toggle="modal" data-target="#modalCard" href="/" className="stretched-link"></a>
                            </Card.Body>
                            </Card>
                        </span>
                    ))     
                    : <></>                   
                }
            </Row>

            <Pagination
            itemClass="page-item"
            linkClass="page-link"   
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5} hideNavigation
            onChange={()=>(setActivePage(activePage))}
            />
        </>
    )

}

export default Page;