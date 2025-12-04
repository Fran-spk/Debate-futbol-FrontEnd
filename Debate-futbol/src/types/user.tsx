export interface user{
    id: number,
    name: string,
    email: string,
    password: string,
    permission: permissionLevel[]
    team: string
}

export type permissionLevel='admin'|'user';