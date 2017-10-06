const StorageManager = (function () {

  const M = { 
    _getDate: function(){ return Date.now(); } 
  };

  const isExpired = function (data) {
      if (!data.exp) return false;
      const ageInSec = (M._getDate() - data.timestamp)/1000;
      return ageInSec >= data.exp;
  }

  const set = function (key, value, expiry) {
    const data = {
      val: value,
      exp: expiry,
      timestamp: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  const get = function (key) {
    const dataJson = localStorage.getItem(key);
    if (!dataJson) return undefined;

    const data = JSON.parse(dataJson);
    return isExpired(data) || data.val == null ? undefined : data.val;
  }

  const remove = function (key) {
    localStorage.removeItem(key);
  }

  const setProperty = function (key, property, value, expiry) {
    const storedValue = get(key);
    if (typeof (storedValue) !== "object") throw new Error("Can't add property to non object value");
    const newValue = Object.assign(storedValue, { [property]: value });
    set(key, newValue, expiry);
  }

  return Object.assign(M, {
    set: set,
    get: get,
    remove: remove,
    setProperty: setProperty
  })
})()

export default StorageManager;
