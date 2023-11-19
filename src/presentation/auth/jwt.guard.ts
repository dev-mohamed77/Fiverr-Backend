import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private userService: UserService) {
    super();
  }

  // @ts-ignore
  async handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw new UnauthorizedException(
        'You are not authenticated or Token is valid',
      );
    }

    const currentUser = await this.userService.getUserByIdService({
      id: user.id,
      relation: {
        seller: true,
      },
      select: {
        seller: {
          id: true,
          fullName: true,
        },
      },
    });

    if (!currentUser) {
      const message = 'The user that belong to this token does no longer exist';
      throw new BadRequestException(message);
    }

    if (currentUser.passwordChangedAt) {
      const passChangedTimestamp =
        currentUser.passwordChangedAt.getTime() / 1000;

      if (passChangedTimestamp > user.iat) {
        const message =
          'User recently changed his password. please login again..';
        throw new UnauthorizedException(message);
      }
    }

    return currentUser;
  }
}
