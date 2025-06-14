import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/user-auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMyTransactions(@Req() req: Request) {
        const user = req.user as any;
        return this.transactionService.getTransactionsByUserId(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('input')
    async createTransaction(@Req() req: Request, @Body('text') text: string) {
        const user = req.user as any;
        return this.transactionService.createTransaction(user.id, text);
    }

    @UseGuards(JwtAuthGuard)
    @Post('prediction')
    async getPrediction(@Req() req: Request, @Body() body: any) {
        const user = req.user as any;
        const account = await this.transactionService.getAccount(user.id);
        const periods = Number(body.periods) || 7; // default 7 hari jika tidak dikirim
        return this.transactionService.getPrediction(account.account_id, periods);
    }
}
