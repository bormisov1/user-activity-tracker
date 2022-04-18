export declare class TrackDto {
    event: string;
    tags: string[];
    url: string;
    title: string;
    ts: string;
}
export declare class CreateTrackDto {
    tracks: TrackDto[];
}
