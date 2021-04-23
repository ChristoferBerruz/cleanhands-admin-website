import React, { useEffect, useState, useContext, createContext } from 'react';
import Loading from 'components/Loading';
import { getDevicesForAdmin } from 'repository/api';

const ReportTable: React.FC = () => {
    const { deviceId, setDeviceId } = useContext(SelectedDeviceContext);
    useEffect;
    //need to know corespondence between 1,2,3 and devices id via useEffect

    return (
        <div className="section">
            <div className="container">
                <ButtonCollection />
            </div>

            <div className="container">
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
            .then((devices: any) => setDevicesList(devices))
            .catch((err: any) => alert(err));
    }, []);

    const buttonHandler =
        devicesList &&
        devicesList.map((deviceNum) => (
            <button
                key={deviceNum}
                onClick={() => setDeviceId(deviceNum)}
            ></button>
        ));

    return !devicesList ? (
        <Loading />
    ) : (
        <div className="buttons">{buttonHandler}</div>
    );
};

const ReportContent: React.FC = () => {
    const { deviceId, setDeviceId } = useContext(SelectedDeviceContext);

    return (
        <tbody>
            !deviceId ? ( ) : (<td>Nothing yet!</td>
            );
        </tbody>
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
