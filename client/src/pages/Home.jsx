import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../context/Auth'

const Home = () => {
  const [auth,setAuth]=useAuth()
  return (
    <div>
        <Layout title={"best offers"}>
            <h1>Home</h1>
            <pre>{JSON.stringify(auth,null,4)}</pre>

        </Layout>
    </div>
  )
}

export default Home