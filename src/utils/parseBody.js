// parses urlencoded request body and returns a callback with the parsed data
export default function bodyParser(req, callback) {
    let query = '';
    req.body.on('data', (chunk) => {
        query += chunk.toString();
    });
    req.body.on('end', () => {
        let data = new URLSearchParams(query);
        callback(data);
    });
};
