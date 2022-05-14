import { render } from '@testing-library/react'
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane'

const Settings = () => {
  return (
    <div>
      <Sidebar />
    </div>
  )
}

export default Settings;