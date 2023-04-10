import Navbar from "./navbar";
import Head from "next/head";


const Layout = ({children})=>{
    return(<> 
      <Head>
      <title>Wardrop Wizards</title>
    </Head>
    <Navbar/> <div> {children} </div> 
    </>)
    


};


export default Layout;