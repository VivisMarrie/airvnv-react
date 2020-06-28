import React, { useState, useEffect } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';

interface type {
      lat: number,
      lng: number,
      text: string
  };

const Marker = (type:type) => {
    return ( 
         <div className="container">
             {/* <div className="row">
                 <div className="col-6 p-0">
                     <img className="img-fluid" src={type.text} style={{width: 10, height: 8}} alt={type.text}/>  
                 </div>
                 <div className="col-6 p-1">
                     <h5>{type.text}</h5>
                     <span>R${type.text}<small> por noite </small></span>
                     <div className="w-100"></div>
                     <span ><i className="fas fa-star"></i>
                     {type.text} <small className="text-muted">(155 comentários)</small></span>                
                 </div>  
             </div>     */}
         </div>        
    )
}

const Map = () => {
    
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  
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

    return (
      <div style={{ height: '380px', width: '100%' }}>
         
            { userPosition ?
            <GoogleMapReact
                bootstrapURLKeys={{ key:'AIzaSyDaFk5VnjfifE28TQBw1lPuO8ngWFnEdNU' }}
                defaultCenter={userPosition}
                defaultZoom={defaultProps.zoom}
                >            
                <Marker lat={userPosition.lat} lng={userPosition.lng} text="My Marker" />
            </GoogleMapReact>
         :            
           <>loading</>
         }
        
      </div>
    );
  
}

export default Map;