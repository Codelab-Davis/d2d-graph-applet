import { useState } from "react";

function RateTable(props: { rateTableRef: React.MutableRefObject<null>,rateData: (string | number)[][], visible: Boolean }) {

    const headers = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let objUrl;

    /*
    * makeCSVData creates a CSV file from the data stored in rateData props
    */
    // https://medium.com/@idorenyinudoh10/how-to-export-data-from-javascript-to-a-csv-file-955bdfc394a9
    function makeCSVData() {
        const csvData = [];
        csvData.push(headers);
        for (let i = 0; i < props.rateData.length; i++) {
            csvData.push(props.rateData[i])
        }

        let csvContent = ''

        csvData.forEach(row => {
            csvContent += row.join(',') + '\n'
        })

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
        objUrl = URL.createObjectURL(blob)
    }

    makeCSVData()

    // only show table when the table is set to visible
    if(props.visible) {
        const[isFlagged, setIsFlagged] = useState({
            flaggedStates: Array(props.rateData.length).fill(Array(props.rateData[0].length).fill(false))})
        

        function onCellClick(rowID:number, rowDataID:number) {

            setIsFlagged(({ flaggedStates }) => ({ flaggedStates:
                flaggedStates.map((row, i) => {
                    let newRow = row.map((cell:boolean, j:number) => {
                        if(i == rowID && j == rowDataID) {
                            return !cell
                        }
                        else {
                            return cell
                        }
                    });
                    return newRow;
                })
            }));
        }
        return (
            <div ref={props.rateTableRef} className="flex flex-col mt-[150px] mx-[5%] lg:mx-[10%] w-[90%] lg:w-[80%]">
                <div className="flex justify-between mb-6">
                    <div className="flex gap-6">
                        <h3 className="dark:text-[#f2f2f2]">ENZYME REACTION RATES</h3>
                        <div className="group relative w-max">
                            <button id="rate-table-info" className="mt-[8px]"><img src="/assets/grayInfoIcon.svg"/></button>
                            <span className="pointer-events-none absolute w-max -top-[100px] md:-top-[80px] -left-[500%] md:left-[150%] rounded-[15px] bg-white dark:bg-grays-500 px-[15px] py-[20px]
                            text-sm font-normal text-black opacity-0 shadow-[0_7px_15px_0_rgba(0,0,0,0.08)] dark:shadow-[0_7px_15px_0_rgba(255,255,255,0.10)] transition-opacity group-hover:opacity-100">
                                <div className="flex flex-col items-start">
                                    <p className="dark:text-[#f2f2f2]"><b>Left-click </b>to flag data</p>
                                    <p className="dark:text-[#f2f2f2]"><b>Click and drag </b>to select data</p>
                                </div>
                            </span>
                        </div>
                    </div>
                    <button id="export-button">
                        <a href={objUrl} download={"Output.csv"}>
                            <div className="flex gap-[4px] py-[6px] px-[21px] bg-secondary-600 hover:bg-secondary-700 rounded-[30px]">
                                <p className="text-white font-semibold">Export</p>
                            </div>
                        </a>
                    </button>
                </div>
                <table id="rate-table" className="mb-[136px] border-separate border-spacing-0 w-full table-fixed text-left rounded-3xl border-none">
                    <thead>
                        <tr>
                            {headers.map((head, headID) => (
                                <th className="border border-primary-700 bg-primary-500 dark:bg-[#33696d] dark:border-[#4e9095] text-white h-12 pl-[10px] border-b-0" key={headID}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.rateData.map((rowContent, rowID) => (
                            <tr key={rowID}>
                                {rowContent.map((val, rowDataID) => (
                                    <td className="border bg-white hover:bg-grays-300 dark:hover:bg-grays-500 border-grays-300 dark:bg-[#636363] dark:border-[#8a8a8a] h-12 border-t-1 max-[800px]:text-xxs max-[1400px]:text-xs max-[1623px]:text-sm dark:text-[#f2f2f2]" key={rowDataID}>
                                        {(rowDataID == 0) ?
                                            <div className="flex justify-center items-center h-full w-full">
                                                {val}
                                            </div> :
                                            isFlagged.flaggedStates[rowID][rowDataID] ?
                                                <button onClick={() => onCellClick(rowID, rowDataID)} className="flex justify-start items-center h-full w-full pl-[10px] bg-flagged">
                                                    <div>                                                    
                                                        {(typeof val !== 'string' && val < 0.001) ? val.toExponential(2).toString() : val.toString()}

                                                    </div>
                                                </button>:
                                                <button onClick={() => onCellClick(rowID, rowDataID)} className="flex justify-start items-center h-full w-full pl-[10px] hover:bg-flagged">
                                                    <div>                                                    
                                                        {(typeof val !== 'string' && val < 0.001) ? val.toExponential(2).toString() : val.toString()}
                                                    </div>
                                                </button>
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-fill h-[2px] rounded-[2px] bg-grays-400"/>
            </div>

        )
    }
    return (
        <div ref={props.rateTableRef}></div>
    )
}
export default RateTable;