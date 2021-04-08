import { ChartData } from 'chart.js';
import axios, { AxiosResponse } from 'axios';
//const axios = require('axios').default;

const baseURL: string = 'http://64.225.55.171:5000/api/v1';
export interface LoginBody {
    [key: string]: string;
}

//axios.get('some api url', {withCredentials: true});

export function tryLogin(credentials: LoginBody): Promise<AxiosResponse> {
    return axios({
        method: 'POST',
        url: `${baseURL}/login`,
        data: credentials,
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
        setTimeout(() => resolve(dataArray), 5000);
    });
}
