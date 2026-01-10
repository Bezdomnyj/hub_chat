import type { KeyValueUrlEntity, ParsedSearch } from "../../shared/entities/Api";

export const parseSearch = (search: string): ParsedSearch => {
    const result: ParsedSearch = {};
    if (!search) {
        return result;
    }
    const parts = search.split('&');
    for (const part of parts) {
        const [key, value] = part.split('=');
        result[key] = value || '';
    }
    return result;
}
export const stringifySearch = (search: ParsedSearch, symbol: '#' | '?' = '?'): string => {
    if (!search) {
        return '';
    }
    let result: string = symbol;
    Object.keys(search).forEach(
        (key: string) => {
            if (search[key]) {
                result += `${key}=${search[key]}&`;
            } else {
                result += `${key}&`;
            }
        }
    );
    if (result.endsWith('&')) {
        result = result.slice(0, result.length - 1)
    }
    return result;
}
export const getHref = (): string => {
    return window.location.href;
}
export const getHostname = (): string => {
    return new URL(window.location.href).hostname;
}
export const getOrigin = (): string => {
    return window.location.origin;
}
export const getPath = (): string => {
    return window.location.pathname;
}
export const getQuery = (parsed: boolean = false): string | KeyValueUrlEntity => {
    const query = window.location.search.replace('?', '');
    return parsed && parseSearch(query) || query;
}
export const getFragment = (parsed: boolean = false): string | KeyValueUrlEntity => {
    const fragment = window.location.search.replace('#', '');
    return parsed && parseSearch(fragment) || fragment;
}
export const getProtocol = (): string => {
    const parts = window.location.origin.split('//')
    return parts.length > 1 && parts[0] || 'https:';
}
export const getPort = (): string | null => {
    const parts = window.location.origin.split(':')
    return parts.length > 2 && parts[2] || null;
}
export const getEnvironment = (normalized: boolean = true): string => {
    const thirdLevelDomain = getThirdLevelDomain(false);
    const parts = thirdLevelDomain.split('-');
    if (parts.length > 1) {
        return normalized && `${parts[0]}-` || parts[0];
    }
    return '';
}
export const getThirdLevelDomain = (normalized: boolean = true, defaultValue: string = ''): string => {
    const parts = window.location.origin.split(':');
    if (parts.length <= 1) {
        return defaultValue;
    }
    const _parts = parts[1].split('.');
    if (_parts.length <= 1) {
        return defaultValue;
    }
    let thirdLevelDomain = _parts.length > 1 && _parts[0].replaceAll('/', '');
    if (!thirdLevelDomain) {
        return defaultValue;
    }
    if (!normalized) {
        return thirdLevelDomain;
    }
    const normalizedThirdLevelDomain = thirdLevelDomain.split('-');
    return normalizedThirdLevelDomain.length <= 1 && normalizedThirdLevelDomain[0] || normalizedThirdLevelDomain[1] || defaultValue;
}
export const getSecondLevelDomain = (defaultValue: string = ''): string => {
    const parts = window.location.hostname.split('.');
    return parts[1] || defaultValue;
}
export const getTopLevelDomain = (defaultValue: string = ''): string => {
    const parts = window.location.origin.split(getSecondLevelDomain() + '.');
    const _parts = parts[1].split(':');
    return _parts[0] || defaultValue;
}