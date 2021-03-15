import React,{ useState, useEffect }  from 'react';
import 'antd/dist/antd.css';
import { Input, Space,Row,Col,Card } from 'antd';
import '../App.css';
function Details(props){
  let selectedCardId = localStorage.getItem("selectedCard");
  const [cardDetails,setcardDetails] = useState("");
  useEffect(() => {
      fetch(`http://www.omdbapi.com/?i=${selectedCardId}6&apikey=64769f03`)
      .then(response => response.json())
      .then(data =>{console.log(data);setcardDetails(data)}); 
  }, [selectedCardId])
      return(
     <> 
     <Row>
      <Col span={22} offset={5}>
  <div className="card-container">
  <div className="float-layout">
    <div className="card-image">
      <img src={cardDetails.Poster}/>
      <div className="card">
        <div className="card-title">{cardDetails.Title}</div>
        <div className="card-desc">
          <Row>
            <Col span={6}>
            <b >Movie Name   </b>
            </Col>
            <Col span={6}>
          <span>{cardDetails.Title}</span>
          </Col>
          </Row>
          <Row>
          <Col span={6}>
            <b >Year</b>
            </Col>
            <Col span={6}>
          <span>{cardDetails.Year}</span>
          </Col>
          </Row>
          <Row>
          <Col span={6}>
            <b >Ratings</b>
            </Col>
            <Col span={6}>
          <span>{cardDetails.Rated}</span>
          </Col>
          </Row>
      
        </div>
      </div>
    </div>
  </div>
</div>
</Col>
</Row>   
</>

    );
}
export default Details;