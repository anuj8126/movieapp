import React ,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Input, Space,Row,Col,Card,Switch  } from 'antd';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { lightTheme, darkTheme } from "./Themes"
function Home(){
  const { Search } = Input;
  const { Meta } = Card;
  const [searchValue,setsearchValue] = useState(null);
  const [searchResultData,setsearchResultData] = useState([]);
  const [theme, setTheme] = useState(false);
  const themeToggler = () => {
    theme === false ? setTheme('dark') : setTheme('light')
}
  
  const onSearch = value => {
    console.log(value);
    setsearchValue(value);
  }
  useEffect(() => {
    if(searchValue){
      fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=64769f03`)
      .then(response => response.json())
      .then(data =>{console.log(data);setsearchResultData(data.Search)});
    }
    
  }, [searchValue])
 const funconCardClick = (e)=>{
    localStorage.setItem("selectedCard", e.target.alt); 
 }
 function onChange(checked) {
  setTheme(checked);
}
    return(
      <ThemeProvider theme={theme === false ? lightTheme : darkTheme}>
      <> 
      <GlobalStyles/>
      <div className="navBar">
      <Row>
      <Col span={12} offset={6}>
      <Search placeholder="input search text" onSearch={onSearch} enterButton style={{marginTop:'2vh'}} />
      </Col>
      <Col style={{margin:'2vh'}}>
      <Switch checkedChildren="Dark" unCheckedChildren="Light"   onChange={onChange} />
      </Col>
      </Row>     
      </div> 

      <div className="cardDivison">
      <Row>
        {searchResultData.length>0 && searchResultData.map(value=>{
          {console.log(value)}
          return(
            <Col span={6} style={{marginBottom:'5vh'}}>
              <Link to="/detail">
            <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt={value.imdbID} src={value.Poster}/>}
            key={value.imdbID}
            onClick={(e)=>{funconCardClick(e)}}
            >
           <Meta title={value.Title} description={value.Year} />
          </Card>
          </Link>
          </Col>
          )
      

        })}
        
      </Row>
       
        </div>  
      
           
      </>
      </ThemeProvider>


    );
     
}
export default Home;