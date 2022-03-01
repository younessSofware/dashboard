export interface Header{
    name: string,
    title: string,
    type?: 'input' | 'image' | 'select' | 'textarea' | 'number' | 'string' |  'date' | 'checkbox' | 'text' | 'email' | 'password' | 'input-list' | 'select-tags' | 'hidden',
    width?: string,
    default?: string,
    hidden?: boolean,
    value?: any,
    values?: string[],
    sort?: boolean,
    align?: string,
    link?: string,
    maxLength?: number,
    parents?: string[],
    reverseBooleanColors?: boolean,
    search?: boolean;
}
