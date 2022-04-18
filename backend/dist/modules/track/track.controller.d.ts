import { TrackService } from './track.service';
import { CreateTrackDto } from './dto';
export declare class TrackController {
    private readonly trackService;
    constructor(trackService: TrackService);
    getTracks(): Promise<string>;
    createTrack(dto: CreateTrackDto): Promise<import("./schemas/track.schema").Track>;
}
