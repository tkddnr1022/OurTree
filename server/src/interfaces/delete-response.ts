import { ApiProperty } from "@nestjs/swagger";

export class DeleteResponse{
    @ApiProperty({description: "성공 여부"})
    success : boolean;
    @ApiProperty({description: "에러"})
    error?: any;
}