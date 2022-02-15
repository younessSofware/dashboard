export interface Header{
    name: string,
    title: string,
    type?: string,
    width?: string,
    default?: string,
    hidden?: boolean,
    value?: any,
    values?: string[],
    sort?: boolean,
    align?: string,
    link?: string,
    maxLength?: number,
    options?: string[],
    reverseBooleanColors?: boolean
}
