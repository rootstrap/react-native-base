import { MMKV } from 'react-native-mmkv';

type Value = string;

export enum StoreKeys {
  session = 'session',
}

export * from './parser';

class Storage {
  #Store = new MMKV();

  getString(key: StoreKeys) {
    return this.#Store.getString(key);
  }

  setValue(key: StoreKeys, value: Value) {
    return this.#Store.set(key, value);
  }

  deleteValue(key: StoreKeys) {
    this.#Store.delete(key);
  }

  deletePartial(keys: StoreKeys[]) {
    keys.forEach(key => this.#Store.delete(key));
  }

  removeAll() {
    this.#Store.clearAll();
  }

  addValueListener(onValueChanged: (value: Value) => void) {
    return this.#Store.addOnValueChangedListener(onValueChanged);
  }
}

export default new Storage();
