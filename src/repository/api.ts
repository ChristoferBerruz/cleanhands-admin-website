import { ChartData } from 'chart.js';

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

        setTimeout(() => resolve(dataArray), 5000);
    });
}
