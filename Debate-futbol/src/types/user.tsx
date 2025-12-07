export interface user{
    id: string,
    name: string,
    email: string,
    password: string,
    permission: permissionLevel[]
    team: string
}

export type permissionLevel='admin'|'user';