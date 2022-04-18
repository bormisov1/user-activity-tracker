import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator';
import {plainToClass, Transform, Type} from "class-transformer";

export class TrackDto {
  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  event: string;

  @ApiProperty({type: [String]})
  @IsArray()
  tags: string[];

  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({type: String})
  @IsString()
  @IsNotEmpty()
  ts: string;
}

export class CreateTrackDto {
  @ApiProperty({type: [TrackDto]})
  @Transform(({ value }) => plainToClass(TrackDto,JSON.parse(value)))
  @IsNotEmpty()
  @ValidateNested({each:true})
  @Type(() => TrackDto)
  tracks: TrackDto[];
}
