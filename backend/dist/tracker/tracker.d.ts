interface Tracker {
    track(event: string, ...tags: string[]): void;
}
interface Event {
    event: string;
    tags: string[];
    url: string;
    title: string;
    ts: string;
}
declare let buff: Event[];
declare const tracker: Tracker;
declare function toISOLocal(d: Date): string;
declare function tick(exiting: boolean): Promise<boolean | void>;
declare function send(body: string): Promise<boolean>;
