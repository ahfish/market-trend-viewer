// import React from 'react';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState, useEffect } from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


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


export interface MarketData {
  id : number,
  intervalMin : number,
  code : string,
  high: number,
  low: number,
  close: number,
  open: number,
  time: Date
}

export interface Trend {
  direction : string,
  intervalMin : number,
  code : string,
  rule : string | undefined,
  start: Date
  end: Date
  lastMarketPrice : MarketData
  firstMarketPrice : MarketData
  trends : Array<Trend> | undefined
}


export interface SeriesRawData {
  allMarketData : Array<MarketData> | undefined
  firstLevelTrend : Array<Trend> | undefined
  secondLevelTrend : Array<Trend> | undefined
}

export interface LineData{
  x: any;
  y: any;
  fill?: ApexFill;
  fillColor?: string;
  strokeColor?: string;
  meta?: any;
  goals?: any;
  barHeightOffset?: number;
  columnWidthOffset?: number;
}
export interface LineDataWraper {
  name?: string
  type?: string
  color?: string
  data:
    | (number | null)[]
    | LineData[]
    | [number, number | null][]
    | [number, (number | null)[]][]
    | number[][];
}



export interface LineCandleStick {
  x : any;
  y : Array<number>;
}

declare global {
  export interface Date {
    toYYYMMDD() : string
  }
}
Date.prototype.toYYYMMDD = function(): string {  
  const year = this.getFullYear()
  const month = String(this.getMonth() + 1).padStart(2, '0')
  const day = String(this.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
 }   

 

function App() {  
  let [seriesRawData,setSeriesRawData]=useState<SeriesRawData>();
  const [series,setSeries]=useState<any>();
  const [requestType, setrequestType] = useState(["CANDLE_STICK", "FIRST_LEVEL_TREND", "SECOND_LEVEL_TREND"]);
  const [urlTo, setUrlTo] = useState<string>("PROGRESSING");
  const [loading,setLoading]=useState<boolean>(false);
  const [title,setTitle]=useState<string>("");
  const [value,setValue]=useState<string>("Series2Level0");
  const [from,setFrom]=useState<Date>();
  const [to,setTo]=useState<Date>(new Date());
  const [resolution,setResolution]=useState<string>("FIFTEEN_MINUTE");
  const [symbol,setSymbol]=useState<string>("GBPJPY");
  const [level,setLevel]=useState<string>("90");
  const [message,setMessage]=useState<string>("");
  const handleSelect=(eventKey: any, event: Object)=>{
    console.log(eventKey);
    setValue(eventKey)
  }

  const handleFrom=(eventKey: any, event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    setFrom(eventKey)
  }

  const handleTo=(eventKey: any, event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    setTo(eventKey)
  }

  const handleResolution=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    console.log(event.currentTarget.value)
    setResolution(event.currentTarget.value)
  }
  
  const handleLevel=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    console.log(event.currentTarget.value)
    setLevel(event.currentTarget.value)
  }


  const handleUrlTo=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    console.log(event.currentTarget.value)
    setUrlTo(event.currentTarget.value)
  }

  const handleRequestType=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    console.log(event.currentTarget.selectedOptions)
    let selectedOptions : HTMLCollection = event.currentTarget.selectedOptions
    let newRequestType : string[] = []
    for ( let i = 0 ; i < selectedOptions.length; i++) {
      newRequestType.push(selectedOptions[i].textContent!!)
    }
    setrequestType(newRequestType)
    //  event.currentTarget.selectedOptions.map( item => { item.value} )
    // setLevel(event.currentTarget.value)
  }

  const handleSymbol=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    console.log(event.currentTarget.value)
    setSymbol(event.currentTarget.value)
  }  

  
  const useHandleSubmit=(e: React.FormEvent)=>{
    const name = `series = ${series}, from = ${from?.toYYYMMDD()} to = ${to.toYYYMMDD()}, resolution = ${resolution}, level = ${level}, requestType = ${requestType}`
    setLoading(true)
    if ( symbol && resolution && from && to && level && requestType && requestType.length > 0) {
      let requestTypeString = requestType.toString()
      setValue("")
      setTitle(name)
      console.log(e);
      let url = `http://127.0.0.1:8081/trend/progressing/analyse/${symbol}/on/${resolution}/from/${from?.toYYYMMDD()}/to/${to?.toYYYMMDD()}/with/${level}/for/${requestTypeString}`
      if ( urlTo === "NON-PROGRESSING" ) {
        url = `http://127.0.0.1:8081/trend/analyse/${symbol}/on/${resolution}/from/${from?.toYYYMMDD()}/to/${to?.toYYYMMDD()}/with/${level}/for/${requestTypeString}`
      }
      console.log(`calling curl -X 'GET' '${url}'  -H 'accept: application/json' -o test.json `)
      axios.get<SeriesRawData>(url, {
        headers : {
          'Access-Control-Allow-Origin': true,
          'accept': 'application/json'
        }
      })
      .then( response => {
        // console.log(response)
        setSeriesRawData(response.data)
        seriesRawData = response.data
        // response.data.allMarketData?.forEach ( item => {
        //   console.log(item.time)
        // })
        // console.log(response.data.allMarketData)
        // seriesRawData
        console.log(seriesRawData)
        let series : ApexAxisChartSeries = toApexAxisChartSeries(seriesRawData)??[]
         setValue("done")
         setSeries(series)
         setLoading(false)
      })
    } else {
      setMessage(`all field cannot be empty, series = ${series}, from = ${from?.toYYYMMDD()} to = ${to.toYYYMMDD()}, resolution = ${resolution}, level = ${level}`)
      setValue("alert")
    }

    
    // setFrom(eventKey)s
  }

  const toLineData = ( raw : Array<Trend> | undefined, nameStr : string ) : LineDataWraper | undefined => {
    if ( raw ) {
      let result : LineData[]  = raw?.map( trend => {
        if ( trend.direction == "BEARISH" ) 
          return { x : trend.start, y : trend.firstMarketPrice.high }
        else 
        return { x : trend.start, y : trend.firstMarketPrice.low }
      })?? []
      return {
        name: nameStr,
        type: 'line',
        data: result
      };
    } else {
      return undefined
    }
  }

  const toLineCandleStick = ( raw : Array<MarketData> | undefined, nameStr : string) : LineDataWraper | undefined => {
    if ( raw ) {
      let result : LineData[]  = raw?.map( marketData => {
        return { 
          x : marketData.time,
          y : [marketData.open, marketData.high, marketData.low, marketData.close] 
        }
      })?? []
      return {
        name: nameStr,
        type: 'candlestick',
        data: result
      };
    } else {
      return undefined
    }

  }


  const toApexAxisChartSeries = (raw : SeriesRawData) : ApexAxisChartSeries | undefined=> {
    let firstLevel = toLineData(raw.firstLevelTrend, "FirstLevel")
    let secondLevel = toLineData(raw.secondLevelTrend, "SecondLevel")
    let candleStick = toLineCandleStick(raw.allMarketData, "CandleStick")
    const result : ApexAxisChartSeries = [ ]
    if ( firstLevel ) result.push(firstLevel)
    if ( secondLevel ) result.push(secondLevel)
    if ( candleStick ) result.push(candleStick)
    return result
  }

  // useEffect(() => {
  //   if (loading) {
  //   }
  // }, [loading]);


  let series0 : ApexAxisChartSeries = []


  return (
    <div className="App">
      
      <Form >
      <InputGroup size="sm" className="mb-1">
        <Stack direction="horizontal" gap={5} className="App">
          <div>
              <Form.Control as="select" multiple value={requestType} onChange={handleRequestType}>
                <option value="CANDLE_STICK" selected >CANDLE_STICK</option>
                <option value="FIRST_LEVEL_TREND" selected >FIRST_LEVEL_TREND</option>
                <option value="SECOND_LEVEL_TREND" selected >SECOND_LEVEL_TREND</option>
            </Form.Control>       
          </div>
          <div>
            <Stack gap={2} className="App">
              <div>
                <Stack direction="horizontal" gap={0} className="App">
                  
                      <InputGroup.Text id="basic-addon1" >Trend Analysis</InputGroup.Text>
                      <Form.Control aria-label="Symbol" onBlur={handleSymbol} aria-describedby="basic-addon1"
                      />    
                      <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
                      <div>
                        <DatePicker onChange={handleFrom} selected={from}  dateFormat="yyyy-MM-dd" aria-describedby="basic-addon1" />
                      </div>
                      <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                      <div>
                        <DatePicker onChange={handleTo} selected={to}  dateFormat="yyyy-MM-dd"  />
                      </div>
                  
                  </Stack>
                  <Stack direction="horizontal" gap={5} className="App">
                  <InputGroup.Text >Interval</InputGroup.Text>
                  <Form.Select aria-label="Interval"  defaultValue={resolution} onChange={handleResolution}>
                      
                  <option value="ONE_MINUTE">ONE_MINUTE</option>
                  <option value="THREE_MINUTE">THREE_MINUTE</option>
                  <option value="FIVE_MINUTE">FIVE_MINUTE</option>
                  <option value="FIFTEEN_MINUTE">FIFTEEN_MINUTE</option>
                  <option value="THIRTY_MINUTE">THIRTY_MINUTE</option>
                  <option value="ONE_HOUR">ONE_HOUR</option>
                  <option value="DAY">DAY</option>
                  <option value="WEEK">WEEK</option>
                </Form.Select>
                <InputGroup.Text>Level</InputGroup.Text>
              <Form.Select aria-label="Level" defaultValue={level} onChange={handleLevel}>
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
                <Form.Select aria-label="urlTo" defaultValue={urlTo} onChange={handleUrlTo}>
                  <option value="NON-PROGRESSING">NON-PROGRESSING</option>
                  <option value="PROGRESSING">PROGRESSING</option>
                </Form.Select>
                      
                      <Button variant="outline-secondary" id="button-addon1" onClick={useHandleSubmit}>
                      {loading ? 'Loading…' : 'Send'}
                      </Button>

                  

                </Stack>
              </div>
              </Stack>
          </div>
          </Stack>
          </InputGroup>          
      </Form>
      { 
        value == "alert" && 
            <Alert key="danger" variant="danger">
              {message}
            </Alert>
      } 
      <header className="App-header">
      { value == "done" && <CandleStick series={series} width={[2,2,1]} title={title}></CandleStick> }
      </header>
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
          { value == "Series2Level0" && <CandleStick series={ } width={[2,2,1]} title="Series 2Level 10%"></CandleStick> }
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


