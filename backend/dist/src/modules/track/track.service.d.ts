/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { TrackDto } from './dto/track.dto';
export declare class TrackService {
    private trackModel;
    constructor(trackModel: Model<TrackDocument>);
    create(tracks: TrackDto[]): Promise<(Track & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
