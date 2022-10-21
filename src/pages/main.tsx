import React from 'react'
import ReactDOM from 'react-dom/client'
import { VoteSession } from './VoteSession'
import "../styles/global.scss"
import { VoteContextProvider } from '../contexts/VoteContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VoteContextProvider>
      <VoteSession />
    </VoteContextProvider>
  </React.StrictMode>
)
