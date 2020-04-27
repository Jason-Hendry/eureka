import {IncomingMessage, ServerResponse} from "http";
import {Interface} from "readline";

const crypto = require('crypto');

interface RegisterRequest {
   password: string,
   email: string,
}

export default ({body}: {body: RegisterRequest}, res) => {
        const secret = crypto.randomBytes(20);
        console.log(secret)
        const hash = crypto.createHmac('sha256', secret)
            .update(body.password)
            .digest('hex');
        console.log(secret)

        res.json({hash, email: body.email})
}
