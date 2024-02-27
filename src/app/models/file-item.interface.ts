export interface IQNFile {
    name: string;
    size: number;
    type: string;
    lastModified?: Date;
    content?: string | ArrayBuffer | Blob;
    path?: string;
    url?: string;
}
