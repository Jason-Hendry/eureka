import * as React from "react";

import {AWSCredentials as AWSCreds} from "../../services/Login";

export const Secret = React.createContext("secret")
export const AWSCredentials = React.createContext<AWSCreds>({SessionToken:"",SecretAccessKey:"",AccessKeyId:"", Expiration:""})
