import { EMPTY, Observable } from "rxjs";
import { QNFile, QNFileState } from "./file.class";

export function handleUploadProgress(item: QNFile, result: any) {

    if(result.type === 0) {
        console.log(`Процесс загрузки начался:`);
        item.state = QNFileState.Transfering;
    }

    if (result.type === 1) {
        console.log(`Прогресс загрузки: ${result.progress}%`);
    } else if (result.type === 3) {
        console.log('Ответ сервера:', result.data);
        item.state = QNFileState.Default;
    }
}
  
export function handleUploadError(item: QNFile, error: Error) {
    console.error('Ошибка загрузки:', error);
    item.state = QNFileState.Error;
    return EMPTY;
}
  
export function checkUploadComplete(item: QNFile) {
    // Эта функция может использоваться для выполнения действий после каждой загрузки,
    // например, для проверки, завершены ли все загрузки.
    // Пока что она просто обновляет состояние файла, если это еще не было сделано.
    if (item.state === QNFileState.Transfering) {
    item.state = QNFileState.Default;
    }
}