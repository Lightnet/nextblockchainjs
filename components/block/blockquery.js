import useFetch from "../hook/usefectch";


export default function BlockQuery(){

  async function queryBlock(){
    let data = await useFetch('api/blockchain');
    console.log(data);
  }


  return (<>
    <button onClick={queryBlock} >block query</button>
  </>);
}