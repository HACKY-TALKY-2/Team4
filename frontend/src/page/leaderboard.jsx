import { useEffect, useState } from 'react';
import '../App.css';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import React, { Component } from 'react';
import './leaderboard.css';
import axios from 'axios';

function Leaderboard() {
  const[rankers, setRankers] = useState([]);
  useEffect(()=>{
    async function getData() {
      try {
        //응답 성공
        const response = await axios.get('https://y3y-back.up.railway.app/leaderboard');
        console.log(response.data);
        setRankers(response.data);
      } catch (error) {
        //응답 실패
        console.error(error);
      }
    }
    getData();
  }, []);
  /*const rankers = [
    {
      name:"8",
      date:"2023-11-10",
      round:5,
      duration:"0분 0초",
    },
    {
      name:"4",
      date:"2023-11-10",
      round:2,
      duration:"0분 0초",
    },
    {
      name:"7",
      date:"2023-11-10",
      round:1,
      duration:"0분 22초",
    },
    {
      name:"6",
      date:"2023-11-10",
      round:1,
      duration:"0분 0초",
    },
    {
      name:"5",
      date:"2023-11-10",
      round:1,
      duration:"0분 49초",
    },
    {
      name:"3",
      date:"2023-11-10",
      round:1,
      duration:"0분 0초",
    },
    {
      name:"2",
      date:"2023-11-10",
      round:1,
      duration:"0분 34초",
    }, 
]*/

return (
  <div className="leaderboard">
    {rankers.map((ranker, index) => (
      <ul>
      <p>{index} &nbsp;
      User : {ranker.name} &nbsp;
      {ranker.date} </p>
        ROUND : {ranker.round} &nbsp;
        {ranker.duration} &nbsp;
      </ul>
    ))}
  </div>
);


};

export default Leaderboard