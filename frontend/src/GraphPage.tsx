import Graph from "./Graph"
function GraphPage(props: {substrateData:Map<string, number[]>, visible:Boolean}){

    if (props.visible){
        return <Graph substrateData={props.substrateData} substrates={['A1', 'A2', 'A3']} title = {'TEST'}></Graph>
    }
    return <div></div>
}

export default GraphPage