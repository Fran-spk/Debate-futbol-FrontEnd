export interface user{
    id: number,
    name: string,
    email: string,
    password: string,
    permissionLevel: permissionLevel[]
    team: string
}

export type permissionLevel='admin'|'user';