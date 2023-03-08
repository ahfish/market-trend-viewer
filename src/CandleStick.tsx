import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactApexChart from 'react-apexcharts'
import './CandleStick.css'
// import series from './CandleStickData_second_level';
import series from './CandleStickData_2';




export interface CandleStickProp {
  series : ApexAxisChartSeries,
  title : string,
  width? : number | number[]
}


export class CandleStick extends React.Component<CandleStickProp> {
  opts: ApexCharts.ApexOptions = {}

    constructor(props: CandleStickProp) {
        super(props);
        this.state = {
        };

        this.opts = {
          plotOptions: {
            bar: {
              columnWidth: '20%',
            }
          },
          chart: {
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
    }


    render() {
        return (
            <div className="CandleStick">
                <header className="CandleStick-header">
                <div id="chart">
                    <ReactApexChart options={this.opts} series={this.props.series} height={890} width={1900} title="Name" />
                </div>
                <div id="html-dist"></div>
                </header>
            </div>
        );
    }
}

// export default CandleStick;