export interface user{
    _id: string,
    name: string,
    email: string,
    password: string,
    permissions: permissionLevel[]
    team: string,
    active: boolean
}

export type permissionLevel='admin'|'user';