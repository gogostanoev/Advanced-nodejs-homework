import { Role } from "./role.enum";

export interface UserData {
    username: string;
    password: string;
    role: Role
}