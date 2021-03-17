import React from 'react';
import { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { getDeviceData } from 'repository/api';

const GraphChart: React.FC = () => {
    const [deviceNumber, setDeviceNumber] = useState(0);
    const [data, setData] = useState([] as ChartData[]);

    useEffect(() => {
        getDeviceData().then((devData) => setData(devData));
    }, []);

    const devicesList = Array.from({ length: data.length }, (v, k) => k);

    const controls = devicesList.map((device) => {
        const cssApplied =
            device === deviceNumber
                ? 'button is-primary'
                : 'button is-primary is-light';

        return (
            <div className="column is-2" key={device}>
                <button
                    className={cssApplied}
                    onClick={() => setDeviceNumber(device)}
                >
                    Device {device + 1}
                </button>
            </div>
        );
    });

    if (data.length) {
        return (
            <div className="column is-8">
                <div className="columns">{controls}</div>
                <Line data={data[deviceNumber]} />
            </div>
        );
    } else {
        return <Loading />;
    }
};
const StatisticsContent: React.FC = () => {
    return (
        <div className="section">
            <div className="columns is-centered">
                <GraphChart />
            </div>
        </div>
    );
};

const Statistics: React.FC = () => {
    return (
        <>
            <Header />
            <StatisticsContent />
            <Footer />
        </>
    );
};

export default Statistics;
