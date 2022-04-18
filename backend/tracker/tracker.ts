interface Tracker {
    track(event: string, ...tags: string[]): void
}

interface Event {
    event: string
    tags: string[]
    url: string
    title: string
    ts: string
}

let buff: Event[] = []

const tracker: Tracker = {
    track(event: string, ...tags) {
        buff.push({
            event,
            tags,
            url: window.location.href,
            title: window.document.title,
            ts: toISOLocal(new Date())
        } as Event)
    }
}

function toISOLocal(d: Date): string {
    // Date to format: 2022-04-16T13:01:31.008+05:00
    const z  = n =>  ('0' + n).slice(-2)
    const zz = n => ('00' + n).slice(-3)
    let off = d.getTimezoneOffset()
    const sign = off > 0? '-' : '+'
    off = Math.abs(off)

    return d.getFullYear() + '-'
        + z(d.getMonth()+1) + '-' +
        z(d.getDate()) + 'T' +
        z(d.getHours()) + ':'  +
        z(d.getMinutes()) + ':' +
        z(d.getSeconds()) + '.' +
        zz(d.getMilliseconds()) +
        sign + z(off/60|0) + ':' + z(off%60)
}

function tick(exiting: boolean) {
    if (buff.length >= 3 || exiting) {
        const buffCopy = Object.assign([], buff)
        buff = []
        const buffJSON = JSON.stringify(buffCopy)
        return send(buffJSON).catch(err => {
            buff = buffCopy.concat(buff)
        })
    }
}

async function send(body: string): Promise<boolean> {
    const formData = new FormData()
    formData.append('tracks', body)
    return navigator.sendBeacon('http://localhost:8001/api/v1/tracks', formData);
}

window.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') tick(true)
})

setInterval(tick, 1000)
