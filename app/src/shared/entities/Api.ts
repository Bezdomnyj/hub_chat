export type ParsedSearch = Record<string, string | number>;

export type KeyValueUrlEntity = string | ParsedSearch

export interface Response<T = any> {
    code: number;
    data: T;
}

export type Request = {
    url: string;
    query?: RequestQuery;
}

export type RequestOptions = {
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string;
    keepalive?: boolean;
    mode?: RequestMode;
    priority?: RequestPriority;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: null;
}

export type MutateRequestOptions = {
    body?: any;
}

export type RequestQuery = {
    search?: string | ParsedSearch;
    fragment?: string | ParsedSearch;
}

export type GetRequest = Request & {
    options?: RequestOptions & {
        method?: 'get';
    }
}

export type PostRequest = Request & {
    options: RequestOptions & MutateRequestOptions & {
        method?: 'post';
    }
}

export type PutRequest = Request & {
    options: RequestOptions & MutateRequestOptions & {
        method?: 'put';
    }
}

export type DeleteRequest = Request & {
    options: RequestOptions & MutateRequestOptions & {
        method?: 'delete';
    }
}

export type PatchRequest = Request & {
    options: RequestOptions & MutateRequestOptions & {
        method?: 'patch';
    }
}
