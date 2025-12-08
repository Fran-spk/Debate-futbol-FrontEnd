export interface user{
    _id: string,
    name: string,
    email: string,
    password: string,
    permissions: permissionLevel[]
    team: string
}

export type permissionLevel='admin'|'user';