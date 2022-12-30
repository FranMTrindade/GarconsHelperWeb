import {useContext, FormEvent, useState} from 'react'
import Head from "next/head"
import Link from "next/link";
import Image from "next/image";


import styles from '../../styles/home.module.scss';
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import logo from '../../public/logo.jpeg'
import { AuthContext } from "../context/AuthContext";



export default function Home() {
 
  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setloading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault(); 

    let data = {
      email,
      password
    }

    await signIn(data)

  }
 
  return (   
    <>
    <Head>
      <title> Faça seu login </title>
    </Head>
    
    <div className={styles.containerCenter}>
      
      <div className={styles.login}>

      <Image className={styles.logo} src={logo} alt="logo"></Image>

        <form onSubmit={handleLogin}>
           
            <Input 
            placeholder="Digite seu email" 
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value)} />
            
            <Input 
            placeholder="Digite sua senha" 
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}/>
            
            <Button 
            type="submit" 
            loading={false}> Acessar </Button>
        
          </form>

        <Link legacyBehavior href= "/cadastro">
          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </Link>
      
      </div>
    </div>
    
    </>
  )
}
