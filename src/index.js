import React from 'react'
import ReactDOM from 'react-dom'
import Prompt from '@babbage/react-prompt'
import App from './App'

ReactDOM.render(
  <Prompt>
    <App />
  </Prompt>,
  document.getElementById('root')
)
