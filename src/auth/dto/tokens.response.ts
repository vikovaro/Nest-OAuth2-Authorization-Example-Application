import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse implements ITokensResponse {
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWFjM2QzZC1jN2Y2LTQzMDMtYjg1ZC1lYWIxNGQxNmU5OWYiLCJyb2xlIjoiQWRtaW4iLCJ0eXBlIjoiQWNjZXNzIiwiZGF0ZSI6MTczMDQxODQyODc1OCwiaWF0IjoxNzMwNDE4NDI4LCJleHAiOjE3MzA0MjIwMjh9.ekuxgA-ONUoZsydxxsI3yhI6dT_luQZe6SQmf1nHxJs',
    })
    @Expose()
    accessToken: string;
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWFjM2QzZC1jN2Y2LTQzMDMtYjg1ZC1lYWIxNGQxNmU5OWYiLCJyb2xlIjoiQWRtaW4iLCJ0eXBlIjoiUmVmcmVzaCIsImRhdGUiOjE3MzA0MTg0Mjg3NTgsImlhdCI6MTczMDQxODQyOCwiZXhwIjoxNzMzMDEwNDI4fQ.SluTx1-6imI8FOugyKA6Zmost2cCqdheiZ1yglutodw',
    })
    @Expose()
    refreshToken: string;
}

export interface ITokensResponse {
    accessToken: string;
    refreshToken: string;
}
