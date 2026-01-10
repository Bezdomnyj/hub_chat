import type { LinkHTMLAttributes, MetaHTMLAttributes } from "react"

export type MetaAction = 'add' | 'remove'

export type BaseHeadElement = {
    tag: string
}
export type MetaHeadElement = BaseHeadElement & {
    tag: 'meta'
    attributes?: MetaHTMLAttributes<'meta'>
}
export type LinkHeadElement = BaseHeadElement & {
    tag: 'link'
    attributes?: LinkHTMLAttributes<'link'>
}
export type TitleHeadElement = BaseHeadElement & {
    tag: 'title'
    value: string | null
}

const headElementsHandler = (data: MetaHeadElement | LinkHeadElement | TitleHeadElement) => {
    const element = document.createElement(data.tag);
    switch (data.tag) {
        case 'meta':
        case 'link':
            if (!data.attributes) {
                return;
            }
            if (data.attributes.id) {
                document.head.querySelector(`#${data.attributes.id}`)?.remove();
            }
            for (const attribute in data.attributes) {
                /*@ts-ignore*/
                element.setAttribute(attribute, data.attributes[attribute]);
            }
            document.head.appendChild(element);
            break;
        case 'title':
            document.head.querySelector('title')?.remove();
            element.textContent = data.value;
            document.head.insertBefore(element, document.head.firstChild);
            break;
    }
}

export const hs_meta = (attributes?: MetaHTMLAttributes<'meta'>) => {
    headElementsHandler({
        tag: 'meta',
        attributes: attributes ?? {}
    });
}
export const hs_link = (attributes?: LinkHTMLAttributes<'link'>) => {
    headElementsHandler({
        tag: 'link',
        attributes: attributes ?? {}
    });
}
export const hs_title = (value: string | null) => {
    headElementsHandler({
        tag: 'title',
        value: value
    });
}