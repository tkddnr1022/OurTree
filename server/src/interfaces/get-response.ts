import { ApiProperty } from "@nestjs/swagger";

export class GetResponse {
    @ApiProperty({ description: "성공 여부" })
    success: boolean;
    @ApiProperty({ description: "데이터" })
    data?: any;
    @ApiProperty({ description: "에러" })
    error?: any;
}