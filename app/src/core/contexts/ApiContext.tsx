import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import type { DeleteRequest, GetRequest, PatchRequest, PostRequest, PutRequest, RequestOptions, RequestQuery, Response } from "../../shared/entities/Api";
import { getOrigin, getPath, stringifySearch } from "../services/url.service";

type ApiContextType = {
    get: <T = any>(request: GetRequest) => Promise<Response<T>>
    post: <T = any>(request: PostRequest) => Promise<Response<T>>
    del: <T = any>(request: DeleteRequest) => Promise<Response<T>>
    patch: <T = any>(request: PatchRequest) => Promise<Response<T>>
    put: <T = any>(request: PutRequest) => Promise<Response<T>>
}

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: ReactNode }) => {

    const endpoint: string = useMemo(() => `${getOrigin()}${getPath()}`, []);

    const get = useCallback(async <T,>(request: GetRequest): Promise<Response<T>> => {
        const _url = await _buildUrl(request.url, request.query);
        return _handleRequest<T>(_url, request.options);
    }, []);

    const post = useCallback(async <T,>(request: PostRequest): Promise<Response<T>> => {
        const _url = await _buildUrl(request.url, request.query);
        request.options.method = 'post';
        request.options.body = JSON.stringify(request.options.body);
        return _handleRequest<T>(_url, request.options);
    }, []);

    const put = useCallback(async <T,>(request: PutRequest): Promise<Response<T>> => {
        const _url = await _buildUrl(request.url, request.query);
        request.options.method = 'put';
        request.options.body = JSON.stringify(request.options.body);
        return _handleRequest<T>(_url, request.options);
    }, []);

    const patch = useCallback(async <T,>(request: PatchRequest): Promise<Response<T>> => {
        const _url = await _buildUrl(request.url, request.query);
        request.options.method = 'patch';
        request.options.body = JSON.stringify(request.options.body);
        return _handleRequest<T>(_url, request.options);
    }, []);

    const del = useCallback(async <T,>(request: DeleteRequest): Promise<Response<T>> => {
        const _url = await _buildUrl(request.url, request.query);
        request.options.method = 'delete';
        request.options.body = JSON.stringify(request.options.body);
        return _handleRequest<T>(_url, request.options);
    }, []);

    const _handleRequest = useCallback(async <T,>(_url: string, options: RequestOptions = {}): Promise<Response<T>> => {
        let response;
        try {
            response = await fetch(_url, options);
        } catch (error) {
            throw new FetchError(JSON.stringify(error), _url);
        } finally {
            return await _handleResponse(response, _url);
        }
    }, []);

    const _handleResponse = useCallback(async <T,>(response: globalThis.Response | undefined, url: string): Promise<Response<T>> => {
        if (response === undefined) {
            throw new ApiError(`Errore nella comunicazione con il server per la richiesta \n${url}\n`, response);
        }
        if (!response.ok) {
            throw new ApiError(`Errore nella richiesta ${url}. Codice: ${response.status}, Stato: ${response.statusText}`, response);
        }
        let data = await response.json();
        _checkError(data);
        const result: Response<T> = {
            code: response.status,
            data
        }
        return result;
    }, []);

    const _checkError = useCallback((data: any) => {
        if ('success' in data && data.success === false) {
            let errorMessage = 'Error';
            const error = Object.keys(data).find(key => key.startsWith('err'));
            if (typeof error === 'string') {
                errorMessage = error;
            }
            throw new Error(errorMessage);
        }
    }, []);

    const _buildUrl = useCallback((url: string, query: RequestQuery = {}) => {
        let _endpoint = endpoint;
        if (url[0] !== '/') {
            url = '/' + url;
        }
        _endpoint += url;
        if (query.search) {
            if (typeof query.search !== 'string') {
                _endpoint += stringifySearch(query.search, '?');
            }
        }
        if (query.fragment) {
            if (typeof query.fragment !== 'string') {
                _endpoint += stringifySearch(query.fragment, '#');
            }
        }
        return endpoint;
    }, [endpoint]);

    const value = useMemo(() => ({
        get, post, patch, put, del
    }), [
        get, post, patch, put, del
    ]);

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export const useApi = () => {
    const context = useContext(ApiContext);

    if (context === undefined) {
        throw new Error("Component is out of ApiProvider");
    }

    if (context === null) {
        throw new Error("Error loading ApiContext");
    }

    return context;
}


class ApiError extends Error {

    response: globalThis.Response | undefined;

    constructor(message: string, response: globalThis.Response | undefined) {
        super(message);
        this.name = 'ApiError';
        this.response = response;
    }

    get status() {
        return this.response?.status;
    }

    get headers() {
        return this.response?.headers;
    }

    getHeader(name: string) {
        if (this.headers) {
            return this.headers.get(name);
        }
    }
}

class FetchError extends Error {

    constructor(message: string, url: string) {
        super(`${message}: ${url}`);
        this.name = 'FetchError';
    }

}