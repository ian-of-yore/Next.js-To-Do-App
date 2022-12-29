import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }} className='bg-dark bg-gradient'>
      <Head>
        <title>To Do App</title>
      </Head>
      <h1 className='w-50 mx-auto ps-4' style={{ paddingTop: "200px" }}>
        Organize your
        work and life, finally.
        Become focused, organized, and calm with Schedule Planner.
      </h1>
      <div className='w-25 mx-auto mt-5'>
        <Link href='/addTasks'><button className='btn btn-outline-warning w-75'>Start Right Away</button></Link>
      </div>
    </div>
  )
}
