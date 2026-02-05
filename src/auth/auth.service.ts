import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(username: string, password: string): Promise<AuthResponseDto> {
    const user = this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMAtch = await bcrypt.compare(password, user.password);

    if (!isMAtch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      expiresIn: '1h',
    };
  }
}
