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

// custom plugin to set background color
const chartAreaBackground = {
    id:'chartAreaBackground',
    beforeDatasetsDraw(chart: { ctx: any; chartArea: any}, args: any, opts: any) {
        if(!opts.color) {
            return;
        }
        const { ctx, chartArea } = chart;
        ctx.save();
        ctx.fillStyle = opts.color;
        ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
    }
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, 
    chartAreaBackground,
);


interface chartInterface {
    substrateData:Map<string, number[]>, 
    substrates:string[], 
    title:string,
}
function Graph(props:chartInterface) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
            chartAreaBackground: {
                color: 'rgba(250, 250, 250, 1)'
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                    beginAtZero: true,
                },
                grid: {
                  display: false
                }
              },
              y: {
                ticks: {
                    display: false,
                    beginAtZero: true,
                },
                grid: {
                  display: false
                }
              }
        }
    };

    const dataSets = [];
    const labels = [];
    const colors = ["red", "green", "blue"];

    for (let i = 0; i < props.substrates.length; i++){
        dataSets.push({
            label: `data set ${i}`,
            data: props.substrateData.get(props.substrates[i]),
            borderColor: colors[i],
            pointBorderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
        })
        if(dataSets!= null && dataSets[0].data != null && i == 0) {
            for(let j = 0; j < dataSets[0].data.length; j++) {
                labels.push(`${j}`);
            }
        } 
    }
    
    const data = {
        labels,
        datasets: dataSets,
    };
    return (
        <div className='relative h-[100%] w-[100%]'>
            <Line options={options} data={data} plugins={[chartAreaBackground]}/>
        </div>
    );
}
export default Graph;