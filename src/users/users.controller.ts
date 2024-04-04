import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  register(@Body() name: string) {
    return this.usersService.register(name);
  }

  @Post('play')
  startPlay(
    @Body() player: { bet_points: number; predicted_multiplier: number },
  ) {
    return this.usersService.startPlay(player);
  }
}
