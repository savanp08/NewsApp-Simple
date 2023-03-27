import './MainPage.css'
import React from 'react'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import axios from 'axios'


const MainPage = () => {

    const [news, setNews] = useState([
]);
    const [category, setCategory] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [Data ,setData] = useState([
]);
      async function ak()
      {
        let response= await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=a7992cfeea9b4bf6b9693d74275f785b");
         setNews(await response.json());
        console.log(news);
      }
    useEffect(()=>{
        ak();
    },[])
      
    
      useEffect(() => {
        const fetchNews = async () => {
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=in&category=${category}&q=${searchQuery}&from=${fromDate}&to=${toDate}&apiKey=a7992cfeea9b4bf6b9693d74275f785b`
    
    
          );
          setNews(response.data.articles);
        };
        fetchNews();
      }, [category, searchQuery, fromDate, toDate]);
    
      const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };
    
      const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
      };
      const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
      };
    
      const handleToDateChange = (event) => {
        setToDate(event.target.value);
      };
        
      useEffect(()=>{
        if(Array.isArray(news)){
            setData(news);
        }
      },[news])

      const Article = ({Title, Description,Time}) =>{
        console.log(Title + "  "+ Description);
        return(
            <div className="Article_Wrapper">
                <div className='Article-ImgWrapper'>
                        
    
                </div>
                <div className='Article-TextWrapper'>
                  <div className='Article-title'>
                      {Title}
                  </div>
                  <div className='Article-body'>
                        {Description}
                  </div>
                    </div>
            </div>
        )
    }
    


return(
    <div className="MainPage_Wrapper">
        <div className="MainPage_Header">
            <div className="Page-Title">
                People's Daily
            </div>
        <TextField 
        id="outlined-basic" 
        label="Search" 
        variant="outlined"
        value={searchQuery} 
        onChange={handleSearchQueryChange} 
        placeholder="Search news" 
        
        />
        </div>
        <div className="MainPage_Body">
           
            <div className="Left_menu">
                <div className='Menu_Wrapper'>
                <select value={category} onChange={handleCategoryChange}>
          <option value="general">General</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="business">business</option>
          <option value="health">health</option>

        </select>

                </div>
            </div>
            <div className='Articles_Wrapper'>
               {
                Data.map((ele=>{
                    return(
                    <Article Title={ele.title} Description={ele.description} Time={ele.publishedAt} />
                    )
                }))
               }
                </div>
           
        </div>
        <div className="MainPage_Footer">

        </div>
    </div>
)
}
export default MainPage