var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var buff = [];
var tracker = {
    track: function (event) {
        var tags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            tags[_i - 1] = arguments[_i];
        }
        buff.push({
            event: event,
            tags: tags,
            url: window.location.href,
            title: window.document.title,
            ts: toISOLocal(new Date())
        });
    }
};
function toISOLocal(d) {
    // Date to format: 2022-04-16T13:01:31.008+05:00
    var z = function (n) { return ('0' + n).slice(-2); };
    var zz = function (n) { return ('00' + n).slice(-3); };
    var off = d.getTimezoneOffset();
    var sign = off > 0 ? '-' : '+';
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
        var buffCopy_1 = Object.assign([], buff);
        buff = [];
        var buffJSON = JSON.stringify(buffCopy_1);
        return send(buffJSON)["catch"](function (err) {
            buff = buffCopy_1.concat(buff);
        });
    }
}
function send(body) {
    return __awaiter(this, void 0, void 0, function () {
        var fd, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fd = new FormData();
                    fd.append('tracks', body);
                    return [4 /*yield*/, navigator.sendBeacon('http://localhost:8001/api/v1/tracks', fd)];
                case 1:
                    response = _a.sent();
                    // const response = await fetch('http://localhost:8001/api/v1/tracks', {
                    //     method: 'POST',
                    //     body,
                    //     headers: {'Content-Type': 'application/json'}
                    // })
                    if (!response) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
window.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        console.log('unload', location.href);
        tick(true);
    }
});
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
setInterval(tick, 1000);
