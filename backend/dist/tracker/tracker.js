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
function tick(exiting) {
    if (buff.length >= 3 || exiting) {
        const buffCopy = Object.assign([], buff);
        buff = [];
        const buffJSON = JSON.stringify(buffCopy);
        return send(buffJSON).catch(err => {
            buff = buffCopy.concat(buff);
        });
    }
}
async function send(body) {
    const fd = new FormData();
    fd.append('tracks', body);
    const response = await navigator.sendBeacon('http://localhost:8001/api/v1/tracks', fd);
    if (!response) {
        return false;
    }
    return true;
}
window.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        console.log('unload', location.href);
        tick(true);
    }
});
setInterval(tick, 1000);
//# sourceMappingURL=tracker.js.map