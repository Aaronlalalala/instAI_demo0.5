import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import Giwawa from "../../image/OIP.jpg";
import "./Model.css";
import axios from 'axios';

function Model() {
    const location = useLocation();

  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userid = searchParams.get('id');
  const projectname = searchParams.get('projectname');
  const DataLink =`/Data?id=${userid}&projectname=${projectname}`;
  const ReqLink =`/Req?id=${userid}&projectname=${projectname}`;
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/model/downloadmodel/?username=${userid}&projectname=${projectname}`
      );
      console.log(response.data);
      alert(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    // 這邊要搭配後端的功能去確認每一個階段的狀態 我只是先試著用時間去跑進度條 
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 20 : prevProgress));
    }, 1000);

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        window.confirm("Your model is finished! ");
        // navigate('/next-page');
        fetchData();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [progress, navigate]);

  const DataClick = () =>{
    const userConfirm = window.confirm("確定要補交資料嗎");
    if(userConfirm){
        navigate(DataLink);
    }
    else{
     console.log("使用者嘗試修改");
     return;
    }
  }
  const ReqClick = () => {
    const userConfirm = window.confirm("確定要重新回答問題");
    if(userConfirm){
        navigate(ReqLink);
    }
    else{
    console.log("使用者嘗試修改");
    return;
    }
  }
  return (
    // <div className="model-container">
        <div className="container-fluid mt-3 model-container" >
      
      <div>
        {/* <div className='main-Giwawa'>
          <img src={Giwawa} className='logo' alt="Your Logo" />
        </div> */}
        <div>
          <ul>
            <h3>Question?</h3>
            <li>if you have any questions or concerns, please email to support@instai.co </li>
          </ul>
        </div>
      </div>

      {/* 動態進度條 */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
          <div className="circle" style={{ left: "0%" }}>Request received</div>
          <div className="circle" style={{ left: "20%" }}>Processing request</div>
          <div className="circle" style={{ left: "40%" }}>Data generation</div>
          <div className="circle" style={{ left: "60%" }}>AI model training</div>
          <div className="circle" style={{ left: "80%" }}>Model download</div>
        </div>
        {/* 顯示進度 先不要用 */}
        {/*<div className="progress-text">{getProgressText()}</div> */}
      </div>
      <div>
        {/*<button onClick={DataClick}>Upload new data</button>*/}
        {/*<button onClick={ReqClick}>Reply message</button>*/}
        {/*<NavLink to = "/Step?id=${userid}&type=1"><button>go back</button></NavLink>*/}
      </div>
    </div>
  );
}

export default Model;

