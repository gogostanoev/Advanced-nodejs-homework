import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from "src/interfaces/role.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            ignoreExpiration: false,

            secretOrKey: 'hardcoded_secret',
        });
    };

    async validate(payload: {ID: string, username: string, role: Role}) {
        return {
            ID: payload.ID,
            username: payload.username,
            role: payload.role
        };
    };
};
