export enum ERole {
    Admin = 'Admin',
    User = 'User',
}

export type TRole = keyof typeof ERole;
