import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './models/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './models/jwt-payload.interface';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/models/product.entity';
import { ChangeItemInListDto } from './models/item-adding.dto';
import { use } from 'passport';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private productService: ProductsService,
    ) {}

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {email, password} = authCredentialsDto;

        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ email, password: hashedPassword, addresses: [] });

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

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {email, password} = authCredentialsDto; 

        const user = await this.userRepository.findOneBy({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {email};
            const accessToken = this.jwtService.sign(payload);
            return {accessToken}
        } else {
            throw new UnauthorizedException('Please check login credentials')
        }

    }

    async addToList(user: User, changeItemInListDto: ChangeItemInListDto): Promise<string> {
        const product: Product = await this.productService.findProductById(changeItemInListDto.productId);

        if (changeItemInListDto.listToAddTo === 'cart') {
            if (!user.cart) {
                user.cart = [];
            }
            user.cart.push(product);
        } else if (changeItemInListDto.listToAddTo === 'wishlist') {
            if (!user.wishlist) {
                user.wishlist = [];
            }
            user.wishlist.push(product);
        }

        await this.userRepository.save(user);

        return 'success'
    }

    async removeFromList(user: User, changeItemInListDto: ChangeItemInListDto): Promise<string> {
        const product: Product = await this.productService.findProductById(changeItemInListDto.productId);

        if (changeItemInListDto.listToAddTo === 'cart') {
            if (!user.cart) {
                user.cart = [];
            }
            user.cart = user.cart.filter(item => item.id !== product.id);
        } else if (changeItemInListDto.listToAddTo === 'wishlist') {
            if (!user.wishlist) {
                user.wishlist = [];
            }
            user.wishlist = user.wishlist.filter(item => item.id !== product.id);
        }        

        await this.userRepository.save(user);

        return 'success'
    }
}
