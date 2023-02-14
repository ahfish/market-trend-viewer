// import React from 'react';
import React, { Component } from "react";
import {useState} from 'react';
import logo from './logo.svg';
import './App.css';


import Line from "./Line";
// import series0 from './CandleStickData_0';
// import series1 from './CandleStickData_1';
// import series2 from './CandleStickData_2';
// import series3 from './CandleStickData_3';
// import series4 from './CandleStickData_4';
// import series5 from './CandleStickData_5';
// import series6 from './CandleStickData_6';
// import series7 from './CandleStickData_7';
// import series8 from './CandleStickData_8';
// import series9 from './CandleStickData_9';
import series_2level_0 from './CandleStickData_2level_0';
import series_2level_1 from './CandleStickData_2level_1';
import series_2level_2 from './CandleStickData_2level_2';
import series_2level_3 from './CandleStickData_2level_3';
import series_2level_4 from './CandleStickData_2level_4';
import series_2level_5 from './CandleStickData_2level_5';
import series_2level_6 from './CandleStickData_2level_6';
import series_2level_7 from './CandleStickData_2level_7';
import series_2level_8 from './CandleStickData_2level_8';
import series_2level_9 from './CandleStickData_2level_9';
import { CandleStick, CandleStickProp } from "./CandleStick";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';  

function App() {
  const [value,setValue]=useState("Series2Level0");
  const handleSelect=(eventKey: any, event: Object)=>{
    console.log(eventKey);
    setValue(eventKey)
  }

  return (
    <div className="App">
      <DropdownButton
      title="Select Series"
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
              {/* <Dropdown.Item eventKey="Series0">Series 0</Dropdown.Item>
              
              <Dropdown.Item eventKey="Series1">Series 1</Dropdown.Item>
              <Dropdown.Item eventKey="Series2">Series 2</Dropdown.Item>
              <Dropdown.Item eventKey="Series3">Series 3</Dropdown.Item>
              <Dropdown.Item eventKey="Series4">Series 4</Dropdown.Item>
              <Dropdown.Item eventKey="Series5">Series 5</Dropdown.Item>
              <Dropdown.Item eventKey="Series6">Series 6</Dropdown.Item>
              <Dropdown.Item eventKey="Series7">Series 7</Dropdown.Item>
              <Dropdown.Item eventKey="Series8">Series 8</Dropdown.Item>
              <Dropdown.Item eventKey="Series9">Series 9</Dropdown.Item> */}
              <Dropdown.Item eventKey="Series2Level0">Series 2level 0</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Series2Level1">Series 2level 1</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level2">Series 2level 2</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level3">Series 2level 3</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level4">Series 2level 4</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level5">Series 2level 5</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level6">Series 2level 6</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level7">Series 2level 7</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level8">Series 2level 8</Dropdown.Item>
              <Dropdown.Item eventKey="Series2Level9">Series 2level 9</Dropdown.Item>
      </DropdownButton>
      <header className="App-header">
          {/* { value == "Series0" && <CandleStick series={series0} title="Series0"></CandleStick> }
          { value == "Series1" && <CandleStick series={series1} title="Series1"></CandleStick> }
          { value == "Series2" && <CandleStick series={series2} title="Series2"></CandleStick> }
          { value == "Series3" && <CandleStick series={series3} title="Series3"></CandleStick> }
          { value == "Series4" && <CandleStick series={series4} title="Series4"></CandleStick> }
          { value == "Series5" && <CandleStick series={series5} title="Series5"></CandleStick> }
          { value == "Series6" && <CandleStick series={series6} title="Series6"></CandleStick> }
          { value == "Series7" && <CandleStick series={series7} title="Series7"></CandleStick> }
          { value == "Series8" && <CandleStick series={series8} title="Series8"></CandleStick> }
          { value == "Series9" && <CandleStick series={series9} title="Series9"></CandleStick> } */}
          { value == "Series2Level0" && <CandleStick series={series_2level_0} width={[2,2,1]} title="Series 2Level 10%"></CandleStick> }
          { value == "Series2Level1" && <CandleStick series={series_2level_1} width={[2,2,1]} title="Series 2Level 20%"></CandleStick> }
          { value == "Series2Level2" && <CandleStick series={series_2level_2} width={[2,2,1]} title="Series 2Level 30%"></CandleStick> }
          { value == "Series2Level3" && <CandleStick series={series_2level_3} width={[2,2,1]} title="Series 2Level 40%"></CandleStick> }
          { value == "Series2Level4" && <CandleStick series={series_2level_4} width={[2,2,1]} title="Series 2Level 50%"></CandleStick> }
          { value == "Series2Level5" && <CandleStick series={series_2level_5} width={[2,2,1]} title="Series 2Level 60%"></CandleStick> }
          { value == "Series2Level6" && <CandleStick series={series_2level_6} width={[2,2,1]} title="Series 2Level 70%"></CandleStick> }
          { value == "Series2Level7" && <CandleStick series={series_2level_7} width={[2,2,1]} title="Series 2Level 80%"></CandleStick> }
          { value == "Series2Level8" && <CandleStick series={series_2level_8} width={[2,2,1]} title="Series 2Level 90%"></CandleStick> }
          { value == "Series2Level9" && <CandleStick series={series_2level_9} width={[2,2,1]} title="Series 2Level 95%"></CandleStick> }
       </header>
    </div>
    // <div className="App">
    //   <header className="App-header">
      // <CandleStick series={series}></CandleStick>
    //   </header>
    // </div>
  );
}

export default App;


