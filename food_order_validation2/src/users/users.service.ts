import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserData } from 'src/interfaces/userdata.interface';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}


    async findOne(username: string) {
        const userFound = await this.userRepository.findOne({
            where: {username: username}
        });

        return userFound;
    };


    async save(userData: UserData) {
        const userInstance = this.userRepository.create(userData);

        const userSaved = await this.userRepository.save(userInstance);

        return userSaved.id
    }
};
