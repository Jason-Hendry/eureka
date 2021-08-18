import https from "https";

export const getFile = (url: URL): Promise<string> => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: url.hostname,
            port: 443,
            path: url.pathname,
            method: 'GET'
        }

        const data: Uint8Array[] = []

        console.log({options})

        const req = https.get(url, res => {
            console.log(`statusCode: ${res.statusCode}`)
            if (res.statusCode && res.statusCode >= 400) {
                reject(res.statusMessage)
            }
            res.on('data', d => {
                console.log(d)
                data.push(d)
            })
            res.on('end', () => {
                resolve(Buffer.concat(data).toString())
            })
        })

        req.on('error', error => {
            reject(error)
        })
    })
}