import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getHostname } from "../services/url.service";

type WebSocketContextType = {
    connections: Connection[]
    connect: (id: string) => Connection,
    close: (id: string) => void
}

type Connection = {
    abortController: AbortController
    webSocket: WebSocket,
    id: string
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {

    const endpoint: string = useMemo(() => `${getHostname()}:3200`, []);

    const [connections, setConnetctions] = useState<Connection[]>([]);

    const connect = useCallback((id: string) => {
        console.log('connect');

        const webSocket = new WebSocket(`ws://${endpoint}`);
        const abortController = new AbortController;
        setConnetctions(prev => {
            if (prev.find(c => c.id === id)) {
                return prev;
            }
            return [
                ...prev,
                { id, abortController, webSocket }
            ];
        });
        return {
            abortController: new AbortController,
            webSocket,
            id
        };
    }, []);

    const close = useCallback((id: string) => {
        const connection = connections.find(c => c.id === id);
        if (!connection) {
            return;
        }
        connection.webSocket.close();
    }, [connections]);


    const value = useMemo(() => ({
        connections, connect, close
    }), [
        connections, connect, close
    ]);

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);

    if (context === undefined) {
        throw new Error("Component is out of WebSocketProvider");
    }

    if (context === null) {
        throw new Error("Error loading WebSocketContext");
    }

    return context;
}