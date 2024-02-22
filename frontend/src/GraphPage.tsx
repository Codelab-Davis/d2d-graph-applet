import Graph from "./Graph"
function GraphPage(props: {substrateData:Map<string, number[]>, visible:Boolean}){

    const headers = [" ", "1-3", "4-6", "7-9", "10-12"];
    const substrateDataNames = Array.from(props.substrateData.keys());

    const substrateDataGroups:(string| string[])[][] = [];
    let currGroup = [];
    let currLetter = '';

    // groups substrates in sets of 3 for each substrate group to be used for graph component
    // ie for substrate A, it groups it in A1-3, A4-6, A7-9, A10-12
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
    substrateDataGroups.push(currGroup);

    if (props.visible){
        return (
            <div className="flex flex-col mt-[136px] mb-[200px] mx-[5%] lg:mx-[10%] w-[90%] lg:w-[80%]">
                <div className="flex justify-between mb-6">
                    <div className="flex gap-6">
                        <h3 className="dark:text-[#f2f2f2]">RATE VISUALIZATIONS</h3>
                        <div className="group relative w-max">
                            <button id="graph-table-info" className="mt-[8px]"><img src="/assets/grayInfoIcon.svg"/></button>
                            <span className="pointer-events-none absolute w-max -top-[75px] md:-top-[60px] -left-[500%] md:left-[150%] rounded-[15px] bg-white dark:bg-grays-500 px-[15px] py-[20px]
                            text-sm font-normal text-black opacity-0 shadow-[0_7px_15px_0_rgba(0,0,0,0.08)] dark:shadow-[0_7px_15px_0_rgba(255,255,255,0.10)] transition-opacity group-hover:opacity-100">
                                <div className="flex flex-col items-start">
                                    <p className="dark:text-[#f2f2f2]"><b>Right-click </b>to save graphs</p>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <table id="graphs" className="border-separate border-spacing-0 w-full table-auto text-left rounded-3xl bg-white dark:bg-[#636363] border-none">
                    <thead>
                        <tr>
                            {headers.map((head, headID) => (
                                <th className="border border-primary-700 bg-primary-500 dark:bg-[#33696d] dark:border-[#4e9095] text-white h-12 pl-[10px] border-b-0" key={headID}>
                                    {
                                        head == " "? <div className="w-[15%]">{head}</div> : <div>{head}</div>
                                    }
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {substrateDataGroups.map((rowContent, rowID) => (
                            <tr key={rowID}>
                                {rowContent.map((val, rowDataID) => (
                                    <td className="border border-grays-300 w-[15%] border-t-0 bg-white hover:bg-grays-300 dark:hover:bg-grays-500  dark:bg-[#636363] dark:border-[#8a8a8a]" key={rowDataID}>
                                        {
                                            typeof val == 'string'? <div className="grid place-items-center h-full w-full"><p>{val}</p></div>
                                            : <div className="relative w-[98%]"><Graph substrateData={props.substrateData} substrates={val} title={`${val}`}></Graph></div>
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