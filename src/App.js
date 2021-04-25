import React, { useState,useEffect } from 'react';
import {CSSTransition} from 'react-transition-group';
import {FixedSizeList as List} from 'react-window';

import {IoInformationCircle} from 'react-icons/io5';
import {IoPencilOutline} from 'react-icons/io5';
import {IoBookOutline} from 'react-icons/io5';
import {IoChatboxOutline} from 'react-icons/io5';
import {IoShareSocialOutline} from 'react-icons/io5';
import {IoBookmarkOutline} from 'react-icons/io5';
import {IoStarOutline} from 'react-icons/io5';
import {IoEyeOutline} from 'react-icons/io5';
import {IoEllipsisVertical} from 'react-icons/io5';
import './App.css';

const Tabs = props => {
  const [tab, setTab] = useState(0);

  const sections = 
    {
      0:['Overview',['plan','eath','hjsa']],
      1:['Notes',['plan','eath','hjsa']],
      2:['Reading',['plan','eath','hjsa']],
      3:['Disucssion',['plan','eath','hjsa']]
    };

    const size = 48;

  return(
    <React.Fragment>
      <ul className="nav nav-pills">
        {Object.keys(sections).map((key,index) => {
          return(
              <li className="nav-item" onClick={() => setTab(index)} key={key}>
                <CSSTransition in={tab===index} timeout={1000} classNames="tab" key={key}>
                <a className={"d-flex nav-link align-items-center mt-2 " + (tab===index ? "active" : null)} href={"#tab"+index}>
                  {index===0 ? <IoInformationCircle size={size} className="p-2"></IoInformationCircle> : null}
                  {index===1 ? <IoPencilOutline size={size} className="p-2"></IoPencilOutline> : null}
                  {index===2 ? <IoBookOutline size={size} className="p-2"></IoBookOutline> : null}
                  {index===3 ? <IoChatboxOutline size={size} className="p-2"></IoChatboxOutline> : null}
                  {tab===index ? <b>{sections[index][0]}</b> : null}
                  </a>
                  </CSSTransition>
              </li>
          )
        })}
      </ul>
      <div className="w-100 d-flex mt-5">
        {sections[tab][1].map(item => {
            return(
              <small className="pr-3 text-success" key={item}>item</small>
            )
          })}
      </div>
      <div className="w-100 d-flex mt-3">
        <div className="tab-content w-75">
          <h2 className="title">{props.data[tab] ? props.data[tab]['snippet']['title'].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>') : null}</h2>
        </div>
        <div className="d-flex w-25 justify-content-end">
            <IoShareSocialOutline size={40} className="pl-3"></IoShareSocialOutline>
            <IoBookmarkOutline size={40} className="pl-3"></IoBookmarkOutline>
        </div>
      </div>
      <div className="d-flex w-100 mt-3">
        <div className="w-75">
          <p style={{textAlign:'justify'}}>{props.data[tab] ? props.data[tab]['snippet']['description'] : null}</p>
        </div>
        <div className="w-25 d-flex justify-content-end pl-3">
          {[0,1,2,3,4].map((index) => {
            return(
              <IoStarOutline size={25} key={index} className="pl-1" color="#FFC32B"></IoStarOutline>
            )
          })}
        </div>
      </div>

    </React.Fragment>
  )
}

const RightPanel = props => {
  const { data, index, style } = props;

  return(
    <div style={style}>
      <div className="d-flex">
        <div className="w-50">
        <img src={data.item[index]['snippet']['thumbnails']['high']['url']} alt="thumbnail" className="img-border w-100" height="180" />
        </div>
        <div className="d-flex pl-3 w-50">
          <div className="d-flex flex-column">
          <h5 className="text-ellipses">{data.item[index]['snippet']['title']}</h5>
          <small className="text-secondary">Cash Course</small>
          <div className="mt-3">
            {[0,1,2,3,4].map((index) => {
              return(
                <IoStarOutline key={index} size={25} color="#FFC32B" className="pr-2"></IoStarOutline>
              )
            })}
          </div>
          <div>
            <small className="text-secondary pr-3">2 days ago</small>
            <IoEyeOutline size={16} />
            <small>15k</small>
          </div>
          </div>
          <IoEllipsisVertical size={24} />
        </div>
        </div>
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://www.googleapis.com/youtube/v3/search?key='+process.env.REACT_APP_API_KEY+'&part=snippet&q=the weekend')
    .then(response => response.json())
    .then((data) => {
      setData(data['items']);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    data && data.length > 0 ?
    <div className="d-flex container-fluid h-100 pt-3" style={{maxWidth:'1400px'}}>
      <div className="row">
        <div className="col-12 col-lg-7 pr-lg-5">
          <img src={data[3]['snippet']['thumbnails']['high']['url']} alt="img" className="w-100 img-border" height="400"></img>
          <div className="p-3">
            <div className="d-flex mb-4 w-100 align-items-center">
              <div className="progress mr-3" style={{width:'85%'}}>
                <div className="progress-bar w-25"></div>
              </div>
              <small className="ml-auto text-secondary">17:9/120:20</small>
            </div>
            <Tabs data={data}/>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <h5 className="bg-light pl-3 pr-3 pt-2 pb-2 text-dark" style={{borderRadius:'16px',display:'inline-block'}}>Recommended</h5>
          <List className="mt-4"
              height={200 * data.length}
              itemCount={data.length}
              itemSize={200}
              itemData={{item:data,otherData: true}}
              style={{width:'100%',overflow:'hidden'}}
            >
              {RightPanel}
          </List>
        </div>
      </div>
    </div>
    : <h1 className="d-flex align-items-center justify-content-center bg-light h-100">Loading...</h1>
  );
}

export default App;
