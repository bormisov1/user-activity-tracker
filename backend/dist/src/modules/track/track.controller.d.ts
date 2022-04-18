import { TrackService } from './track.service';
import { CreateTrackDto } from './dto';
export declare class TrackController {
    private readonly trackService;
    constructor(trackService: TrackService);
    createTrack(dto: CreateTrackDto): Promise<void>;
}
