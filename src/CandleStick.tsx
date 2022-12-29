import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactApexChart from 'react-apexcharts'
import './CandleStick.css'
import series from './CabdkeStickData';


const opts: ApexCharts.ApexOptions = {
        chart: {
            type: 'candlestick'
        },
        title: {
            text: 'CandleStick Chart',
            align: 'left'
        },
        stroke: {
            width: [3, 1]
          },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                  colors: 'white',
                  fontSize: '12px'
                },
              }
        },
        yaxis: {
            tickAmount: 10,
             max: 172,
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
        },
        tooltip: {
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





class CandleStick extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }



    render() {
        return (
            <div className="CandleStick">
                <header className="CandleStick-header">
                <div id="chart">
                    <ReactApexChart options={opts} series={series} height={1000} width={2800} />
                </div>
                <div id="html-dist"></div>
                </header>
            </div>
        );
    }
}

export default CandleStick;