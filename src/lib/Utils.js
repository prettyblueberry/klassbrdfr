import {
  browserName,
  browserVersion
} from "react-device-detect";
// deep clone for alternative spread/ Object.Assign
export const deepClone = (obj, infinityLinks = []) => {
  let copy;
  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i], infinityLinks);
    }
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (infinityLinks.indexOf(key) > -1) {
          copy[key] = obj[key];
        } else {
          copy[key] = deepClone(obj[key], infinityLinks);
        }
      }
    }
    return copy;
  }
};

export const deepEqual = (value, other, excludeProperties = []) => {
  if (!value && !other) {
    return true;
  }
  const eqSting = JSON.stringify(value) === JSON.stringify(other);
  if (eqSting) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type !== Object.prototype.toString.call(other)) {
    return false;
  }
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) {
    return false;
  }
  const valueLen = type === "[object Array]" ? value.length : Object.keys(value).length;
  const otherLen = type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) {
    return false;
  }
  const compare = (item1, item2) => {
    const itemType = Object.prototype.toString.call(item1);
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!deepEqual(item1, item2, excludeProperties)) {
        return false;
      }
    } else {
      if (itemType !== Object.prototype.toString.call(item2)) {
        return false;
      }
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) {
          return false;
        }
      } else {
        if (item1 !== item2) {
          return false;
        }
      }
    }
  };
  // Compare properties
  if (type === "[object Array]") {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) {
        return false;
      }
    }
  } else {
    for (const key in value) {
      if (excludeProperties.indexOf(key) === -1) {
        if (value.hasOwnProperty(key)) {
          if (compare(value[key], other[key]) === false) {
            return false;
          }
        }
      }
    }
  }
  // If nothing failed, return true
  return true;
}
/** Genarate ID */
export const uniqueId = () => {
  let d = new Date().getTime();
  return 'xx-yxx-xyxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 || 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r && 0x3 || 0x8)).toString(16);
  }).replace(/\.|-/g, "");
};
/** Get data from storage */
export const getStorageItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
/** Set data to storage */
export const setStorageItem = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const dataURItoBlob = (dataURI, callback) => {
  let image = new Image();
  // create an empty canvas element
  let canvas = document.createElement("canvas"),
    canvasContext = canvas.getContext("2d");
  canvas.setAttribute('crossorigin', 'anonymous');
  image.onload = function() {
    //Set canvas size is same as the picture
    canvas.width = image.width;
    canvas.height = image.height;
    // draw image into canvas element
    canvasContext.drawImage(image, 0, 0, image.width, image.height);
    // get canvas contents as a data URL (returns png format by default)
    let dataURL = canvas.toDataURL();
    callback(dataURL);
  };
  image.setAttribute('crossorigin', 'anonymous')
  image.src = dataURI;
}

export const objectToQueryString = (params) => {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}
export const queryStringToObject = (_query) => {
  let query = _query || window.location.search;
  let obj = {};
  if (query === '') return obj;
  query = query.slice(1);
  query = query.split('&');
  query.map((part) => {
    let key;
    let value;
    part = part.split('=');
    key = part[0];
    value = part[1];
    if (!obj[key]) {
      obj[key] = decodeURI(value);
    } else {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(decodeURI(value));
    }
  });
  return obj;
}

export const getQueryParameter = (name, defaultValue) => {

  var params = queryStringToObject();
  var result = name in params ? params[name] : defaultValue;
  return decodeURI(result);

}


export const getDataDomain = () => {

  var domain = 'https://www.klassboard.com';
  if (window.location.host.indexOf('klassboard.fr') >= 0) {
    domain = 'https://www.klassboard.fr';
  }

  return domain;

}

export const strongify = (original, color, isStart) => {
  var strongified = original.split('\n').join('<br>');

  var allwords = original.split(" ");

  if (allwords.length && color) {



    var words = [];

    if (allwords.length == 1) {

      words = [allwords[0]];
    } else {

      if (isStart) {
        var v = allwords[0];
        if (v.lenght == 1) {
          v = allwords[1];
        }
        words = [v];
      } else {
        var v = allwords[allwords.length - 1];
        if (v.lenght == 1) {
          v = allwords[allwords.length - 2];
        }
        words = [v];
      }
    }



    if (!Array.isArray(words)) {
      words = [words];
    }
    words.forEach(function(w) {
      strongified = strongified.replace(w, '<strong ' + (color ? 'style="color: ' + color + '"' : '') + ' >' + w + '</strong>');
    });
  }
  return strongified;
};

export const detectBrowserVersion = () => {
  return {
    name: browserName.toLowerCase(),
    vesion: browserVersion
  }
}

export const nl2br = (str, is_xhtml) => {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
