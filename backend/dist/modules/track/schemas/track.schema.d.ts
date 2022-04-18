/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare class Track {
    event: string;
    tags: string[];
    url: string;
    title: string;
    ts: Date;
}
export declare type TrackDocument = Track & Document;
export declare const TrackSchema: import("mongoose").Schema<Document<Track, any, any>, import("mongoose").Model<Document<Track, any, any>, any, any, any>, {}, {}>;
