import StorageManager from './storage-manager';

describe('Storage manager should store and retrieve local data persistently ', () => {

  it('should be avail as window.getStorageManager()', () => {
    const expected = StorageManager;
    //when
    const actual = window.getStorageManager();
    //then
    expect(expected).toBe(actual);
  });

  it('should store and retrieve value', () => {
    const expected = 'some value';
    //when
    StorageManager.set('some key 1', expected);
    const actual = StorageManager.get('some key 1');
    //then
    expect(expected).toBe(actual);
  });

  it('should return undefined if it doesnt exist', () => {
    //when
    const actual = StorageManager.get('some not exist key');
    //then
    expect(actual).toBe(undefined);
  });

  it('can remove the value that is stored under the given key', () => {
    //when
    StorageManager.set('some key 2', 'some value');
    StorageManager.remove('some key 2');
    const actual = StorageManager.get('some not exist key');
    //then
    expect(actual).toBe(undefined);
  });

  it('can add the given property with the given value to stored object', () => {
    //when
    StorageManager.set('some key 3', {});
    StorageManager.setProperty('some key 3', 'someProp', 123);
    const actual = StorageManager.get('some key 3');
    //then
    expect(actual.someProp).toBe(123);
  });

  it('should throws on adding prop to non object', () => {
    //when
    StorageManager.set('some key 4', 1);
    //then
    expect(function () {
      StorageManager.setProperty('some key 4', 'someProp', 123);;
    })
      .toThrow(new Error("Can't add property to non object value"));
  });

  it('should return undefined if value is expired', () => {
        const expirationSec = 1;
        //when
        const _getDate = StorageManager._getDate;
        StorageManager._getDate = function() {
          return Date.now() + 1000;
        };
        StorageManager.set('some key 1', 'some value', expirationSec);
        const actual = StorageManager.get('some key 1');
        //then
        expect(actual).toBe(undefined);

        StorageManager._getDate = _getDate;
  });
});
