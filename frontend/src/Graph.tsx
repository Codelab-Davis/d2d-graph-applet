import React from 'react';
import './App.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


interface chartInterface {
    substrateData:Map<string, number[]>, 
    substrates:string[], 
    title:string,
}
function Graph(props:chartInterface) {
    const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
        },
        scales: {
            x: {
                grid: {
                  display: false
                }
              },
              y: {
                grid: {
                  display: false
                }
              }
        }
    };

    const dataSets = [];
    const colors = ["red", "green", "blue"]

    for (let i = 0; i < props.substrates.length; i++){
        dataSets.push({
            label: `data set ${i}`,
            data: props.substrateData.get(props.substrates[i]),
            borderColor: colors[i],
            pointBorderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
        })
    }

    console.log(dataSets);
    
    const data = {
        labels,
        datasets: dataSets
    };
    return (
        <div className='my-first-chart flex self-stretch items-center'>
            <Line options={options} data={data} />
        </div>
    );
}
export default Graph;