export interface ClienteStatus {
    banned: boolean,
    banStart?: Date
    banEnd?: Date | null
    banRazon?: string
}