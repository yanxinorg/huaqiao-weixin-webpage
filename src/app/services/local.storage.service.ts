import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

    private _local: any;

    constructor() {
        this._local = {};
    }

    /**
     * 保存键值
     * @param key
     * @param value
     */
    public set(key: string, value: string): void {
        this._local[key] = value;
    }

    /**
     * 获取数据
     * @param key
     * @returns {any|string}
     */
    public get(key: string): string {
        return this._local[key] || '';
    }

    /**
     * 保存对象
     * @param key
     * @param value
     */
    public setObject(key: string, value: any): void {
        this._local[key] = JSON.stringify(value);
    }

    /**
     * 获取对象
     * @param key
     * @returns {any}
     */
    public getObject(key: string): any {
        return JSON.parse(this._local[key] || '{}');
    }

    /**
     * 移除
     * @param key
     */
    public remove(key: string): any {
        this._local.removeItem(key);
    }
}
