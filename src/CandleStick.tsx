// import React, { Component } from 'react';
import { render } from 'react-dom';
import { LegacyRef, createRef } from 'react';
import ReactApexChart from 'react-apexcharts'
import './CandleStick.css'
import React, { Component, useState, useEffect, useRef, RefObject } from "react";
import ApexCharts from 'apexcharts'

// import series from './CandleStickData_second_level';




export interface CandleStickProp {
  series : ApexAxisChartSeries,
  title : string,
  width? : number | number[]
}


export class CandleStick extends React.Component<CandleStickProp> {
  opts: ApexCharts.ApexOptions = {}

  private reactApexChart = createRef<ReactApexChart>();
  private series : ApexAxisChartSeries | undefined
  // private chart = <ReactApexChart id="ReactApexChart" options={this.opts} series={this.props.series} height={890} width={1900} title="Name" ref={this.reactApexChart}/>
  // reactApexChart = useRef<ReactApexChart>()

    constructor(props: CandleStickProp) {
        super(props);
        this.series = props.series;

        this.opts = {
          plotOptions: {
            bar: {
              columnWidth: '20%',
            }
          },
          chart: {
              id: 'ReactApexChart',
              type: 'candlestick',
              // width: 1000,
              zoom: {
                enabled: true,
                type: 'xy'
              }
          },
          title: {
              text: props.title,
              align: 'left'
          },
          stroke: {
              width: props.width ?? [2,1]
            },
          xaxis: {
              type: 'datetime',
              
              // type: "numeric",
              tickAmount: 'dataPoints',
              labels: {
                  datetimeUTC: false,
                  show: true,
                  style: {
                    colors: 'white',
                    fontSize: '12px'
                  }
                  // formatter: function (value) {
                  //   return "";
                }
          },
          yaxis: 
            {
              tickAmount: 10,
              //  max: 172,
              tooltip: {
                  enabled: true
              },
              labels: {
                  show: true,
                  style: {
                    colors: 'white',
                    fontSize: '12px'
                  },
                }            
          }
          ,
          tooltip: {
              x: {
                format: 'yyyy-MM-dd HH:mm:ss'
              },
              shared: true,
              custom: [function({seriesIndex, dataPointIndex, w}) {
                return w.globals.series[seriesIndex][dataPointIndex]
              }, function({ seriesIndex, dataPointIndex, w }) {
                var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
                var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                return (
                   "O:" + o + "<br/>" +
                   "H:" + h + "<br/>" +
                   "L:" + l + "<br/>" +
                   "C:" + c + "<br/>"
                )
              }]
            }
          }
        this.state = {
          opts: this.opts,
          series: this.props.series
        };

    }

    public getReactApexChart() : ReactApexChart | undefined {
      //  return this.chart.;
      return undefined;
    }

    public hideSeries(name : string) {
      console.log(`hiding target ${name}`)
      // this.reactApexChart.current?
      //var reactApexChart : ReactApexChart = this.getReactApexChart();
      // let id = reactApexChart.props?.options?.chart?.id
      // console.log(`hiding target ${name} for ${id}`)
      
      let id : string = this.reactApexChart.current?.props?.options?.chart?.id!!
      ApexCharts.getChartByID(id)?.hideSeries(name);
    }

    public updateSeries(series : ApexAxisChartSeries) {
      console.log(`updateSeries`)
      this.series = series;
      // this.setState(
      //   {series: series}
      // )
      // this.props.series = series
      //var reactApexChart : ReactApexChart = this.getReactApexChart();
      let id : string = this.reactApexChart.current?.props?.options?.chart?.id!!
      ApexCharts.getChartByID(id)?.updateSeries(series);
      // console.log(`hiding target ${name} for ${id}`)
      // ApexCharts.getChartByID("ReactApexChart")?.hideSeries(name)
    }

    render() {
        return (
            <div className="CandleStick">
                <header className="CandleStick-header">
                <div id="chart">
                <ReactApexChart id="ReactApexChart" options={this.opts} series={this.series} height={890} width={1900} title="Name" ref={this.reactApexChart}/>
                </div>
                <div id="html-dist"></div>
                </header>
            </div>
        );
    }
}

// export default CandleStick;