import React, {useState} from 'react'
import "./history.css";

const History = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        color: 'white'
        }}
    >
        <div className='container'>
        <div className='content-left'>
          <h1 className='header'>User History</h1>
        </div>
          <div className='content-right'>
            <h1 className='header'>Global History</h1>
          </div>
        </div>
    </div>
  )
}

export default History;
