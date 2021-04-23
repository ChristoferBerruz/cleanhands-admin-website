import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import Loading from 'components/Loading';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import {
    getDeviceData,
    getRecordsAsChartData,
    getDevicesForAdmin,
} from 'repository/api';

const GraphChart: React.FC = () => {
    const { statisticInfo } = useContext(StatisticsContext);
    let deviceID = statisticInfo!.deviceID;
    const [data, setData] = useState<ChartData | null>(null);
    useEffect(() => {
        const endDate = new Date('2021-04-22');
        const startDate = new Date('2021-04-15');
        getRecordsAsChartData(deviceID, startDate, endDate).then((dat) =>
            setData(dat)
        );
    }, [statisticInfo]);
    return !data ? <Loading /> : <Line data={data}></Line>;
};

const GraphArea: React.FC = () => {
    const { statisticInfo } = useContext(StatisticsContext);
    return !statisticInfo ? <Loading /> : <GraphChart />;
};

const DeviceIDCollectionBtn: React.FC = () => {
    const [devicesList, setDevicesList] = useState<number[] | null>(null);
    const { statisticInfo, setStatisticsInfo } = useContext(StatisticsContext);
    useEffect(() => {
        getDevicesForAdmin()
            .then((devices) => {
                setDevicesList(devices);
                setStatisticsInfo({ ...statisticInfo, deviceID: devices[0] });
            })
            .catch((err) => alert(err));
    }, []);

    const buttonHandler =
        devicesList &&
        devicesList.map((deviceNum, idx) => (
            <button
                key={deviceNum}
                className="button is-primary"
                onClick={() =>
                    setStatisticsInfo({ ...statisticInfo, deviceID: deviceNum })
                }
            >
                Device {idx + 1}
            </button>
        ));

    return !devicesList ? (
        <Loading />
    ) : (
        <div className="buttons">{buttonHandler}</div>
    );
};
const StatisticsContent: React.FC = () => {
    getDevicesForAdmin()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    return (
        <div className="section">
            <div className="columns">
                <div className="column is-third">
                    <DeviceIDCollectionBtn />
                </div>
                <div className="column">
                    <GraphArea />
                </div>
            </div>
        </div>
    );
};

interface IStatisticsInfo {
    deviceID: number;
    startDate: Date;
    endDate: Date;
}

interface IStatisticsContext {
    statisticInfo: IStatisticsInfo | null;
    setStatisticsInfo: Function;
}

const StatisticsContext = createContext<IStatisticsContext>({
    statisticInfo: null,
    setStatisticsInfo: new Function(),
});

const StatisticsProvider: React.FC = ({ children }) => {
    const [statisticInfo, setStatisticsInfo] = useState(null);
    return (
        <StatisticsContext.Provider
            value={{ statisticInfo, setStatisticsInfo }}
        >
            {children}
        </StatisticsContext.Provider>
    );
};

const Statistics: React.FC = () => {
    return (
        <>
            <StatisticsProvider>
                <StatisticsContent />
            </StatisticsProvider>
        </>
    );
};

export default Statistics;
