import { render } from '@testing-library/react'
import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'

const Settings = () => {
  return (
    <div>
      <Sidebar />
      <h1 className='text'></h1>
    </div>
  )
}

export default Settings;