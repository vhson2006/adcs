import { Body, Controller, Request, Patch, Post, Get, Query, Delete, Param, StreamableFile, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { RedeemService } from './redeem.service';
import { InviteDto } from './dto/invite.dto';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateRedeemDto } from './dto/update-redeem.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AccountService } from 'src/account/account.service';
import { createObjectCsvWriter } from 'csv-writer';


@ApiTags('redeem')
@Controller('redeem')
export class RedeemController {
  constructor(
    private readonly redeemService: RedeemService,
    private readonly accountService: AccountService
  ) {}

  @Get()
  async getRedeems(@Request() req, @Query() query: PaginationQueryDto) {
    const response = await this.redeemService.getList(req.user.id, query);
    return {
      status: CORRECT,
      data: response,
    }
  }

  @Patch(':id')
  async updateRedeem(@Request() req, @Param('id') id: string, @Body() updateRedeemDto: UpdateRedeemDto) {
    const response = await this.redeemService.updateRedeem(req.user.id, id, updateRedeemDto);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: "Can't update redeem"
      }
    }
    return {
      status: CORRECT,
      data: [],
    }
  }

  @Delete(':id')
  async deleteRedeem(@Request() req, @Param('id') id: string) {
    const response = await this.redeemService.deleteRedeem(req.user.id, id);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: "Can't delete redeem"
      }
    }
    return {
      status: CORRECT,
      data: [],
    }
  }

  @Public()
  @Post('invite')
  async invite(@Body() inviteDto: InviteDto) {
    const response = await this.redeemService.invite(inviteDto);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong'
      }
    }

    return {
      status: CORRECT
    }
  }

  @Post('claim')
  async claim(@Request() req, @Body() claimDto) {
    const response = await this.redeemService.claim(req.user.id, claimDto);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Inforamtion is invalid'
      }
    }

    return {
      status: response
    }
  }

  @Get('download')
  async download(@Request() req, @Res() res) {
    const account = await this.accountService.detail(req.user.id);
    if (account === INCORRECT) {
      return {
        status: INCORRECT,
        messeage: 'Account is invalid'
      }
    }

    const pathToFile = `data/${req.user.username}.csv`;
    const response = await this.redeemService.getList(req.user.id, {
      search: '',
      page: 1,
      size: 1000,
    });

    const csvWriter = createObjectCsvWriter({
      path: pathToFile,
      header: [
        {id: 'fromFirstName', title: 'From Firstname'},
        {id: 'fromLastName', title: 'From Lastname'},
        {id: 'toFirstName', title: 'To Firstname'},
        {id: 'toLastName', title: 'To Lastname'},
        {id: 'toPhone', title: 'Phone Number'},
        {id: 'status', title: 'Status'},
        {id: 'created', title: 'Invite Time'},
      ]
    })
   
    await csvWriter.writeRecords(response.data);

    res.setHeader('Content-disposition', 'attachment; filename=' + `report.csv`);
    const sourceFile = createReadStream(join(process.cwd(), pathToFile));
    sourceFile.pipe(res);
    return new StreamableFile(sourceFile);
  }
}
