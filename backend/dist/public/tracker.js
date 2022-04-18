let buff = [];
const tracker = {
    track(event, ...tags) {
        buff.push({
            event,
            tags,
            url: window.location.href,
            title: window.document.title,
            ts: toISOLocal(new Date())
        });
    }
};
function toISOLocal(d) {
    const z = n => ('0' + n).slice(-2);
    const zz = n => ('00' + n).slice(-3);
    let off = d.getTimezoneOffset();
    const sign = off > 0 ? '-' : '+';
    off = Math.abs(off);
    return d.getFullYear() + '-'
        + z(d.getMonth() + 1) + '-' +
        z(d.getDate()) + 'T' +
        z(d.getHours()) + ':' +
        z(d.getMinutes()) + ':' +
        z(d.getSeconds()) + '.' +
        zz(d.getMilliseconds()) +
        sign + z(off / 60 | 0) + ':' + z(off % 60);
}
function tick() {
    if (buff.length >= 3) {
        const buffCopy = Object.assign([], buff);
        buff = [];
        const buffJSON = JSON.stringify({ tracks: buffCopy });
        send(buffJSON).then(res => {
        }).catch(err => {
            buff = buffCopy.concat(buff);
        });
    }
}
async function send(body) {
    try {
        const response = await fetch('http://localhost:8001/api/v1/tracks', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log(`Error! status: ${response.status}`);
            return false;
        }
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
        }
        else {
            console.log('unexpected error: ', error);
        }
        return false;
    }
}
setInterval(tick, 1000);
//# sourceMappingURL=tracker.js.map