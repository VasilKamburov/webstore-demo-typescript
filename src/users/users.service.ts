import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './models/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {email, password} = authCredentialsDto;

        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ email, password: hashedPassword });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') { //duplicate username
                throw new ConflictException('This email has a linked accound');
            } else {
                throw new InternalServerErrorException();
            }
        }


        return 'Success';
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {email, password} = authCredentialsDto; 

        const user = await this.userRepository.findOneBy({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success'
        } else {
            throw new UnauthorizedException('Please check login credentials')
        }

    }
}
