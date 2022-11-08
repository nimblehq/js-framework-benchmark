import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { DatabaseService } from '../database.service';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AuthController],
      providers: [AuthService, DatabaseService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });
});
