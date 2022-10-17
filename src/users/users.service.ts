import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.model';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => FirebaseService))
    private readonly firebaseService: FirebaseService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    userDto.uid = await this.firebaseService
      .createNewUserInFirebase(userDto.email, userDto.password)
      .catch((e) => {
        throw new BadRequestException(e.message);
      });
    const createUser = new this.userModel(userDto);
    return createUser.save();
  }

  public getUidOfLoggedInUser(): string {
    if (this.request && this.request['user']) {
      return this.request['user'].uid;
    }
    return null;
  }

  async getLoggedInUser(): Promise<User> {
    const uid = this.getUidOfLoggedInUser();
    return this.userModel.findOne({ uid });
  }
}
