import Head from "next/head";
import styles from './styles.module.scss'
import { Header } from "../../components/Header";   
import { canSRRAuth } from "../../utils/canSRRAuth";
import { setupAPIClient } from "../../services/api";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { FiUpload } from 'react-icons/fi'

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({categoryList} : CategoryProps){

    const [avatar, setAvatar] = useState('')
    const [arquivo, setArquivo] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [categorias, setCategorias] = useState(categoryList || [])
    const [categoriaSelecionada, setcategaoriaSelecionada] = useState(0)

    function handleFile(event : ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return;
        }

        const image = event.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){

            setArquivo(image);
            setAvatar(URL.createObjectURL(event.target.files[0]))
        }
    }

    function handleChangeCategory(event){
        
        setcategaoriaSelecionada(event.target.value)
    }

    async function handleRegister(event: FormEvent ){
        event.preventDefault();

        try{
            const data = new FormData();

            if(name === '' || price === '' ||  description === '' || arquivo === ''){
                toast.error("Preencha todos os campos!");
                return;
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('file', arquivo)
            data.append('category_id', categorias[categoriaSelecionada].id)

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data);

            toast.success('Produto cadastrado com sucesso!')

        }catch(err){
            console.log(err);
            toast.error("Erro ao fazer o cadastro!")
        }

        setName('');
        setPrice('');
        setDescription('');
        setArquivo(null);
        setAvatar('')

    }

    return(
        <>
        <Head>
            <title>Novo Produto</title>
        </Head>

        
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastro de Produtos</h1>

                <form className={styles.form} onSubmit={handleRegister}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={30} color="#000"/>
                        </span>
                        
                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>
                        
                        {avatar && (                           
                            <img 
                            className={styles.preview}
                            src={avatar}
                            alt="Foto escolhida"
                            width={250}
                            height={250}
                            />                       
                       )}


                    </label>


                

                <select value={categoriaSelecionada} onChange={handleChangeCategory} placeholder={"Selecione a categoria"}>
                  {categorias.map((item, index) => {
                    return(
                        <option key={item.id} value={index}>
                            {item.name}
                        </option>
                    )
                  })}
                </select>
                       
                <input type="text"
                placeholder="Digite Nome do produto"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                
                <input type="number"
                placeholder="Digite o preço do produto"
                className={styles.input}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />

                <textarea 
                placeholder="Descrição do produto"
                className={styles.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <button className={styles.botao} type="submit">
                    Cadastrar
                </button>

                

                </form>
            </main>
        </div>
        
        
        </>
    )
}

export const getServerSideProps = canSRRAuth(async (ctx) => {

    const apiCliente = setupAPIClient(ctx)
    const response = await apiCliente.get('/category');

    
    return{
        props: {
            categoryList: response.data
        }
    }
})