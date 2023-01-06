import { canSRRAuth } from "../../utils/canSRRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"


export default function DashBoard(){
    return(
        <>
        <Head>
            <title>Home</title>
        </Head>

        <div>
        <Header/>
            <h1>Home</h1>
        </div>
        
        </>
    )
}

export const getServerSideProps =  canSRRAuth(async (ctx) =>{

    return{
        props:{}
    }
})