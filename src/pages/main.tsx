import React from 'react';
import ReactDOM from 'react-dom/client';
import { VoteSession } from './VoteSession';
import "../styles/global.scss";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VoteSession />
  </React.StrictMode>
)
