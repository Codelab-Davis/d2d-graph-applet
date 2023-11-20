function RateTable(props: { rateData: (string | number)[][], visible: Boolean }) {

    const headers = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    let objUrl;

    // https://medium.com/@idorenyinudoh10/how-to-export-data-from-javascript-to-a-csv-file-955bdfc394a9
    function makeCSVData() {
        const csvData = [];
        csvData.push(headers);
        for (let i = 0; i < data.length; i++) {
            csvData.push(data[i])
        }
        console.log(csvData)

        let csvContent = ''

        csvData.forEach(row => {
            csvContent += row.join(',') + '\n'
        })

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
        console.log(blob)
        objUrl = URL.createObjectURL(blob)
    }

    makeCSVData()
    
    if(props.visible) {
        return (
            <div className="flex flex-col mt-[150px] mx-[10%] w-[80%]">
                <div className="flex justify-between mb-6">
                    <div className="flex gap-6">
                        <h3>ENZYME REACTION RATES</h3>
                        <button><img src="./src/assets/grayInfoIcon.svg"/></button>
                    </div>
                    <button>
                        <a href={objUrl} download={"Output.csv"}>
                            <div className="flex">
                                <p className="text-secondary-600">Export</p>
                                <img src="./src/assets/exportDropDown.svg"/>
                            </div>
                        </a>
                    </button>
                </div>
                <table className="mb-[136px] border-separate border-spacing-0 w-full table-fixed text-left rounded-3xl bg-white border-none">
                    <thead>
                        <tr>
                            {headers.map((head, headID) => (
                                <th className="border border-primary-700 bg-primary-500 text-white h-12 pl-[10px] border-b-0" key={headID}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.rateData.map((rowContent, rowID) => (
                            <tr key={rowID}>
                                {rowContent.map((val, rowDataID) => (
                                    <td className="border border-grays-300 h-12 pl-[10px] border-t-0" key={rowDataID}>
                                        <div>                                            
                                            {val}
                                        </div>
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
        <div></div>
    )
}
export default RateTable;