import React from 'react'
import ReactDOM from 'react-dom'
import Prompt from '@babbage/react-prompt'
import App from './App'

ReactDOM.render(
  <Prompt
    customPrompt
    appName='ToDo List'
    author='Peer-to-peer Privacy Systems Research, LLC'
  >
    <App />
  </Prompt>,
  document.getElementById('root')
)
