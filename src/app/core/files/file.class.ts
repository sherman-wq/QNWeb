export interface QNFileOptions {
    name: string,
    size: number;
    type: string;
    lastModified?: string | number;
    content?: string | Blob | ArrayBuffer;
    path?: string;
    url?: string;
}

export enum QNFileState {
    Default = "Default",
    Buffering = "Buffering",
    Transfering = "Transfering",
    Success = "Success",
    Error = "Error"
}

export class QNFile {

    public name: string;
    public size: number;
    public type: string;
    public state: QNFileState = QNFileState.Default;
    public lastModified?: Date;
    public content?: string | Blob | ArrayBuffer;
    public path?: string;
    public url?: string;

    constructor(options: QNFileOptions) {
        this.name = options.name;
        this.size = options.size;
        this.type = options.type;

        this.lastModified = options?.lastModified ? new Date(options.lastModified) : new Date();
        this.content = options?.content ?? undefined;
        this.path = options?.path ?? undefined;
        this.path = options?.url ?? undefined;
    }

}