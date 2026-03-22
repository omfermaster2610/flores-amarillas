const https = require('https');
https.get('https://www.youtube.com/results?search_query=las+avispas+juan+luis+guerra+lyric', (res) => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
        const matches = [...raw.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(x => x[1]);
        const unique = [...new Set(matches)].slice(0, 10);
        console.log(unique.join('\n'));
    });
});
