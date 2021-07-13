export interface IDBHelper{
    put(tableName: string, item: { [key: string]: any }): void;
}