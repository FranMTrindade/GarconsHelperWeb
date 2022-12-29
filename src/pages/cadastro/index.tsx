import Head from "next/head"
import Link from "next/link";


import styles from '../../../styles/home.module.scss';
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";


export default function Cadastro() {
  return (
    
    <>
    <Head>
      <title> Cadastre-se </title>
    </Head>
    
    <div className={styles.containerCenter}>
      
    

      <div className={styles.login}>
        <form>
            <Input placeholder="Digite seu nome" type="text"/>
            <Input placeholder="Digite sua senha" type="password"/>
            <Input placeholder="Digite sua senha" type="password"/>
            <Button type="submit" loading={false}> Acessar </Button>
        </form>

        <Link legacyBehavior href= "/">
          <a className={styles.text}>Já possui uma conta? Faça o login! </a>
        </Link>
      
      </div>
    </div>
    
    </>
  )
}