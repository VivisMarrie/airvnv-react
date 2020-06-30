import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Map from './../../components/map';
import Container from 'react-bootstrap/Container';
import Footer from '../../components/footer';
import Page from '../../components/page';
import Place from '../../models';
import Header from '../../components/header';

interface JsonReq {
    airvnv : Place[]
}

const Home = () => {

    const [jsnResponse, setjsnResponse] = useState<Place[]>([]);
    const [qtdHospedes, setQtdHospedes] = useState<number>();
    const [qtdDiarias, setQtdDiarias] = useState<number>();

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
          }).catch((Error) => {
            console.error(Error);
          });      
      },[]);

    useEffect(() => {
        jsnResponse.map(place => {
        if(qtdHospedes && qtdDiarias){
            place.total = qtdHospedes * qtdDiarias * place.price;
        } else {
            place.total =  null;
        }
        return place;
    });
        setjsnResponse(jsnResponse => [...jsnResponse]);
        // eslint-disable-next-line
    },[qtdHospedes, qtdDiarias]);

    return(
        <>      
            <Header currentPage='home' setQtdHospedes={setQtdHospedes} setQtdDiarias={setQtdDiarias}  />

            <Container className='mt-2'>
                <Map data={jsnResponse} />

                <Page data={jsnResponse} />
                                 
            </Container>
            <Footer/>
        </>
    )
};

export default Home;