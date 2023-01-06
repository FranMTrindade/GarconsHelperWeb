import styles from './styles.module.scss'
import Link from 'next/link'
import { TbLogout } from 'react-icons/tb'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'



export function Header(){
    
    const {signOut} = useContext(AuthContext)
    
    
    
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.jpeg" width={100} height={100}/>
                </Link>

                <nav className={styles.menu}>
                   
                <Link href="/category">
                        Categoria
                    </Link>

                    <Link href="/product">
                        Produtos
                    </Link>

                    <button onClick={signOut}>
                        <TbLogout size={25} />
                    </button>

                </nav>
           
           
            </div>
        </header>
    )
}