import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeUserDto } from './dto/suscription-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @ApiOperation({ summary: 'Suscribe un usuario al newsletter' })
  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  async subscribe(@Body() subscribeDto: SubscribeUserDto) {
    return this.newsletterService.subscribe(subscribeDto);
  }

  @ApiOperation({ summary: 'Obtiene todos los usuarios suscriptos' })
      @Get() 
      @HttpCode(HttpStatus.OK)
      getAllUsersSuscriber() {
          return this.newsletterService.getUsersSuscriber();
      }
}
