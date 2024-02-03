import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import InstAI_icon from "../../image/instai_icon.png";


import bell from "../../image/bell.png";
import train from "../../image/train.png";
import design from "../../image/design.png";
import schedule from '../../image/schdule.png';
import line from '../../image/line.png';

const Model = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userid = searchParams.get('id');
  const projectname = searchParams.get("projectname");
  const [modelFile, setModelFile] = useState();
  const modelFilePath = '../../model/yolov3tiny.rar';
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get('aws模型位址', { responseType: 'blob' });
        console.log('Model fetched successfully');
        setModelFile(response.data);
      } catch (error) {
        console.error('Could not fetch model', error);
      }
    };

    fetchModel();
  }, []);  

  const handleDownloadModel = async () => {
    try {
      const response = await fetch(modelFilePath);
      const modelBlob = await response.blob();

      const url = window.URL.createObjectURL(modelBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'yolov3tiny.rar');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Could not fetch model', error);
    }
  };


  return (
    <div className="container-fluid mt-3">
      <div className="row d-flex justify-content-between ">
        <div className="col-auto">
          <img src={InstAI_icon} className="img-fluid" alt="InstAi_Icon" style={{ width: '76.8px', height: '76.8px' }} ></img>
        </div>
        <div className="col-auto mt-4">
          <NavLink to={`/Project?id=${userid}&type=1`} className="projectPageLink">
            <button className="btn projectPageButton">返回專案頁面</button>
          </NavLink>
        </div>
        <div className="custom-border" />
      </div>
      <h1 className='main-projectTitle'>
        {projectname}
      </h1>
      <div className='background' style={{ position: 'relative' }}>
        
        <img src={bell} alt="bell" style={{ width: '150px', height: '150px' ,marginRight: '120px',marginLeft:'120px' }}></img>
        <img src={schedule} alt="schedule" style={{ width: '150px', height: '150px',marginRight: '120px' }}></img>
        <img src={design} alt="design" style={{ width: '150px', height: '150px',marginRight: '120px' }}></img>
        <img src={train} alt="train" style={{ width: '150px', height: '150px',marginRight: '120px' }}></img>
        <img src={line} alt="line" style={{ width: '150px', height: '150px' }}></img>

        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', border: '2px solid #000', marginRight: '250px' ,marginLeft: '190px'}}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', border: '2px solid #000', marginRight: '250px' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', border: '2px solid #000', marginRight: '250px' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', border: '2px solid #000', marginRight: '250px' }}></div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', border: '2px solid #000' }}></div>
          
        </div>

        <div style={{ position: 'absolute', left: '50%',marginTop:'-10px', transform: 'translateX(-50%)', width: '100%', borderBottom: '2px solid #000' }}></div>
        <div className="col mt-3">
        <ul>
          <button className='listTitle' style={{marginLeft:'600px',marginTop:'200px'}} onClick={handleDownloadModel}>Download AI model</button>
        </ul>
        <ul>我也不知道這是不是模型檔案
        </ul>
      </div>
      </div>

      
    </div>
  );
}

export default Model;
