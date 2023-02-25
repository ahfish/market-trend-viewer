// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';
import FormControl from "react-bootstrap/FormControl";
import DropDownSearch from './DropDownSearch';
import DatePicker from 'react-datepicker';

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
// import series_2level_0 from './CandleStickData_2level_0';
// import series_2level_1 from './CandleStickData_2level_1';
// import series_2level_2 from './CandleStickData_2level_2';
// import series_2level_3 from './CandleStickData_2level_3';
// import series_2level_4 from './CandleStickData_2level_4';
// import series_2level_5 from './CandleStickData_2level_5';
// import series_2level_6 from './CandleStickData_2level_6';
// import series_2level_7 from './CandleStickData_2level_7';
// import series_2level_8 from './CandleStickData_2level_8';
// import series_2level_9 from './CandleStickData_2level_9';
import { CandleStick, CandleStickProp } from "./CandleStick";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';  


function App() {
  const [value,setValue]=useState<string>("Series2Level0");
  const handleSelect=(eventKey: any, event: Object)=>{
    console.log(eventKey);
    setValue(eventKey)
  }



  return (
    <div className="App">
      <Form>
        <Stack direction="horizontal" gap={5}>
        <InputGroup size="sm" className="mb-1">
            <InputGroup.Text id="basic-addon1">Trend Analysis</InputGroup.Text>
            <Form.Control placeholder="Symbol" aria-label="Symbol" 
              aria-describedby="basic-addon1"
            />
            <DatePicker onChange={}/>
            <Form.Select aria-label="Interval">
              <option value="ONE_MINUTE">ONE_MINUTE</option>
              <option value="THREE_MINUTE">THREE_MINUTE</option>
              <option value="FIVE_MINUTE">FIVE_MINUTE</option>
              <option value="FIFTEEN_MINUTE">FIFTEEN_MINUTE</option>
              <option value="THIRTY_MINUTE">THIRTY_MINUTE</option>
              <option value="ONE_HOUR">ONE_HOUR</option>
              <option value="DAY">DAY</option>
              <option value="WEEK">WEEK</option>
            </Form.Select>

          <Form.Select aria-label="Level">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="95">95</option>
              <option value="99">99</option>
            </Form.Select>
            <Button variant="outline-secondary" id="button-addon1">
              Send
            </Button>
        </InputGroup>          
          <DropDownSearch/>
        </Stack>
      </Form>

      {/* <DropdownButton
      title="Select Series"
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
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
    </div> */}
    {/* // <div className="App">
    //   <header className="App-header">
      // <CandleStick series={series}></CandleStick>
    //   </header>
    // </div> */}
    </div>
  );
}

export default App;


