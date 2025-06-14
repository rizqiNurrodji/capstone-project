    import { Injectable } from '@nestjs/common';
    import { PassportStrategy } from '@nestjs/passport';
    import { ExtractJwt, Strategy } from 'passport-jwt';
    import { ConfigService } from '@nestjs/config';

    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy) {
        constructor(private configService: ConfigService) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: configService.get<string>('JWT_SECRET') || 'default_jwt_secret',
            });
        }

        async validate(payload: any) {
            // payload adalah isi dari token setelah didecode
            return {
                id: payload.id,
                email: payload.email,
                username: payload.username,
            };
        }
    }
