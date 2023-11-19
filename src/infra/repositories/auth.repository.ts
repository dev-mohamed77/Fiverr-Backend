import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { BadRequestException } from '@nestjs/common';
import { passwordHash } from '../../application/core/utilities/password_hash';
import * as crypto from 'crypto';

export class AuthRepositoryImp implements IAuthRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async signIn(email: string): Promise<UserEntity> {
    if (!email) {
      throw new BadRequestException('email is required');
    }

    const user = await this.repo.findOne({
      where: { email: email },
      relations: { seller: true },
    });

    return user;
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    if (!name || !email || !password) {
      throw new BadRequestException('name and email , password are required');
    }
    const isEmail = await this.repo.findOneBy({ email: email });

    if (isEmail) {
      throw new BadRequestException('Email already exists');
    }

    const user: User = await this.repo.save(<User>{
      name: name,
      email: email,
      password: password,
    });

    return user;
  }

  async forgetPassword(email: string): Promise<string> {
    if (!email) {
      throw new BadRequestException('email is required');
    }

    const user = await this.repo.findOneBy({ email });
    if (!user) {
      throw new BadRequestException(
        `There is no user with that email ${email}`,
      );
    }

    const resetCode = Math.floor(10000 + Math.random() * 900000).toString();

    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    await this.repo.update(user.id, {
      passwordResetCode: hashedResetCode,
      passwordResetExpires: new Date(Date.now() + 2 * 60 * 1000),
      passwordResetVerified: false,
    });

    return `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The pixel store Team`;
  }

  async verifyPassResetCode(resetCode: string): Promise<UserEntity> {
    if (!resetCode) {
      throw new BadRequestException('resetCode required');
    }

    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    const user = await this.repo.findOneBy({
      passwordResetCode: hashedResetCode,
    });

    if (!user) {
      throw new BadRequestException('Reset code invalid');
    }

    const now = new Date(Date.now());
    if (user.passwordResetExpires < now) {
      throw new Error('Reset token has expired');
    }

    user.passwordResetVerified = true;

    await this.repo.update(user.id, {
      passwordResetVerified: true,
    });

    return user;
  }

  async resetPassword(email: string, password: string): Promise<UserEntity> {
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.repo.findOneBy({ email: email });

    if (!user) {
      throw new BadRequestException(`There is no user with email ${email}`);
    }

    if (!user.passwordResetVerified) {
      throw new BadRequestException(`Reset code not verified`);
    }

    const passHash = await passwordHash(password);

    await this.repo.update(user.id, {
      password: passHash,
      passwordResetCode: null,
      passwordResetExpires: null,
      passwordResetVerified: null,
    });

    return user;
  }
}
