import { CanvasJSChart } from 'canvasjs-react-charts';
import React from 'react'
import { makeRequest } from './CandleChartAPI.js';
import './App.js'

class CandleChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            max: Number,
            min: Number,
            stockData: [],
        }

    }


    makeReq = async () => {

        const res = await makeRequest(this.props.setTicker).catch(error => {
            console.log("ERROR: " + error.message);
        })

        this.formatStockData(res.data["Time Series (Daily)"]);
    
    }


    formatStockData = (data) => {

        const dataPoints1 = [];
        const dataPoints2 = [];


        for (var key in data) {

            dataPoints1.push({

                x: new Date(key),
                y: [Number(data[key]['1. open']),
                Number(data[key]['2. high']),
                Number(data[key]['3. low']),
                Number(data[key]['4. close'])
                ]
            });

            dataPoints2.push({
                x: new Date(key),
                y: Number(data[key]['4. close'])
            })

        }

        this.setState({
            stockData: dataPoints1,
        })

        this.getMinMax(this.state.stockData);

    }

    componentDidMount() {

        this.makeReq();

    }


    getMinMax = (myArray) => {
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp1;
        var tmp2;
        for (var i = myArray.length - 1; i >= 0; i--) {
            tmp1 = myArray[i].y[1];
            if (tmp1 > highest) highest = tmp1;

            tmp2 = myArray[i].y[2];
            if (tmp2 < lowest) lowest = tmp2;
        }

        this.setState({
            max: highest,
            min: lowest,
        })

    }


    render() {

        return (


            <div>
                <CanvasJSChart
                    options={{

                        backgroundColor: '#1D2126',
                        animationEnabled: true,
                        exportEnabled: true,
                        zoomEnabled: true,

                        axisX: {
                            labelFontColor: 'white',

                            crosshair: {
                                enabled: true,
                                snapToDataPoint: true,
                            },

                            labelFontColor: "transparent",
                            scaleBreaks: {
                                spacing: 0,
                                fillOpacity: 0,
                                lineThickness: 0,
                                customBreaks: this.state.stockData.reduce((breaks, value, index, array) => {

                                    if (index === 0) return breaks;

                                    const currentDataPointUnix = Number(new Date(value.x));
                                    const prevDataPointUnix = Number(new Date(array[index - 1].x));

                                    const oneDayInMs = 8640000;

                                    const diff = prevDataPointUnix - currentDataPointUnix;

                                    return diff === oneDayInMs
                                        ? breaks
                                        : [
                                            ...breaks,
                                            {
                                                startValue: currentDataPointUnix,
                                                endValue: prevDataPointUnix - oneDayInMs
                                            }
                                        ]

                                }, [])
                            },

                        },

                        axisY: {
                            minimum: this.state.min / 1.02,
                            maximum: this.state.max * 1.02,
                            labelFontColor: 'white',
                            prefix: "$",

                            crosshair: {
                                enabled: false,
                                snapToDataPoint: true,
                            }
                        },

                        data: [{
                            type: 'candlestick',
                            yValueFormatString: "$#,###.00",
                            risingColor: "green",
                            fallingColor: "red",
                            dataPoints: this.state.stockData,
                        }],


                    }}

                />


                <div>
            </div>
        </div>
        )
    }


}

export default CandleChart
