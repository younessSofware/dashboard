export interface Header{
    name: string,
    title: string,
    type?: 'input' | 'image' | 'select' | 'textarea' | 'number' | 'string' |  'date' | 'checkbox' | 'text' | 'email' | 'password' | 'input-list' | 'select-tags' | 'hidden' | 'tag' | 'map' | 'multi-select' | 'cover' | 'color' | 'phone',
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
    tagsColors?: any
}
