import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactApexCharts from 'react-apexcharts'
import './style.css';


interface AppProps { }
interface AppState {
  name: string;
}

const opts: ApexCharts.ApexOptions = {
	chart: {
    stacked: true,
		stackType: '100%'
		,toolbar: {
			show: false
		}
		//,parentHeightOffset: 1
    ,sparkline: {
      enabled: false
    }
	}
  ,plotOptions: {
      bar: {
         horizontal: true
          ,barHeight: '100'
          //,endingShape: 'rounded'
      }
  }
  

  /*
  ,title: {
    text: 'sdf'
}
  stroke: {
      width: 1,
      colors: '#fff'
  },

  xaxis: {
      categories: ['']
      ,axisBorder: {
        show: false
      }
      ,labels: {
        show: false
        ,maxHeight: 0
      }
      ,crosshairs:{
        position: ''
      }
  },

  tooltip: {
    enabled: false,
          y: {
              formatter: function(val) {
              return val+''
          }
      }
  },
  fill: {
      opacity: 1
      
  },
  */
  ,legend: {
      position: 'top'
      ,horizontalAlign: 'left'
      ,floating: false
      //,offsetX: 10
      
  }/*
,grid: {
		show: false
	}*/
 }

class Line extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <ReactApexCharts type='bar' height={160} options={opts} series={[{name:'EOS',data:[234]}
        ,{name:'BCH',data:[2334]},{name:'USD',data:[1234]}]} />
        <div background-color= 'red' >Next paragraph</div>
      </div>
    );
  }
}


// render(<App />, document.getElementById('root'));

export default Line;
