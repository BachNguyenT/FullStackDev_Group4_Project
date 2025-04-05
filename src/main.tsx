import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PlanEvntLogin from './pages/auth/Login'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlanEvntLogin />
  </StrictMode>,
)
