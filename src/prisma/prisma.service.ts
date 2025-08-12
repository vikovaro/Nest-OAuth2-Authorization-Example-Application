import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'event',
                    level: 'error',
                },
            ],
        });
    }

    async onModuleInit() {
        try {
            this.$on('error', async (event) => {
                await this.handlePrismaError(event.message);
            });
            await this.$connect();
        } catch (error) {
            await this.handlePrismaError(error);
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect();
        } catch (error) {
            await this.handlePrismaError(error);
        }
    }

    private async handlePrismaError(error: any) {
        console.error(`Prisma error occured: ${error}`);
        throw error;
    }
}
