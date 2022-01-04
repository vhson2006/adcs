import { Body, Controller, Request, Get, Patch, Param, StreamableFile, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as QRCode from 'qrcode';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account-dto';
import { Public } from 'src/common/decorators/public.decorator';
import { INCORRECT, CORRECT } from 'src/config/app.constant';
import { tranformAccount } from './account.transformer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Private } from 'src/common/decorators/private.decorator';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async detail(@Request() req) {
    const account = await this.accountService.detail(req.user.id);
    if (account === INCORRECT) {
      return {
        status: INCORRECT,
        messeage: 'Account is invalid'
      }
    }
    return {
      status: CORRECT,
      data: tranformAccount(account)
    }
  }

  @Patch()
  async update(@Request() req, @Body() updateAccountDto: UpdateAccountDto) {
    const response = await this.accountService.update(req.user.id, updateAccountDto);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        messeage: 'Update error'
      }
    }

    return {
      status: CORRECT,
      data: []
    }
  }

  @Get('qrcode')
  async getFile(@Request() req, @Res() res): Promise<any> {
    const account = await this.accountService.detail(req.user.id);
    if (account === INCORRECT) {
      return {
        status: INCORRECT,
        messeage: 'Account is invalid'
      }
    }
    
    const pathToFile = `data/${req.user.username}.jpg`;
    await QRCode.toFile(
      pathToFile,
      [{ data: ['https://shoutamatethealternative.com.au', 'cafe', account.code].join('/'), mode: 'byte' }]
    );

    res.setHeader('Content-disposition', 'attachment; filename=' + 'qrcode.jpg');
    const sourceFile = createReadStream(join(process.cwd(), pathToFile));
    sourceFile.pipe(res);
    return new StreamableFile(sourceFile);
  }

  @Get('print')
  @Private()
  async print() {
    const data = await this.accountService.list();
    data.map(async (account) => {
      await QRCode.toFile(
        `${account.position}.jpg`,
        [{ data: ['https://shoutamatethealternative.com.au', 'cafe', account.code].join('/'), mode: 'byte' }]
      );
    })
    return {
      status: data,
      data: []
    }
  }

  @Get(':code')
  @Public()
  async checkCode(@Param() params) {
    const { code } = params;
    const response = await this.accountService.checkCode(code);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        messeage: 'Code is invalid'
      }
    }

    return {
      status: response,
      data: []
    }
  }
}


