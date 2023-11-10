import { useEffect, useState } from 'react';
import '../App.css';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import React, { Component } from 'react';
import './leaderboard.css';
import axios from 'axios';

function getImageUrl(index) {
  
  const imageUrls = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Seoul_Metro_Line_1.svg/900px-Seoul_Metro_Line_1.svg.png',
    'https://i.namu.wiki/i/X6Oqk0S3sqbBMFuGumgfzsWPvarXyGlwAjeuCG158xFyhtp0TWgNo8s9BL-APkgmzsbu4EqTRwljEHy_cKSHXGJsCDM6CteZNcR5xSlBTitk-cgq3PX2UuOxGx4Maz1hpknYaPuTo95DeDVU5oZVjA.svg',
    'https://i.namu.wiki/i/xxvbt2Yr-M5kdOQYgBwPItwUMSBcrVFUhrb4vwrVpQ0LovRYzhiVkai9k0ZjqOfvYjmOn_wflJP4d2v0JtZifQdYBsyZiSjdtYUiJ9keQU5CWX6oFzdj-YhnvJy2BOZmG42ryVnNq0GxL2LJCiQ7kg.svg',
    'https://i.namu.wiki/i/FIR5CyYwXq9hrQgRnLL6I0LlMJH24B4SOjWSjBbM2IE6QknrxtolymZXZhIw1Bi52PvV7iX-Lho93EGpGVHRRBsa_wsTOdlO02jBjqetlnDwr63CS41nZb4F408DMnmPv6_0f1MvSEUb6yy5zMnc_w.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Seoul_Metro_Line_5.svg/900px-Seoul_Metro_Line_5.svg.png',
    'https://w7.pngwing.com/pngs/107/846/png-transparent-rapid-transit-commuter-rail-seoul-subway-line-3-seoul-metropolitan-subway-business-20-miscellaneous-text-orange-thumbnail.png',
    'https://i.namu.wiki/i/B6_F_mJWIoDL_dt0LnzCj311IgpsI6aR5DirHLBeKAaFUlfV-O4Xw_VcxShGTY6WU6WKjCC8_MBm834QWhNYgVFcpNn9low0eaaKUcQTYOIS67_21urE-_6MPU6nrbRPLJFSJLj5NLJMS5t7EtrMnQ.svg',
    'https://i.namu.wiki/i/7Z5Z_vPeAQ5w-S8nkQuXCJcZP2wVpj7mqRcFzgbNbNjts9LUR2GMhVcJXkXUYRejWZ93oZou06tW_JtEupWbHFlyHmgrSb6HiFWZ5_teZRn4BEe32zvCIUE8oTCsopuW45YDWIeVK2A-ylPNM6P6yg.svg',
    'https://i.namu.wiki/i/ikHnu_VAxCzn_YPTznVIzRusw_mhudo6fLPM_O11hpIQuXPAlisGmpbTucxeT-tIFFEMt5SW19aMjYtuZENp7e6IGrVWMsQseG4Z3EoXOsppXyTJbf4Re08pafxsTUfLk8YMVQEDu8gCZw5K9LA0_g.svg',

  ];

  
  return imageUrls[index] || 'default-image-url.jpg';
}

function Leaderboard() {
  const title = '순위표';
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
  <>
  <div className="title">{title}</div>
  {rankers.length > 0 && <div className="leaderboard">
    {rankers.map((ranker, index) => (
      <ul>
      <p><img src={getImageUrl(index)} alt={`Ranker ${index}`} className ="ranker-image" />
      USER : {ranker.name} &nbsp;
      DATE : {ranker.date} </p>
      <p>ROUND : {ranker.round} &nbsp;
      TIME : {ranker.duration} &nbsp;</p>
      </ul>
    ))}
  </div>}
  <a href="/" className="home-button"></a>
  <div className="backspace">뒤로가기</div>
  </>
);


};

export default Leaderboard