class LocalStorageService {
    static setItem(key: string, value: object | number | string | boolean) {
        let valueToSave: string = JSON.stringify(value);
        window.localStorage.setItem(key, valueToSave);
    }
    static getItem<T>(key: string) {
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value) as T;
        }
    }
    static remove(key: string) {
        window.localStorage.removeItem(key);
    }
}

export default LocalStorageService;
