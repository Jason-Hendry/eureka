import {Readable} from "stream";

export interface PutFile {
    filepath: string
    body: Buffer|Uint8Array|Blob|string|Readable
}
export interface PutFileResponse {
    filename: string
}

export interface StorageConfig {
    GetClient: () => {  PutObject: (file: PutFile) => Promise<PutFileResponse> }
}

export class FileStorage {
    protected config: StorageConfig

    private constructor(config: StorageConfig) {
        this.config = config;
    }
    public static Create(config: StorageConfig) {
        return new FileStorage(config)
    }
    public PutFile(file: PutFile): Promise<PutFileResponse> {
        return this.config.GetClient().PutObject(file)
    }
}

export class InvalidCredentialsException extends Error {

}