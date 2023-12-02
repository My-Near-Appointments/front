export class LocalStorageService {
  static set<T = any>(key: string, value: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch(error) {
      console.error(error);
    }
  }

  static get(key: string) {
    try {
      const content = window.localStorage.getItem(key);
      return content ? JSON.parse(content) : '';

    } catch(error) {
      console.error(error);
    }
  }

  static remove(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch(error) {
    console.error(error);
    }
  }
}
