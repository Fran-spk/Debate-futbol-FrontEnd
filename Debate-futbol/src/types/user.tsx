export interface user{
    id: number,
    name: string,
    username: string,
    email: string,
    permissionLevel: permissionLevel[]
    club: string
}

export type permissionLevel='admin'|'user';