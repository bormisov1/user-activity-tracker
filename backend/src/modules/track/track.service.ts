import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  create(tracks: TrackDto[]) {
    return this.trackModel.insertMany(tracks)
  }
}
