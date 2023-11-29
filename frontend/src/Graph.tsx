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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            chartAreaBackground: {
                color: 'rgba(250, 250, 250, 1)'
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                  display: false,
                }
              },
              y: {
                ticks: {
                    display: false,
                },
                grid: {
                  display: false,
                }
              }
        }
    };

    const dataSets = [];
    const labels = [];
    const colors = ['rgba(247, 159, 96, 1)', 'rgba(106, 192, 192, 1)', 'rgba(66, 106, 207, 1)'];

    for (let i = 0; i < props.substrates.length; i++){
        dataSets.push({
            label: `data set ${props.substrates[i]}`,
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
        <Line options={options} data={data} plugins={[chartAreaBackground]}/>
    );
}
export default Graph;