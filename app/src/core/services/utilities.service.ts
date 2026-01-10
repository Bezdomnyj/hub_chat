const getWords = (label: string): string[] => {
    return [...label.matchAll(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|[a-z]+(?=[_-])/g)].map(el => el[0].toLowerCase());
}

export const toCamelCase = (label: string) => getWords(label).map(
    (e, i) => i === 0 && e || e[0].toUpperCase() + e.slice(1)
).join('');

export const toPascalCase = (label: string) => getWords(label).map(
    e => e[0].toUpperCase() + e.slice(1)
).join('');

export const toKebabCase = (label: string) => getWords(label).join('-');

export const toSnakeCase = (label: string) => getWords(label).join('_');

const bodyElement = document.body;
let scrollPosition = 0;

export const disableBodyScroll = (): void => {
    if (bodyElement) {
        scrollPosition = window.pageYOffset;
        bodyElement.style.overflow = "hidden";
        bodyElement.style.position = "fixed";
        bodyElement.style.top = `-${scrollPosition}px`;
        bodyElement.style.width = "100%";
    }
};

export const enableBodyScroll = (): void => {
    if (bodyElement) {
        bodyElement.style.removeProperty("overflow");
        bodyElement.style.removeProperty("position");
        bodyElement.style.removeProperty("top");
        bodyElement.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
    }
};