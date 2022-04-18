import { Model } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
export declare class TrackService {
    private trackModel;
    constructor(trackModel: Model<TrackDocument>);
    create(createTrackDto: CreateTrackDto): Promise<Track>;
    findAll(): Promise<Track[]>;
}
