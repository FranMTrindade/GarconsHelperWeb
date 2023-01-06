import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss'
import {useState, FormEvent} from 'react'
import { setupAPIClient } from "../../services/api";
import { toast } from 'react-toastify';
import { canSRRAuth } from "../../utils/canSRRAuth";

export default function Category(){

    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        if(name === ''){
        toast.error("Preencha o nome da categoria!")
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })
        
       toast.success("Cadastro feito com sucesso!")
       setName('')      
    }

    return(
        <>
        <Head>
            <title>Nova Categoria</title>
        </Head>

        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastrar categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                    type="text"
                    placeholder="Digite o nome da categoria"
                    className={styles.input}
                    value={name}
                    onChange={ (e) => setName(e.target.value)}
                    />
                
                <button className={styles.botaoctg} type="submit">                    
                   Cadastrar                
                </button>

                </form>  
            </main>
        </div>
        
        </>
    )
}

export const getServSideProps = canSRRAuth(async (ctx) => {
    return{
        props: {}
    }
})

