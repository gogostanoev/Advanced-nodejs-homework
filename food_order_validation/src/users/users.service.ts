import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            username: "john_lemon",
            password: "orange123"
        },
        {
            id: 2,
            username: "bob_bobski",
            password: "firewater"
        },
        {
            id: 3,
            username: "hava_niceday",
            password: "gotyou"
        }
    ];

    async findOne(username: string) {
        const userFound = this.users.find((user) => user.username === username);

        return userFound;
    };
};
