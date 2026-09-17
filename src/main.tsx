import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styles from './index.css'
import Nav from './components/unlumen-ui/motion-navigation-menu'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav />
  </StrictMode>,
)
