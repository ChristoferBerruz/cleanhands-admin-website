import React from 'react';
import {useState} from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

const data0:ChartData =  {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

const data1:ChartData =  {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

const dataArray:ChartData[] = [data0, data1];


const StatisticsContent:React.FC = () => {

    const [deviceNumber, setDeviceNumber] = useState(0);
    const data = dataArray[deviceNumber]!;

    const devicesList = Array.from({length:dataArray.length}, (v, k) => k);

    const controls = devicesList.map((device) => {

      const cssApplied = device === deviceNumber? 
      "button is-primary is-light is-active":
      "button is-primary is-light";

      return(
        <div className="column is-2" key={device}>
          <button className={cssApplied} onClick={() => setDeviceNumber(device)}>
            Device {device + 1}
          </button>
        </div>
      );
    });

    return(
      <div className="section">
          <div className="columns is-centered">
              <div className="column is-8">
                <div className="columns">
                  {controls}
                </div>
                <Line data={data} />
              </div>
          </div>
        </div>
    );
}

const Statistics:React.FC = () => {
    return(
        <>
            <Header />
            <StatisticsContent />
            <Footer />
        </>
    )
}

export default Statistics;