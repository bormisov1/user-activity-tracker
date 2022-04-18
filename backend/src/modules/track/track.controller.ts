import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  ParseArrayPipe
} from '@nestjs/common';
import { TrackService } from './track.service';
import {CreateTrackDto, TrackDto} from './dto';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller({path: 'tracks'})
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('tracks'))
  async createTrack(@Body() dto: CreateTrackDto) {
    this.trackService.create(dto.tracks);
  }
}
