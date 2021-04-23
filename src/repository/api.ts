import { ChartData, ChartOptions } from 'chart.js';
import axios, { AxiosResponse } from 'axios';

const baseURL: string =
    'https://cleanhands-flask-server-p644b.ondigitalocean.app/api/v1';
export interface LoginBody {
    [key: string]: string;
}

const instance = axios.create({
    baseURL: `${baseURL}`,
});

export function tryLogin(credentials: LoginBody): Promise<AxiosResponse> {
    return instance.post('login', credentials, {
        withCredentials: true,
    });
}

export function tryLogout(): Promise<AxiosResponse> {
    return instance.post(
        'logout',
        {},
        {
            withCredentials: true,
        }
    );
}

export function changeName(
    firstname: string,
    lastname: string
): Promise<AxiosResponse> {
    return instance.patch(
        'admin',
        { firstname: firstname, lastname: lastname },
        { withCredentials: true }
    );
}

export function changePassword(
    passwordUpdateBody: LoginBody
): Promise<AxiosResponse> {
    return instance.post('admin/update-password', passwordUpdateBody, {
        withCredentials: true,
    });
}

export function getProfile(): Promise<AxiosResponse> {
    return instance.get('admin', {
        withCredentials: true,
    });
}

export async function getDeviceData(): Promise<ChartData[]> {
    return new Promise<ChartData[]>((resolve, reject) => {
        const data0: ChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'First dataset',
                    data: [33, 53, 85, 41, 44, 65],
                    fill: true,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                },
                {
                    label: 'Second dataset',
                    data: [33, 25, 35, 51, 54, 76],
                    fill: false,
                    borderColor: '#742774',
                },
            ],
        };

        const data1: ChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'First dataset',
                    data: [33, 25, 35, 51, 54, 76],
                    fill: true,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                },
                {
                    label: 'Second dataset',
                    data: [33, 53, 85, 41, 44, 65],
                    fill: false,
                    borderColor: '#742774',
                },
            ],
        };

        const dataArray: ChartData[] = [data0, data1];
        /*if (wrong) {
            reject(Error('Bad input'));
        }*/
        setTimeout(() => resolve(dataArray), 100);
    });
}

// To use axios generic capabilities
export interface APIAdminModel {
    id: number;
    firstname: string;
    lastname: string;
    organization: string;
    email: string;
    devices: number[];
}

export function getDevicesForAdmin(): Promise<Array<number>> {
    return new Promise<Array<number>>(async (resolve, reject) => {
        try {
            let response = await instance.get<APIAdminModel>('admin', {
                withCredentials: true,
            });

            let adminModel = response.data;
            resolve(adminModel.devices.sort());
        } catch (err) {
            reject(err);
        }
    });
}

export interface HandwashingRecord {
    id: number;
    timestamp: string;
    duration: number;
    device: string;
}

export function getHandwashingRecords(
    deviceID: number,
    startDate: Date,
    endDate: Date
): Promise<HandwashingRecord[]> {
    return new Promise<HandwashingRecord[]>(async (resolve, reject) => {
        try {
            let response = await instance.get<HandwashingRecord[]>(
                'handwashing-record/all',
                {
                    params: {
                        start_date: startDate,
                        end_date: endDate,
                        device_id: deviceID,
                    },
                    withCredentials: true,
                }
            );
            resolve(response.data);
        } catch (err) {
            reject(err);
        }
    });
}

interface FilteredHandwashRecord {
    date: string;
    duration: number;
}

// https://stackoverflow.com/questions/42136098/array-groupby-in-typescript
const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, T[]>);

export interface PlottingInfo {
    data: ChartData;
    options: ChartOptions;
}
export async function getRecordsAsChartData(
    deviceID: number,
    startDate: Date,
    endDate: Date
): Promise<PlottingInfo> {
    let records = await getHandwashingRecords(deviceID, startDate, endDate);

    let filteredRecords = records.map((record) => {
        let obj: FilteredHandwashRecord = {
            duration: record.duration,
            date: new Date(record.timestamp).toLocaleString().split(',')[0],
        };
        return obj;
    });

    let recordGroupByDate = groupBy(filteredRecords, (record) => record.date);
    let labels: string[] = [];
    let data: number[] = [];
    for (const date in recordGroupByDate) {
        labels.push(date);
        let recs = recordGroupByDate[date];
        let total = 0;
        recs.forEach((rec) => (total += rec.duration));
        data.push(total / recs.length);
    }
    let result: ChartData = {
        labels: labels,
        datasets: [
            {
                label: 'Average handwashing time',
                data: data,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };
    let options = {
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Average handwashing time',
                    },
                },
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Date',
                    },
                },
            ],
        },
    };

    return { data: result, options: options };
}

export async function getRecordsGroupByDate(
    deviceID: number,
    startDate: Date,
    endDate: Date
): Promise<Record<string, number[]>> {
    let records = await getHandwashingRecords(deviceID, startDate, endDate);

    let filteredRecords = records.map((record) => {
        let obj: FilteredHandwashRecord = {
            duration: record.duration,
            date: new Date(record.timestamp).toLocaleString().split(',')[0],
        };
        return obj;
    });
    let recordGroupByDate = groupBy(filteredRecords, (record) => record.date);
    let result: Record<string, number[]> = {};
    for (const date in recordGroupByDate) {
        let recs = recordGroupByDate[date];
        let times = recs.map((rec) => rec.duration);
        result[date] = times;
    }
    return result;
}
