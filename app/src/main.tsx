import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApiProvider } from './core/contexts/ApiContext.tsx'
import { WebSocketProvider } from './core/contexts/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
    <ApiProvider>
        <WebSocketProvider>
            <App />
        </WebSocketProvider>
    </ApiProvider>
)
