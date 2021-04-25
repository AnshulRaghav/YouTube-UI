import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const Tabs = () => {
  const [tab, setTab] = useState(0);

  const sections = 
    {
      0:['Overview','Overview Text'],
      1:['Notes','Notes Text'],
      2:['Reading Material','REading'],
      3:['Disucssion','Discussion Text']
    }
  ;

  return(
    <React.Fragment>
      <ul className="nav nav-pills">
        {Object.keys(sections).map((key,index) => {
          return(
            <li className="nav-item" onClick={() => setTab(index)}>
              <a className={"nav-link " + tab===index ? "active" : null} href={"#tab"+index}>{sections[index][0]}</a>
            </li>
          )
        })}
      </ul>
      <div className="tab-content">
        <div className="tab-pane container active" id={"tab"+tab}>{sections[tab][1]}</div>
      </div>
    </React.Fragment>
  )
}

const App = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-7">
          <img id="img" src={logo} alt="img" className="w-100" height="400"></img>
          <div className="p-3 mb-2">
            <div className="progress">
              <div className="progress-bar w-25"></div>
            </div>
            <p className="mb-0 text-secondary text-sm">17:9/120:20</p>
          </div>
          <Tabs/>
        </div>
        <div className="col-5 bg-danger"></div>
      </div>
    </div>
  );
}

export default App;
