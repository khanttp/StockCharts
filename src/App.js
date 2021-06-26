import './App.css';
import Chart from './Chart';
import React from 'react';
import './CandleChartAPI.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import Overview from './Overview';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CandleChart from './CandleChart.js';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.chart = React.createRef();
    this.candleChart = React.createRef();
    this.overview = React.createRef();


    this.state = {
      ticker: "IBM",
      prevTicker: "IBM",
      formSubmitted: false,
      activeTab: 0,
    }
  }



  handleFormChange = (event) => {
    this.setState({ ticker: event.target.value });
  }


  drawDailyChart = () => {
    this.chart.current.fetchStock();
  }

  drawCandleChart = () => {
    this.candleChart.current.makeReq();
  }

  getOverview = () => {
    this.overview.current.makeReq();
  }


  handleFormSubmit = (event) => {

    this.setState({
      ticker: this.state.ticker,
      prevTicker: this.state.ticker,
      formSubmitted: true,
    })


    if (this.state.activeTab === 0) {
      this.drawDailyChart();
    } else if (this.state.activeTab === 1) {
      this.drawCandleChart();
    } else if (this.state.activeTab === 2) {
      this.getOverview();
    }

  }

  handleTabOnSelect(currentTab) {
    this.setState({ activeTab: currentTab });
  }


  render() {
    return (

      <div className="App">
        <div className="container">

          <h1>Stock Charts</h1>

          <Tabs forceRenderTabPanel={false} defaultIndex={0} onSelect={index => this.handleTabOnSelect(index)}>
            <TabList>
              <Tab>Daily Chart</Tab>
              <Tab>Candlestick Chart</Tab>
              <Tab>Company Overview</Tab>
            </TabList>
            <TabPanel className="tabs">

              <h2 id="title">Chart for {`$${this.state.prevTicker}`}</h2>

              <p id="hide">

                This chart displays the intraday time series of the equity specified, covering extended trading hours where applicable
                (e.g., 4:00am to 8:00pm Eastern Time for the US market). The intraday data is derived from the Securities Information Processor
                (SIP) market-aggregated data.

              </p>
              <Chart
                ref={this.chart}
                setTicker={this.state.ticker}
                setPrevTicker={this.state.prevTicker}
              ></Chart>



            </TabPanel>
            <TabPanel className="tabs">

              <h2 id="title">Chart for {`$${this.state.prevTicker}`}</h2>

              <p id="hide">

                This chart shows the daily candle sticks (daily open, daily high, daily low, daily close, daily volume) of the global equity specified,
                covering the last couple months.
              </p>

              <CandleChart
                ref={this.candleChart}
                setTicker={this.state.ticker}
                setSubmit={this.state.submitted}

              ></CandleChart>

            </TabPanel>

            <TabPanel className="tabs">

              <Overview
                ref={this.overview}
                setTicker={this.state.ticker}
                setPrevTicker={this.state.prevTicker}
              ></Overview>


            </TabPanel>

          </Tabs>

          <br></br>
          <br></br>

          <div className="input-container">
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Ticker.."
                    type="text"
                    defaultValue={this.state.ticker}
                    value={this.state.value}
                    onChange={this.handleFormChange}
                  />
                </Col>
                <Button variant="primary" onClick={this.handleFormSubmit}>
                  Submit
                </Button>
              </Row>
            </Form>

            <br></br>

          </div>

        </div >


      </div >

    );

  }

}

export default App;
