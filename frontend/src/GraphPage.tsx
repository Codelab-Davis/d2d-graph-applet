import Graph from "./Graph"
function GraphPage(props: {substrateData:Map<string, number[]>, visible:Boolean}){

    const headers = [" ", "1-3", "4-6", "7-9", "10-12"];
    const substrateDataNames = Array.from(props.substrateData.keys());

    const substrateDataGroups:(string| string[])[][] = [];
    let currGroup = [];
    let currLetter = '';

    for(let i = 0; i < substrateDataNames.length; i+=3) {
        if(substrateDataNames[i][0] != currLetter) {
            if(currGroup.length != 0) {
                substrateDataGroups.push(currGroup);
                currGroup = [];
            }
            currLetter = substrateDataNames[i][0];
            currGroup.push(currLetter);
            const group = [substrateDataNames[i], substrateDataNames[i+1], substrateDataNames[i+2]];
            currGroup.push(group);
            continue;
        }
        const group = [substrateDataNames[i], substrateDataNames[i+1], substrateDataNames[i+2]];
        currGroup.push(group);
    }

    if (props.visible){
        return (
            <div className="flex flex-col mt-[136px] mb-[200px] mx-[5%] lg:mx-[10%] w-[90%] lg:w-[80%]">
                <div className="flex justify-between mb-6">
                    <div className="flex gap-6">
                        <h3>RATE VISUALIZATIONS</h3>
                        <button><img src="./src/assets/grayInfoIcon.svg"/></button>
                    </div>
                </div>
                <table className="border-separate border-spacing-0 w-full table-auto text-left rounded-3xl bg-white border-none">
                    <thead>
                        <tr>
                            {headers.map((head, headID) => (
                                <th className="border border-primary-700 bg-primary-500 text-white h-12 pl-[10px] border-b-0" key={headID}>
                                    {
                                        head == " "? <div className="w-[10vh]">{head}</div> : <div>{head}</div>
                                    }
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {substrateDataGroups.map((rowContent, rowID) => (
                            <tr key={rowID}>
                                {rowContent.map((val, rowDataID) => (
                                    <td className="border border-grays-300 w-[15%] border-t-0 border-r-0 max-[800px]:text-xxs max-[1400px]:text-xs max-[1623px]:text-sm" key={rowDataID}>
                                        {
                                            typeof val == 'string'? <div className="grid place-items-center h-full w-full"><p>{val}</p></div> 
                                            : <div className="relative h-full w-full"><Graph substrateData={props.substrateData} substrates={val} title={`${val}`}></Graph></div>
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) 
    }
    return <div></div>
}

export default GraphPage