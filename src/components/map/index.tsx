import React, { useState, useEffect } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import Place from '../../models';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import './styles.css'
import Image from 'react-bootstrap/Image';

interface Props {
  data : Place[]
}

interface MarkerProps {
      lat: number,
      lng: number,
      place: Place,
      callback : any
  };

const Marker = (props:MarkerProps) => {
    return ( 
         <div className="container">
          <FaMapMarkerAlt size={35} color="#FF5A5F" strokeWidth={5} stroke="black" />
          {props.place.show && <InfoWindow {...props} />}          
         </div>        
    )
}

const Map:React.FC<Props> = ({data}) => {
    const [placeMarkers, setPlaceMarkers] = useState<Place[]>();

    const [userPosition, setUserPosition] = useState<Coords>();

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const coordsUser ={
            lat: coords.latitude,
            lng: coords.longitude
          }
          setUserPosition(coordsUser);
      }
    
    )},[]);

    useEffect(() => {
      if(data.length > 0) {
        setPlaceMarkers(data);
      }
    },[data]);

    const onChildClickCallback = (key:number) => {      
      if(placeMarkers){        
        const place = placeMarkers.find(e => e.id == key);
        if(place)
          place.show = true;
      }      
    };

    const closeInfoWindow = (id:number) => {
      if(placeMarkers){        
        const place = placeMarkers.find(e => e.id == id);
        if(place)
          place.show = false;
        setPlaceMarkers(placeMarkers);
      }      
    }

  return (
    <div style={{ height: '380px', width: '100%' }}>
      
          { userPosition ?
          <GoogleMapReact
              bootstrapURLKeys={{ key:'AIzaSyDaFk5VnjfifE28TQBw1lPuO8ngWFnEdNU' }}
              defaultCenter={userPosition}
              defaultZoom={10}
              onChildClick={onChildClickCallback}
              >         
              
            {placeMarkers ? 
              placeMarkers.map((place) => (
                <Marker key={place.id} lat={place.lat} lng={place.lng} place={place} callback={closeInfoWindow} />
              ))
              : <></>}
          </GoogleMapReact>
      :            
        <>loading</>
      }
      
    </div>
  );
  
}

export default Map;



const InfoWindow:React.FC<MarkerProps> = (props) => {
  const place = props.place;

  return (    
      <div className="modalMap" style={{
      position: 'relative',
      bottom: 208,
      left: -180,
      width: 370,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',    
      fontSize: 14,
      zIndex: 100,
      borderRadius:3
    }}>     
      <button type="button" className="close px-1" aria-label="Close" onClick={() => props.callback(place.id)}>
        <span aria-hidden="true">&times;</span>
      </button>
      <div className='py-2 m-0 px-0'>
      <div className="row"> 
        <div className="col-6">
            <Image className="w-100" src={place.photo} alt={place.name}/>  
        </div>
        <div className="col-6 p-1">
            <h5>{place.name}</h5>
            <span>{place.priceCurrency}{place.price}<small> por noite </small></span>
            <div className="w-100"></div>
            <span ><FaStar color='#FF5A5F' />
            {place.score} <small className="text-muted">(155 comentários)</small></span>                
        </div>  
      </div>  
      </div> 
    </div>
  );
};