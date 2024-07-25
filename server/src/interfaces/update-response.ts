import { ApiProperty } from "@nestjs/swagger";

export class UpdateResponse{
    @ApiProperty({description: "성공 여부"})
    success : boolean;
    @ApiProperty({description: "데이터 개수"})
    count?: number = 0;
    @ApiProperty({description: "에러"})
    error?: any;
}