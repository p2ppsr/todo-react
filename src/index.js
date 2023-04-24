import React from 'react'
import ReactDOM from 'react-dom'
import Prompt from '@babbage/react-prompt'
import App from './App'

ReactDOM.render(
  <Prompt
    customPrompt
    appName='ToDo List'
    appIcon='/favicon.ico'
    author='Peer-to-peer Privacy Systems Research, LLC'
    authorUrl='https://projectbabbage.com'
    description='Complete ToDo items, with a reward. This simple app demonstrates the power and potential of Bitcoin tokenization, by allowing every-day people to create and redeem ToDo outputs on a distributed ledger.'
  >
    <App />
  </Prompt>,
  document.getElementById('root')
)
