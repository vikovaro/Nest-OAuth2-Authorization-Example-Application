import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Session implements ISession {
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJyb2xlIjoidGVzdDEiLCJ0eXBlIjoiQWNjZXNzIiwiZGF0ZSI6MTc0NjYyOTI5OTgwNiwiaWF0IjoxNzQ2NjI5Mjk5LCJleHAiOjE3NDY2Mjk1OTl9._YHuCqtkpUetBNnoUdYXjkRDeGl2tgGXrG1viSbcgsY',
    })
    @Expose()
    accessToken: string;

    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJyb2xlIjoidGVzdDEiLCJ0eXBlIjoiUmVmcmVzaCIsImRhdGUiOjE3NDY2MjkyOTk4MDYsImlhdCI6MTc0NjYyOTI5OSwiZXhwIjoxNzQ5MjIxMjk5fQ.OhVmmosdGiY9ymA1IxGmqbgo9TRIdA-siZGR1oDMwCE',
    })
    @Expose()
    refreshToken: string;

    @ApiProperty({ example: 1 })
    @Expose()
    userId: number;
}

export interface ISession {
    accessToken: string;
    refreshToken: string;
    userId: number;
}
