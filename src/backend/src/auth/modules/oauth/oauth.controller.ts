import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '../../decorators';
import { TwoFactorsService } from '../two-factors/two-factors.service';
import { OAuthUserDto, OAuthSignUpDto, OAuthSigninDto } from './dto';
import { OAuth2Guard } from './guard';
import { OauthService } from './oauth.service';

@Controller()
export class OauthController {
  private readonly client_id = process.env['OAUTH_42_CLIENT_ID'];

  constructor(
    private service: OauthService,
    private twoFactor: TwoFactorsService,
  ) {}

  @Get('client_id')
  getOAuthClientId() {
    return { client_id: this.client_id };
  }

  @Post('signin')
  @UseGuards(OAuth2Guard)
  async oauthSignIn(@User() user: OAuthUserDto, @Body() body: OAuthSigninDto) {
    // console.log(body);
    return this.service.oauthSignIn(user, body);
  }

  @Post('signup')
  async oauthSignUp(@Body() dto: OAuthSignUpDto) {
    return this.service.oauthSignUp(dto);
  }

  @Get('signup-temp-token')
  @UseGuards(OAuth2Guard)
  async oauthSignUpTempToken(@User() user: OAuthUserDto) {
    return {
      jwt: await this.service.signTempToken({ oAuthUser: user }),
    };
  }
}
