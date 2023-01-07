import { canSRRAuth } from "../../utils/canSRRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"
import { FiRefreshCcw } from "react-icons/fi"

import styles from './styles.module.scss'


export default function DashBoard(){
    return(
        <>
        <Head>
            <title>Home</title>
        </Head>

        <div>
        <Header/>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1 className={styles.titulo}>Últimos pedidos</h1>
                    <button>
                        <FiRefreshCcw size={25} color="#00FA90"/>
                    </button>
                </div> 

                <article className={styles.listOrders}>

                    <section className={styles.orderItem}>
                        <button>
                            <div className={styles.tag}></div>
                            <span>Mesa 30</span>
                        </button>
                    </section>

                </article>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps =  canSRRAuth(async (ctx) =>{

    return{
        props:{}
    }
})