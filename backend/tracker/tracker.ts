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
    // const blob = new Blob([body], {type : 'application/json; charset=UTF-8'});
    const fd = new FormData()
    fd.append('tracks', body)
    // const response = await navigator.sendBeacon('http://localhost:8001/api/v1/tracks', blob);
    const response = await navigator.sendBeacon('http://localhost:8001/api/v1/tracks', fd);
    // const response = await fetch('http://localhost:8001/api/v1/tracks', {
    //     method: 'POST',
    //     body,
    //     headers: {'Content-Type': 'application/json'}
    // })
    if (!response) {
        return false
    }
    return true
}

window.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        console.log('unload', location.href)
        tick(true)
    }
})

/*window.addEventListener('beforeunload', function(event) {
    // distinguish browser closed and page changed?
    console.log('unload')
    const blob = new Blob([JSON.stringify({tracks: buff})], {type: 'application/json'})
    //const fd = new FormData()
    //fd.append('tracks', JSON.stringify(buff))
    navigator.sendBeacon('http://localhost:8001/api/v1/tracks', fd)
    tick(true)
})

window.addEventListener('unload', function(event) {
    console.log('unload2')
    const blob = new Blob([JSON.stringify({tracks: buff})], {type: 'application/json'})
    //const fd = new FormData()
    //fd.append('tracks', JSON.stringify(buff))
    navigator.sendBeacon('http://localhost:8001/api/v1/tracks', blob)
    //tick(true)
})*/

// window.onbeforeunload = async function(event) {
//     // distinguish browser closed and page changed?
//     console.log('unload')
//     await tick(true)
// }

setInterval(tick, 1000)
