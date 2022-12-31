import Head from "next/head"
import Link from "next/link";
import { useState, FormEvent, useContext } from "react";


import styles from '../../../styles/home.module.scss';
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";


export default function Cadastro() {
  const {signUp} = useContext(AuthContext);

  
  const[name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCfm, setPasswordCfm] = useState('')

  const [loading, setLoading] = useState(false)
  
  async function handleCadastro(event: FormEvent) {

    event.preventDefault();

    if(name === '' || email === '' || password === '' || passwordCfm === ''){
      toast.error("Preencha todos os campos!")
      return;
    }
    if(password !== passwordCfm){
      toast.warning('As senhas estão diferentes!')
      return;
    } 
    
    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)
  
  
  
  } 
  
  return (
        <>
    <Head>
      <title> Cadastre-se </title>
    </Head>
    
    <div className={styles.containerCenter}>
      
    

      <div className={styles.login}>
        
        <form onSubmit={handleCadastro}>
            <Input 
            placeholder="Digite seu nome" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}/>
            
            <Input 
            placeholder="Digite seu email" 
            type="text"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
            
            <Input 
            placeholder="Digite sua senha" 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
            
            <Input 
            placeholder="Confirme sua senha" 
            type="password"
            value={passwordCfm} 
            onChange={(e) => setPasswordCfm(e.target.value)}/>
            
            
            <Button type="submit" loading={loading}> Cadastrar </Button>
        </form>

        <Link legacyBehavior href= "/">
          <a className={styles.text}>Já possui uma conta? Faça o login! </a>
        </Link>
      
      </div>
    </div>
    
    </>
  )
}