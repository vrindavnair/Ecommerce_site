import React from 'react'

const Categoryform = ({handleSubmit,value,setValue}) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <input type='text' 
                placeholder='Enter new category'
                value={value} onChange={(e)=>setValue(e.target.value)}
                />
            </div>
            <button type='submit' className='btn btn-danger'>
                Submit
            </button>
        </form>
    </div>
  )
}

export default Categoryform