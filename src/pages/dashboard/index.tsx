import { canSRRAuth } from "../../utils/canSRRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"
import { FiRefreshCcw } from "react-icons/fi"
import { useState } from "react"
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import Modal from 'react-modal'
import { ModalOrder } from "../../components/ModalOrder"

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null
}


interface HomeProps{
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        description: string;
        price: string;
    }
    order:{
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}


export default function DashBoard({orders} : HomeProps){

    const [ orderList, setOrderList] = useState(orders || [])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModalView(id: string){
     
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/order/detail', {
            params:{
                order_id: id,
            }
        })

        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishItem(id: string){
        
        const apiClient = setupAPIClient();
        await apiClient.put('/order/finish', {
            order_id: id
        })

        const response =  await apiClient.get('/orders');

        setOrderList(response.data);
        setModalVisible(false);
    }

    async function handleRefresh(){
        const apiClient = setupAPIClient();
        
        const response = await apiClient.get('/orders')
        setOrderList(response.data);
    }

    Modal.setAppElement('#__next');
    
    
    
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
                    <button onClick={handleRefresh}>
                        <FiRefreshCcw size={25} color="#00FA90"/>
                    </button>
                </div> 
                
                <article className={styles.listOrders}>

                    {orderList.length === 0 && (
                        <span className={styles.listaVazia}>
                            Não foi encontrado nenhum pedido...
                        </span>
                    )}
                   
                    {orderList.map(item => (
                         <section key={item.id} className={styles.orderItem}>
                        <button onClick={() => handleOpenModalView(item.id)}>
                            <div className={styles.tag}></div>
                            <span>Mesa {item.table} </span>
                        </button>
                    </section>
                    ))}           
                </article>
            
            </main>

            {modalVisible && (
                <ModalOrder
                isOpen={modalVisible}
                onRequestClose={handleCloseModal}
                order={modalItem} 
                handleFinishOrder={handleFinishItem}       
                />
            )}
        
        </div>
        </>
    )
}

export const getServerSideProps =  canSRRAuth(async (ctx) =>{

    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/orders');


    return{
        props:{
            orders: response.data
        }
    }
})