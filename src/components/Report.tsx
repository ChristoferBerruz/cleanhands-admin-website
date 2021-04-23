import React, { useEffect, useState, useContext, createContext } from 'react';
import Loading from 'components/Loading';
import {
    getDevicesForAdmin,
    getHandwashingRecords,
    HandwashingRecord,
} from 'repository/api';

const ReportTable: React.FC = () => {
    //const { deviceId, setDeviceId } = useContext(SelectedDeviceContext);

    return (
        <div className="section">
            <div className="container">
                <ButtonCollection />
                <table className="table is-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Average Handwashing time, sec</th>
                            <th>Minimum time, sec</th>
                            <th>Maximum time, sec</th>
                            <th>No. of users</th>
                        </tr>
                    </thead>
                    <ReportContent />
                </table>
            </div>
        </div>
    );
};

const ButtonCollection: React.FC = () => {
    const [devicesList, setDevicesList] = useState<number[] | null>(null);
    const { deviceId, setDeviceId } = useContext(SelectedDeviceContext);
    useEffect(() => {
        getDevicesForAdmin()
            .then((devices: number[]) => {
                setDevicesList(devices);
                setDeviceId(devices[0]);
            })
            .catch((err: any) => alert(err));
    }, []);
    const buttonHandler =
        devicesList &&
        devicesList.map((deviceNum, idx) => {
            const cssApplied =
                deviceNum === deviceId
                    ? 'button is-primary'
                    : 'button is-primary is-light';
            return (
                <button
                    className={cssApplied} //is-light
                    key={deviceNum}
                    onClick={() => {
                        setDeviceId(deviceNum);
                    }}
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

const ReportContent: React.FC = () => {
    const { deviceId, setDeviceId } = useContext(SelectedDeviceContext);
    const [records, setRecords] = useState<HandwashingRecord[] | null>(null);
    //Get current date using the JavaScript Date object.
    const now: Date = new Date();
    //Change it so that it is 7 days in the past.
    const sevenDaysAgoDate = new Date(now);
    sevenDaysAgoDate.setDate(now.getDate() - 7);

    useEffect(() => {
        deviceId &&
            getHandwashingRecords(deviceId, sevenDaysAgoDate, now)
                .then((records: HandwashingRecord[]) => {
                    setRecords(records);
                })
                .catch((err: any) => alert(err));
    }, [deviceId]);

    const Row =
        records &&
        records.map((record: HandwashingRecord) => (
            <tr>
                <td>{record.timestamp}</td>
                <td>{record.duration}</td>
                <td>{record.duration}</td>
                <td>{record.duration}</td>
                <td>1</td>
            </tr>
        ));

    return !deviceId ? (
        <tbody>
            <tr>
                <td>Please select a device.</td>
            </tr>
        </tbody>
    ) : (
        <tbody>{Row}</tbody>
    );
};

const Report: React.FC = () => {
    return (
        <>
            <DeviceProvider>
                <ReportTable />
            </DeviceProvider>
        </>
    );
};
export default Report;

interface ISelectedDeviceContext {
    deviceId: number | null;
    setDeviceId: Function;
}

const SelectedDeviceContext = createContext<ISelectedDeviceContext>({
    deviceId: null,
    setDeviceId: new Function(),
});

const DeviceProvider: React.FC = ({ children }) => {
    const [deviceId, setDeviceId] = useState(null);
    const initial = { deviceId, setDeviceId };

    return (
        <SelectedDeviceContext.Provider value={initial}>
            {children}
        </SelectedDeviceContext.Provider>
    );
};
