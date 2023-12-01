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
  
    //console.log(dataSets);
    
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