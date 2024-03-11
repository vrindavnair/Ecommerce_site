import React from 'react'
import Layout from '../../components/layout/Layout'

const Pagenotfound = () => {
  return (
    <div>
        <Layout>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">
                      <h1 style={{marginLeft:'80px', fontWeight:'bold'}}>404</h1>
                      <h4 >OOPS!PAGE NOT FOUND</h4>
                      <button style={{marginLeft:'80px'}}>go back</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Layout>
    </div>
  )
}

export default Pagenotfound