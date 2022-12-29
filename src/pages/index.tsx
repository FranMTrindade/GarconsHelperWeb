import Head from "next/head"
import Link from "next/link";
import Image from "next/image";


import styles from '../../styles/home.module.scss';
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";



export default function Home() {
  return (
    
    <>
    <Head>
      <title> Faça seu login </title>
    </Head>
    
    <div className={styles.containerCenter}>
      
      <div className={styles.login}>

        <form>
            <Input placeholder="Digite seu email" type="text"/>
            <Input placeholder="Digite sua senha" type="password"/>
            <Button type="submit" loading={false}> Acessar </Button>
        </form>

        <Link legacyBehavior href= "/cadastro">
          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </Link>
      
      </div>
    </div>
    
    </>
  )
}
