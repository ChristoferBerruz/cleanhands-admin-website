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

import { PlottingInfo } from 'repository/api';
import DatePicker from 'react-date-picker';

const GraphChart: React.FC = () => {
    const { statisticInfo } = useContext(StatisticsContext);
    let deviceID = statisticInfo!.deviceID;
    const [plottingInfo, setPlottingInfo] = useState<PlottingInfo | null>(null);
    useEffect(() => {
        const endDate = statisticInfo!.endDate;
        const startDate = statisticInfo!.startDate;
        getRecordsAsChartData(deviceID, startDate, endDate).then((info) =>
            setPlottingInfo(info)
        );
    }, [statisticInfo]);
    return !plottingInfo ? (
        <Loading />
    ) : (
        <Line data={plottingInfo.data} options={plottingInfo.options}></Line>
    );
};

const GraphArea: React.FC = () => {
    const { statisticInfo } = useContext(StatisticsContext);
    return !statisticInfo ? <Loading /> : <GraphChart />;
};

const StartDatePicker: React.FC = () => {
    const { statisticInfo, setStatisticsInfo } = useContext(StatisticsContext);
    const [startDate, setStartDate] = useState<Date>(() => {
        const now = new Date();
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return weekAgo;
    });
    useEffect(
        () => setStatisticsInfo({ ...statisticInfo, startDate: startDate }),
        [startDate]
    );
    return (
        <div className="column">
            Start date:
            <DatePicker
                calendarAriaLabel="Select end date"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date"
                yearAriaLabel="Year"
                value={startDate}
                clearIcon={null}
                onChange={(date) => setStartDate(date as Date)}
            ></DatePicker>
        </div>
    );
};

const EndDatePicker: React.FC = () => {
    const { statisticInfo, setStatisticsInfo } = useContext(StatisticsContext);
    const [endDate, setEndDate] = useState<Date>(new Date());
    useEffect(() => setStatisticsInfo({ ...statisticInfo, endDate: endDate }), [
        endDate,
    ]);
    return (
        <div className="column">
            End date:
            <DatePicker
                calendarAriaLabel="Select end date"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date"
                yearAriaLabel="Year"
                value={endDate}
                clearIcon={null}
                onChange={(date) => setEndDate(date as Date)}
            ></DatePicker>
        </div>
    );
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
        devicesList.map((deviceNum, idx) => {
            const css =
                statisticInfo?.deviceID === deviceNum
                    ? 'button is-primary'
                    : 'button is-primary is-light';
            return (
                <button
                    key={deviceNum}
                    className={css}
                    onClick={() =>
                        setStatisticsInfo({
                            ...statisticInfo,
                            deviceID: deviceNum,
                        })
                    }
                >
                    Device {idx + 1}
                </button>
            );
        });

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
        <div className="container">
            <div className="section">
                <h1 className="title"> Quickly visualize your data</h1>
                <div className="columns">
                    <div className="column is-3">
                        <DeviceIDCollectionBtn />
                        <StartDatePicker />
                        <EndDatePicker />
                    </div>
                    <div className="column is-9">
                        <GraphArea />
                    </div>
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
