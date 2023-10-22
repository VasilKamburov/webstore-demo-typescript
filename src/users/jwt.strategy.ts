import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./models/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: 'topSecret5',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {email} = payload;

        const user: User = await this.userRepository.findOneBy({email});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}