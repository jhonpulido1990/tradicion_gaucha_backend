import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { Request } from 'express';
import { User } from '../users/user.entity'; // Ajusta la ruta según tu estructura

interface AuthRequest extends Request {
  user: User;
}

@UseGuards(AuthGuard('jwt'))
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  async addToWishlist(
    @Req() req: AuthRequest,
    @Param(
      'productId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            'El productId debe tener formato UUID v4 válido.',
          ),
      }),
    )
    productId: string,
  ) {
    return this.wishlistService.addToWishlist(req.user, productId);
  }

  @Delete(':productId')
  async removeFromWishlist(
    @Req() req: AuthRequest,
    @Param(
      'productId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            'El productId debe tener formato UUID v4 válido.',
          ),
      }),
    )
    productId: string,
  ) {
    return this.wishlistService.removeFromWishlist(req.user, productId);
  }

  @Get()
  async getWishlist(
    @Req() req: AuthRequest,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.wishlistService.getWishlist(
      req.user,
      Number(page),
      Number(limit),
    );
  }
}
