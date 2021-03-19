import React ,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Input, Space,Row,Col,Card,Switch,AutoComplete} from 'antd';
import {ThemeProvider} from "styled-components";
import { GlobalStyles,NavBar } from "./GlobalStyles";
import { lightTheme, darkTheme } from "./Themes";
import {useHistory} from 'react-router-dom';
function Home(){
  const { Search } = Input;
  const { Meta } = Card;
  const [searchValue,setsearchValue] = useState(null);
  const [searchResultData,setsearchResultData] = useState([]);
  const [cardData,setcardData] = useState([]);
  const [theme, setTheme] = useState(true);
  const [options, setOptions] = useState([]);
  const themeToggler = () => {
    theme === false ? setTheme('dark') : setTheme('light')
}
const history = useHistory();
  const onSearch = value => {
    setcardData(searchResultData);
  }
  useEffect(() => {
    if(searchValue){
      fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=64769f03`)
      .then(response => response.json())
      .then(data =>{
        if(data.Response == "True"){
          setsearchResultData(data.Search)
          const optionvalue = data.Search.map(d=>{
          return {value: d.imdbID , label:d.Title , id: d.imdbID}
          });
        setOptions(optionvalue);
        }
        
      
      });
    }
    
  }, [searchValue])
 function onSelect(value){
  history.push(`/details/${value}/${theme}`);   
 }
 const funconCardClick = (e)=>{
 
 }
 function onChange(checked) {
  setTheme(checked);
}
    return(
      <ThemeProvider theme={theme === false ? lightTheme : darkTheme}>
      <> 
      <GlobalStyles/>
      <NavBar>
      <Row>
       
      <Col xs={12} sm={12} md={12} lg={12} xl={12} offset={6}>
      <AutoComplete
      options={options}
      className="inputClass"
      onSelect={onSelect}
     
      >
      <Search placeholder="Find My Movies" onSearch={onSearch} onChange={e=>setsearchValue(e.target.value)}  enterButton style={{marginTop:'2vh'}} />
      </AutoComplete>
      </Col>
      <Col style={{margin:'2vh'}}>
      <Switch checkedChildren="Dark" defaultChecked unCheckedChildren="Light"   onChange={onChange} />
      </Col>
      
      </Row>     
      </NavBar> 

      <div className="cardDivison">
      <Row gutter={[16, 16]}>
        {cardData.length>0 && cardData.map(value=>{
          {console.log(value)}
          return(
            <Col style={{marginBottom:'5vh'}} xs={24} sm={24} md={6} lg={6} xl={6}>
              <Link to={`/details/${value.imdbID}/${theme}`}>
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