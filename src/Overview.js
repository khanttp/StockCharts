import React from 'react'
import './App.js'
import './Charts.css'
import { makeRequest } from './OverviewAPI.js';
import { Col, Row, Container } from "react-bootstrap";
import './Overview.css'

class Overview extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            companyName: "",
            descp: "",

            overviewData: {},
        }
    }




    makeReq = async () => {
        const data = await makeRequest(this.props.setTicker).catch(error => {
            console.log("ERROR: " + error.message);
        })
    
        this.getInfo(data.data)
    
    }

    getInfo = (data) => {
        var name = data["Name"]
        var desc = data["Description"]


        this.setState({
            companyName: name,
            descp: desc,
            overviewData: data
        })

    }


    componentDidMount() {
        this.makeReq();
    }


    render() {
        return (

            <div>

                <h2>{this.state.companyName} (${this.props.setPrevTicker})</h2>

                <p>{this.state.descp}</p>

                <br></br>


                <Container fluid>
                    <Row >

                        <Col xs="auto" id="lbs">
                            <p>50d MA</p>
                            <p>200d MA</p>
                            <p>52Wk High</p>
                            <p>52Wk Low</p>
                            <p>Market Cap</p>
                            <p>Dividend/share</p>

                        </Col>

                        <Col xs="auto" id="data">
                            <p>{this.state.overviewData['50DayMovingAverage']}</p>
                            <p>{this.state.overviewData['200DayMovingAverage']}</p>
                            <p>{this.state.overviewData['52WeekHigh']}</p>
                            <p>{this.state.overviewData['52WeekLow']}</p>
                            <p>{this.state.overviewData['MarketCapitalization']}</p>
                            <p>{this.state.overviewData['DividendPerShare']}</p>

                        </Col>

                        <Col xs="auto" id="lbs">
                            <p>Dividend Yield</p>
                            <p>Short % Float</p>
                            <p>Short % Outstanding</p>
                            <p>Short Ratio</p>
                            <p>Target Price</p>
                            <p>Diluted EPSTTM</p>
                        </Col>

                        <Col xs="auto" id="data">
                            <p>{this.state.overviewData['DividendYield']}</p>
                            <p>{this.state.overviewData['ShortPercentFloat']}</p>
                            <p>{this.state.overviewData['ShortPercentOutstanding']}</p>
                            <p>{this.state.overviewData['ShortRatio']}</p>
                            <p>{this.state.overviewData['AnalystTargetPrice']}</p>
                            <p>{this.state.overviewData['DilutedEPSTTM']}</p>

                        </Col>


                        <Col xs="auto" id="lbs">
                            <p>Qtrly RG YOY</p>
                            <p>Profit Margin</p>
                            <p>Shares Float</p>
                            <p>Shares Outstanding</p>
                            <p>Shares Short</p>
                            <p>Payout Ratio</p>

                        </Col>

                        <Col xs="auto" id="data">

                            <p>{this.state.overviewData['QuarterlyRevenueGrowthYOY']}</p>
                            <p>{this.state.overviewData['ProfitMargin']}</p>
                            <p>{this.state.overviewData['SharesFloat']}</p>
                            <p>{this.state.overviewData['SharesOutstanding']}</p>
                            <p>{this.state.overviewData['SharesShort']}</p>
                            <p>{this.state.overviewData['PayoutRatio']}</p>

                        </Col>


                        <Col xs="auto" id="lbs">
                            <p>Qtrly EG YOY</p>
                            <p>P/E</p>
                            <p>P/EG</p>
                            <p>Payout Ratio</p>
                            <p>Insider %</p>
                            <p>Institutions %</p>

                        </Col>

                        <Col xs="auto" id="data">
                            <p>{this.state.overviewData['QuarterlyEarningsGrowthYOY']}</p>
                            <p>{this.state.overviewData['PERatio']}</p>
                            <p>{this.state.overviewData['PEGRatio']}</p>
                            <p>{this.state.overviewData['PayoutRatio']}</p>
                            <p>{this.state.overviewData['PercentInsiders']}</p>
                            <p>{this.state.overviewData['PercentInstitutions']}</p>

                        </Col>


                    </Row>
                </Container>

            </div>


        );
    }

}


export default Overview;