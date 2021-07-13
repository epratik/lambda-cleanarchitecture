
export interface ICacheManager {
    get(key: string): any;
    put<T>(key: string, value: T, duration: number): void;
}