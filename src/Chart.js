import React from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import './App.js'
import './Charts.css'
import { makeRequest } from './DailyChartAPI.js';

class Chart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            plotData: [],
            min: Number,
            max: Number,
        }

    }

    fetchStock = async () => {

        const dataPoints = [];

        const data = await makeRequest(this.props.setTicker).catch(error => {
            console.log("ERROR: " + error.message);
        })

        ///https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo
        for (var key in data.data[`Time Series (5min)`]) {
            dataPoints.push({
                x: new Date(key),
                y: Number(data.data[`Time Series (5min)`][key]['4. close'])
            });

        }

        this.setState({
            plotData: dataPoints
        });

        this.getMinMax(this.state.plotData)
        this.processData(this.state.plotData)


    }

    componentDidMount() {
        this.fetchStock();
    }

    getMinMax = (myArray) => {
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        for (var i = myArray.length - 1; i >= 0; i--) {
            tmp = myArray[i].y;
            if (tmp < lowest) lowest = tmp;
            if (tmp > highest) highest = tmp;
        }

        this.setState({
            max: highest,
            min: lowest,
        })
    }

    processData = (arr) => {

        var today = new Date()

        const removePrevDayData = arr.filter((date) => this.date_diff_indays(today, date.x) === -1);

        this.setState({plotData:removePrevDayData})
    
    }

    date_diff_indays = (date1, date2) => {
        var dt1 = new Date(date1);
        var dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }



    render() {

        return (

            <div className="container">

                <CanvasJSChart
                    options={{

                        backgroundColor: '#1D2126',
                        animationEnabled: true,
                        exportEnabled: true,
                        zoomEnabled: true,

                        axisY: {
                            minimum: this.state.min / 1.01,
                            maximum: this.state.max * 1.01,
                            labelFontColor: 'white',
                            prefix: "$",
                            crosshair: {
                                enabled: false,
                                snapToDataPoint: true
                            }
                        },
                        axisX: {
                            labelFontColor: 'white',
                            crosshair: {
                                enabled: true,
                                snapToDataPoint: true
                            },

                            intervalType: "hour",
                            valueFormatString: "hh:mm TT",

                        },

                        data: [{
                            type: 'line',
                            yValueFormatString: "$#,###.00",
                            xValueType: "dateTime",
                            xValueFormatString: "MMM DD, YYYY hh:mm TT",
                            dataPoints: this.state.plotData,
                        }]

                    }}

                />


            </div>


        )
    };

}


export default Chart;