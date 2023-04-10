import Link from 'next/link'
import Head from 'next/head'
import styles from "../styles/globalstyles.module.css"
import Login from './login'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return( 
   <div className={styles.container}>
    <Login/>
    <Link href="/about">About</Link>
    <Link href="/profile">Profile</Link>
    
    <h1 className={styles.homePageTitle}>Testr</h1>
       
      
     </div>);
   
  
}
