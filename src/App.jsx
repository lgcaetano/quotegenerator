import React from "react";
import { useState, useEffect } from 'react';

const colors = ['#08203F', '#17627E', '#24C0BC', 
'#EEE7B8', '#EF6448', '#621C1C',
'#DC420F', '#ABC654', '#2A6F61', '#4F513C', '#F7A145']


export default function App(props){
    
    
    const [colorIndex, setColorIndex] = useState(0)
    const [data, setData] = useState([])
    const [curQuote, setCurQuote] = useState(0)

    document.querySelector(':root').style.setProperty('--bkg', colors[colorIndex])

    function getNewQuote(){

        let rand = Math.floor(Math.random() * data.length)
        setCurQuote(rand)
        
        if(colorIndex >= colors.length - 1){
            setColorIndex(0)
        } else {
            setColorIndex(colorIndex + 1)
        }
    }


    useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(response => response.json())
            .then(quotes => {
                console.log(quotes)
                setData(quotes)
                let rand = Math.floor(Math.random() * quotes.length)
                console.log(rand)
                setCurQuote(rand)
            })

        }, [])


    

    return (
        <div id="quote-box">
            <h2 id="text">
                {console.log(curQuote)}
                <i className="fas fa-quote-left"
                style={{
                    margin: '10px',
                    transform: 'translateY(-5px)'
                }}></i>
                
                {data[curQuote] ? data[curQuote].text : ""}


                <i className="fas fa-quote-right"
                style={{
                    margin: '10px',
                    transform: 'translateY(5px)'
                }}></i>
            </h2>
            <div id="author">{data[curQuote] ? data[curQuote].author : ""}</div>
            <div id="buttons">
                <a href="https://twitter.com/intent/tweet" id="tweet-quote">
                    <i className="fab fa-twitter"></i>
                </a>
                <button id="new-quote" onClick={getNewQuote}>
                    New Quote
                </button>
            </div>
        </div>
    )

}