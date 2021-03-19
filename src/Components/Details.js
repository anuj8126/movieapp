import React,{ useState, useEffect }  from 'react';
import 'antd/dist/antd.css';
import { Input, Space,Row,Col,Card,Form } from 'antd';
import '../App.css';
import { withRouter } from 'react-router';
import {ThemeProvider} from "styled-components";
import { GlobalStyles,Box } from "./GlobalStyles";
import { lightTheme, darkTheme } from "./Themes"
function Details(props){
  console.log(props);
  const { TextArea } = Input;
  const [cardDetails,setcardDetails] = useState(null);
  const layout = {
    labelCol: {
      span: 8,
      offset:2
    },
    wrapperCol: {
      span: 16,
      offset:1
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  useEffect(() => {
      fetch(`http://www.omdbapi.com/?i=${props.match.params.id}&apikey=64769f03`)
      .then(response => response.json())
      .then(data =>{setcardDetails(data)}); 
  }, [props.match.params.id])
  console.log(cardDetails);
      return(
        <ThemeProvider theme={props.match.params.mode == "false" ? lightTheme : darkTheme}>
     <> 
     <GlobalStyles/>
    <Row>
      <Col xs={24} sm={24} md={6} lg={6} xl={6}></Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} >

        {cardDetails ?
           <Box>
           <Row>
             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
             <Card
               hoverable
               cover={cardDetails.Poster?<img alt={cardDetails.Poster} src={cardDetails.Poster}/>:<h1>Image Not Available</h1>}
               className="Carddetails"
              
               >
             </Card>
   
             </Col>
             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
             <Col xs={24} sm={24} md={24} lg={24} xl={24} offset={6}>
               <h2 style={{color: "#1890ff"}}>{`${cardDetails.Title} (${cardDetails.Year})`}</h2>
             </Col>
             <Form
            {...layout}  
            
             >
          <Form.Item
           label="IMDB Raiting"
           name="imdbraiting"
           className="formClass"     
            
         >
           <Input  bordered={false} disabled key={cardDetails.imdbRating || ""} defaultValue={cardDetails.imdbRating || ""}/>
         </Form.Item>
         <Form.Item
           label="Runtime"
           name="runtime"  
           className="formClass"         
         >
           <Input className="InputClassDetails" bordered={false} disabled key={cardDetails.Runtime || ""} defaultValue={cardDetails.Runtime || ""}/>
         </Form.Item>
         <Form.Item
           label="Genre"
           name="genre"    
           className="formClass"       
         >
           <Input bordered={false} disabled key={cardDetails.Genre || ""} defaultValue={cardDetails.Genre || ""}/>
         </Form.Item>
         <Form.Item
           label="Director"
           name="Director"  
           className="formClass"         
         >
           <Input bordered={false} disabled key={cardDetails.Director || ""} defaultValue={cardDetails.Director || ""}/>
         </Form.Item>
         <Form.Item
           label="Country"
           name="Country" 
           className="formClass"          
         >
           <Input bordered={false} disabled key={cardDetails.Country || ""} defaultValue={cardDetails.Country || ""}/>
         </Form.Item>
         <Form.Item
           label="Plot"
           name="Plot"    
           className="formClass"       
         >
          <TextArea
         
          bordered={false}
          key={cardDetails.Plot || ""} 
          defaultValue={cardDetails.Plot || ""}
          disabled
          autoSize={{ minRows: 2, maxRows: 6 }}/>
         </Form.Item>
   
          </Form>
   
             </Col>
           </Row>
           </Box>
        
        
        :<h1>No Info Available...</h1>
        }
     
     </Col>
    </Row>
       
     </>
 </ThemeProvider>
    );
}
export default withRouter(Details);