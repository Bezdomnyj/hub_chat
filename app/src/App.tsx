import { useEffect } from 'react';
import { useWebSocket } from './core/contexts/SocketContext'
import Homepage from './features/homepage/Homepage'

const App = () => {

    const { connect } = useWebSocket();

    useEffect(() => {
        try {
            const connection = connect('app');
            connection.webSocket.onmessage = e => { console.log('message', e) };
            connection.webSocket.onclose = e => { console.log('close', e) };
            connection.webSocket.onopen = e => { console.log('open', e); connection.webSocket.send("ciao") };
            connection.webSocket.onerror = e => { console.log('error', e) };
        } catch (error) {
            console.log(error);
        }
    }, [])


    return <Homepage />
}

export default App
