export interface QNFileOptions {
    name: string,
    size: number;
}

export enum QNFileState {
    Default = "Default",
    Buffering = "Buffering",
    Transfering = "Transfering",
    Success = "Success",
    Error = "Error"
}

export class QNFile {

    public id: string;
    public name: string;
    public size: number;
    public state: QNFileState = QNFileState.Default;
    public progress: number = 0;
    public file?: File;

    constructor(name: string, size: number) {
        this.id = new Date().valueOf().toString();
        this.name = name;
        this.size = size;
    }

    public set setState(state: QNFileState) {
        if(state) {
            this.state = state;
        }
    }    

}