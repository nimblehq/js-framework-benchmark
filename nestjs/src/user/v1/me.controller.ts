import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserService } from '../user.service';

@Controller('/v1/me')
@UseGuards(AuthGuard)
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async authenticate(@Request() request, @Response() response) {
    try {
      const { id: userId } = request.cookies;

    } catch (error) {
      response.status(302).redirect('/').send();
    }
  }
}
