// import React from 'react';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState, useEffect, useRef, RefObject,createRef } from "react";
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
import { CandleStick, CandleStickProp } from "./CandleStick";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { LegacyRef } from 'react';
import ApexCharts from 'apexcharts'


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

export interface SimpleTargetLocation {
  start: Date,
  end: Date,
  startPoint: number,
  endPoint: number
}


export interface DoublePoint {
  start: Date,
  end: Date,
  targetPointValue: number,
  targetPointValueTime: Date
}


export interface Range {
  start: Date,
  end: Date,
  resistance: DoublePoint,
  support: DoublePoint
}

export interface SeriesRawData {
  allMarketData : Array<MarketData> | undefined
  firstLevelTrend : Array<Trend> | undefined
  secondLevelTrend : Array<Trend> | undefined
  highlightedTrend : Array<Trend> | undefined
  simpleTargetLocation : Array<SimpleTargetLocation> | undefined
  validDoublePoint : Array<DoublePoint> | undefined
  ranges : Array<Range> | undefined
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

  
  //  var candleStick : RefObject<CandleStick>;

  const [rangeMap,setRangeMap]=useState<Map<string, LineDataWraper[]>>(new Map<string, LineDataWraper[]>());
  const [ranges,setRanges]=useState<Array<string>>([]);
  const [lineMap,setLineMap]=useState<Map<string, LineDataWraper>>(new Map<string, LineDataWraper>());
  const [doublePointMap,setDoublePointMap]=useState<Map<string, LineDataWraper>>(new Map<string, LineDataWraper>());
  const candleStickRef = createRef<CandleStick>();
  let [seriesRawData,setSeriesRawData]=useState<SeriesRawData>();
  const [series,setSeries]=useState<ApexAxisChartSeries>([]);
  const [targetLocationDetails,setTargetLocationDetails]=useState<Array<string>>([]);
  const [doublePointDetails,setDoublePointDetails]=useState<Array<string>>([]);
  // const candleStickRef =useRef<CandleStick>(null);
  const [requestType, setrequestType] = useState(["CANDLE_STICK", "FIRST_LEVEL_TREND", "SECOND_LEVEL_TREND","TARGET_LOCATION","SIMPLE_TARGET_LOCATION","DOUBLE_POINT", "RANGE", "HIGHLIGHTED_TREND"]);
  const [urlTo, setUrlTo] = useState<string>("PROGRESSING");
  const [loading,setLoading]=useState<boolean>(false);
  const [title,setTitle]=useState<string>("");
  const [value,setValue]=useState<string>("Series2Level0");
  const [from,setFrom]=useState<Date>(new Date("2024-12-01"));
  const [to,setTo]=useState<Date>(new Date("2026-01-01"));
  const [resolution,setResolution]=useState<string>("ONE_HOUR");
  const [symbol,setSymbol]=useState<string>("EURAUD");
  const [level,setLevel]=useState<string>("90");
  const [rangeMatchPercentile,setRangeMatchPercentile]=useState<string>("50");
  const [message,setMessage]=useState<string>("");
  let candleStick = <CandleStick series={series} width={[2,2,1]} title={title} ref={candleStickRef}></CandleStick> 
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

  const handleTargetLocationDetails=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    // console.log(event.currentTarget.value)
    let selectedOptions : HTMLCollection = event.currentTarget.selectedOptions
    if ( series.length >= 3) {
      for ( let i = 0; i < series.length; i++) {
        if ( series[i].name?.startsWith("target_") ) {
          series.splice(i);
        }
        
      }
    }
    for ( let i = 0 ; i < selectedOptions.length; i++) {
      const lineData = lineMap.get(selectedOptions[i].textContent!!);
      series.push(lineData!!)

      // newRequestType.push(selectedOptions[i].textContent!!)
    }
    
    // const newSeries : ApexAxisChartSeries = [
    //   // ,
    //   // series.filter(s => s.name?.startsWith("SecondLevel")),
    //   // series.filter(s => s.name?.startsWith("CandleStick"))
    // ];
    
    setSeries(series)
    // candleStick.props.series.push(lineData!!)
    candleStickRef.current?.updateSeries(series);
  }


  const handleDoublePointDetails=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    // console.log(event.currentTarget.value)
    let selectedOptions : HTMLCollection = event.currentTarget.selectedOptions
    if ( series.length >= 3) {
      for ( let i = 0; i < series.length; i++) {
        if ( series[i].name?.startsWith("doublePoint_") ) {
          series.splice(i);
        }
        
      }
    }
    for ( let i = 0 ; i < selectedOptions.length; i++) {
      const doubePointData = doublePointMap.get(selectedOptions[i].textContent!!);
      series.push(doubePointData!!)
    }

    setSeries(series)
    candleStickRef.current?.updateSeries(series);
  }  

  const handleRange =(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    // console.log(event.currentTarget.value)
    let selectedOptions : HTMLCollection = event.currentTarget.selectedOptions
    if ( series.length >= 3) {
      for ( let i = 0; i < series.length; i++) {
        if ( series[i].name?.startsWith("range_") ) {
          series.splice(i);
        }
        
      }
    }
    for ( let i = 0 ; i < selectedOptions.length; i++) {
      const range = rangeMap.get(selectedOptions[i].textContent!!);
      series.push(range!![0])
      series.push(range!![1])
    }

    setSeries(series)
    candleStickRef.current?.updateSeries(series);
  }  

  const handleRangeMatchPercentile=(event: React.SyntheticEvent<any>)=>{
    // console.log(eventKey);
    console.log(event.currentTarget.value)
    setRangeMatchPercentile(event.currentTarget.value)
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
      setTargetLocationDetails([]);
      setTitle(name);
      console.log(e);
      let url = `http://127.0.0.1:8081/trend/progressing/analyse/${symbol}/on/${resolution}/from/${from?.toYYYMMDD()}/to/${to?.toYYYMMDD()}/with/${level}/and/${rangeMatchPercentile}/for/${requestTypeString}/true`
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
        let series : ApexAxisChartSeries = toApexAxisChartSeries(seriesRawData)??[]
         setValue("done")
         setSeries(series)
         setLoading(false)
         console.log(`location target size ${targetLocationDetails.length}`)
         targetLocationDetails.forEach( name => {
          console.log(`hiding ${name}`)
          // ApexCharts.getChartByID("ReactApexChart")!!.hideSeries(name)
         });
         setTargetLocationDetails(targetLocationDetails)
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

  const trend2Line = (trend : Trend | undefined ) : LineData[] => {
    if ( trend ) {
      if ( trend.direction == "BEARISH" ) {
          return [
            { x : trend.start, y : trend.firstMarketPrice.high },
            { x : trend.end, y : trend.lastMarketPrice.low }
          ]
      } else {
        return [
          { x : trend.start, y : trend.firstMarketPrice.low },
          { x : trend.end, y : trend.lastMarketPrice.high }
        ]
      }
    }
    return []
  }



  const toLineDataFromSimpleTargetLocation = ( simpleTargetLocation : SimpleTargetLocation , nameStr : string ) : LineDataWraper  => {
    return {
      name: nameStr,
      type: 'line',
      data: [ {x : simpleTargetLocation.start, y : simpleTargetLocation.startPoint }, {x : simpleTargetLocation.end, y : simpleTargetLocation.startPoint } ]      
    }
  }


  const toLineDataFromDoublePoint = ( doublePoint : DoublePoint, nameStr : string ) : LineDataWraper  => {
    return {
      name: nameStr,
      type: 'line',
      data: [ {x : doublePoint.start, y : doublePoint.targetPointValue }, {x : doublePoint.end, y : doublePoint.targetPointValue } ]      
    }
  }

  const toLineDataFromRange = ( range : Range, nameStr : string ) : LineDataWraper[]  => {
    return [{
      name: `${nameStr}_resistance`,
      type: 'line',
      data: [ 
        {x : range.start, y : range.resistance.targetPointValue }, 
        {x : range.end, y : range.resistance.targetPointValue }
      ]      
    },
    {
      name: `${nameStr}_support`,
      type: 'line',
      data: [ 
        {x : range.start, y : range.support.targetPointValue }, 
        {x : range.end, y : range.support.targetPointValue }
      ]      
    }    
    ]
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
    // let highlightedTrend = toLineData(raw.highlightedTrend, "highlightedTrend")
    let candleStick = toLineCandleStick(raw.allMarketData, "CandleStick")
    const result : ApexAxisChartSeries = [ ]
    if ( firstLevel ) result.push(firstLevel)
    if ( secondLevel ) result.push(secondLevel)

    if ( raw.highlightedTrend ) {
      raw.highlightedTrend?.forEach( (trend, index) => {
        let line : LineData[]  = trend2Line(trend)
        let highlightedTrend : LineDataWraper = {
          name: `highlightedTrend_${index}`,
          type: 'line',
          data: line          
        }
        result.push(highlightedTrend)
      })
    }
      

      // })
      // let result : LineData[]  = trend2Line(raw)
      // return {
      //   name: nameStr,
      //   type: 'line',
      //   data: result
      // };

    // if ( highlightedTrend ) result.push(highlightedTrend)
      
    if ( candleStick ) result.push(candleStick)

    lineMap.clear()
    if (raw.simpleTargetLocation?.length ?? 0 > 0 ) {
      raw.simpleTargetLocation?.forEach ( ( simpleTargetLocation, index) => {
        const name = `target_${index}_${simpleTargetLocation.start}`
        console.log(`adding target ${name}`)
        lineMap.set(name, toLineDataFromSimpleTargetLocation(simpleTargetLocation, name))
        // result.push();
        targetLocationDetails.push(name);
        
      })
    }
    setLineMap(lineMap);

    doublePointMap.clear()
    if (raw.validDoublePoint?.length ?? 0 > 0 ) {
      raw.validDoublePoint?.forEach ( ( doublePoint, index) => {
        const name = `doublePoint_${index}_${doublePoint.targetPointValueTime}_${doublePoint.start}__${doublePoint.end}`
        console.log(`adding doublePoint ${name}`)
        doublePointMap.set(name, toLineDataFromDoublePoint(doublePoint, name))
        // result.push();
        doublePointDetails.push(name);

    
      })}
    setDoublePointMap(doublePointMap);

    rangeMap.clear()
    if (raw.ranges?.length ?? 0 > 0 ) {
      raw.ranges?.forEach ( ( range, index) => {
        const name = `range_${index}_${range.start}_${range.end}`
        console.log(`adding Range ${name}`)
        rangeMap.set(name, toLineDataFromRange(range, name))
        // result.push();
        ranges.push(name);

    
      })}
    setRangeMap(rangeMap);
    
    return result
  }

  // useEffect(() => {
  //   if (loading) {
  //   }
  // }, [loading]);


  let series0 : ApexAxisChartSeries = []

  return (
    <div className="App" style={{ height: "100%", overflow: "auto", width: "100%" }}>
      
      <Form >
      <InputGroup size="sm" className="mb-1">
        <Stack direction="horizontal" gap={5} className="App">
          <div>
              <Form.Control as="select" multiple value={requestType} onChange={handleRequestType}>
                <option value="CANDLE_STICK" selected >CANDLE_STICK</option>
                <option value="FIRST_LEVEL_TREND" selected >FIRST_LEVEL_TREND</option>
                <option value="SECOND_LEVEL_TREND" selected >SECOND_LEVEL_TREND</option>
                <option value="TARGET_LOCATION" selected >TARGET_LOCATION</option>
                <option value="SIMPLE_TARGET_LOCATION" selected >SIMPLE_TARGET_LOCATION</option>
                <option value="DOUBLE_POINT" selected >DOUBLE_POINT</option>
                <option value="RANGE" selected >RANGE</option>
                <option value="HIGHLIGHTED_TREND" selected >HIGHLIGHTED_TREND</option>
            </Form.Control>       
          </div>
          <div>
            <Form.Control as="select" multiple onChange={handleTargetLocationDetails}>
              {targetLocationDetails.map( detail => <option value={detail}>{detail}</option>)}
            </Form.Control>
         </div>          
         <div>
            <Form.Control as="select" multiple onChange={handleDoublePointDetails}>
              {doublePointDetails.map( detail => <option value={detail}>{detail}</option>)}
            </Form.Control>
         </div>                   
         <div>
            <Form.Control as="select" multiple onChange={handleRange}>
              {ranges.map( detail => <option value={detail}>{detail}</option>)}
            </Form.Control>
         </div>          
          <div>
            
            <Stack gap={2} className="App">
              <div>
                <Stack direction="horizontal" gap={0} className="App">
                  
                      <InputGroup.Text id="basic-addon1" >Trend Analysis</InputGroup.Text>
                      <Form.Control aria-label="Symbol" onChange={handleSymbol} value={symbol} aria-describedby="basic-addon1"
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
                  <option value="FOUR_HOUR">FOUR_HOUR</option>
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
                <InputGroup.Text>RangeMatchPercentile</InputGroup.Text>
                <Form.Select aria-label="RangeMatchPercentile" defaultValue={rangeMatchPercentile} onChange={handleRangeMatchPercentile}>
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
          <Stack direction="vertical" gap={5} className="App">
            <header className="App-header" >
              { value == "done" && candleStick}
            </header>
           </Stack>

        </InputGroup>          
      </Form>
      { 
        value == "alert" && 
            <Alert key="danger" variant="danger">
              {message}
            </Alert>
      } 
    </div>
  );
}

export default App;


