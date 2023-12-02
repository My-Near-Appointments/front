export class LocalStorageService {
  static isLocalStorageAvailable() {
    return typeof window !== 'undefined' &&
      typeof localStorage !== 'undefined';
  }

  static set<T = any>(key: string, value: T) {
    if (!LocalStorageService.isLocalStorageAvailable()) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string) {
    if (!LocalStorageService.isLocalStorageAvailable()) {
      return;
    }

    const content = localStorage.getItem(key);

    if (!content) {
      return;
    }

    return JSON.parse(content);
  }

  static remove(key: string) {
    if (!LocalStorageService.isLocalStorageAvailable()) {
      return;
    }

    localStorage.removeItem(key);
  }
}
