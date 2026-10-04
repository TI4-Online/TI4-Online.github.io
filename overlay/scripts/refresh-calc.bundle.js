var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// overlay/scripts/ti4calc2/core/enums.js
var require_enums = __commonJS({
  "overlay/scripts/ti4calc2/core/enums.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Place = exports.Faction = void 0;
    var Faction2;
    (function(Faction3) {
      Faction3["arborec"] = "Arborec";
      Faction3["argent_flight"] = "Argent flight";
      Faction3["barony_of_letnev"] = "Barony of Letnev";
      Faction3["clan_of_saar"] = "Clan of Saar";
      Faction3["creuss"] = "Creuss";
      Faction3["crimson_rebellion"] = "Crimson Rebellion";
      Faction3["deepwrought"] = "Deepwrought";
      Faction3["empyrean"] = "Empyrean";
      Faction3["hacan"] = "Hacan";
      Faction3["jol_nar"] = "Jol-Nar";
      Faction3["keleres"] = "Keleres";
      Faction3["l1z1x"] = "L1z1x";
      Faction3["mahact"] = "Mahact";
      Faction3["mentak"] = "Mentak";
      Faction3["muaat"] = "Muaat";
      Faction3["naaz_rokha"] = "Naaz-Rokha";
      Faction3["naalu"] = "Naalu";
      Faction3["nekro"] = "Nekro";
      Faction3["neutral"] = "Neutral";
      Faction3["nomad"] = "Nomad";
      Faction3["sardakk_norr"] = "Sardakk N'orr";
      Faction3["sol"] = "Sol";
      Faction3["titans_of_ul"] = "Titans of Ul";
      Faction3["vuil_raith"] = "Vuil'Raith";
      Faction3["winnu"] = "Winnu";
      Faction3["xxcha"] = "Xxcha";
      Faction3["yin"] = "Yin";
      Faction3["yssaril"] = "Yssaril";
    })(Faction2 || (exports.Faction = Faction2 = {}));
    var Place2;
    (function(Place3) {
      Place3["space"] = "Space";
      Place3["ground"] = "Ground";
    })(Place2 || (exports.Place = Place2 = {}));
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map = getNative(root, "Map");
    module.exports = Map;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// node_modules/lodash/_arrayEach.js
var require_arrayEach = __commonJS({
  "node_modules/lodash/_arrayEach.js"(exports, module) {
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    module.exports = arrayEach;
  }
});

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    module.exports = defineProperty;
  }
});

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

// node_modules/lodash/_copyObject.js
var require_copyObject = __commonJS({
  "node_modules/lodash/_copyObject.js"(exports, module) {
    var assignValue = require_assignValue();
    var baseAssignValue = require_baseAssignValue();
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    module.exports = copyObject;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// node_modules/lodash/_baseAssign.js
var require_baseAssign = __commonJS({
  "node_modules/lodash/_baseAssign.js"(exports, module) {
    var copyObject = require_copyObject();
    var keys = require_keys();
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    module.exports = baseAssign;
  }
});

// node_modules/lodash/_nativeKeysIn.js
var require_nativeKeysIn = __commonJS({
  "node_modules/lodash/_nativeKeysIn.js"(exports, module) {
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = nativeKeysIn;
  }
});

// node_modules/lodash/_baseKeysIn.js
var require_baseKeysIn = __commonJS({
  "node_modules/lodash/_baseKeysIn.js"(exports, module) {
    var isObject = require_isObject();
    var isPrototype = require_isPrototype();
    var nativeKeysIn = require_nativeKeysIn();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeysIn;
  }
});

// node_modules/lodash/keysIn.js
var require_keysIn = __commonJS({
  "node_modules/lodash/keysIn.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeysIn = require_baseKeysIn();
    var isArrayLike = require_isArrayLike();
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    module.exports = keysIn;
  }
});

// node_modules/lodash/_baseAssignIn.js
var require_baseAssignIn = __commonJS({
  "node_modules/lodash/_baseAssignIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }
    module.exports = baseAssignIn;
  }
});

// node_modules/lodash/_cloneBuffer.js
var require_cloneBuffer = __commonJS({
  "node_modules/lodash/_cloneBuffer.js"(exports, module) {
    var root = require_root();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  }
});

// node_modules/lodash/_copyArray.js
var require_copyArray = __commonJS({
  "node_modules/lodash/_copyArray.js"(exports, module) {
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    module.exports = copyArray;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// node_modules/lodash/_copySymbols.js
var require_copySymbols = __commonJS({
  "node_modules/lodash/_copySymbols.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbols = require_getSymbols();
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    module.exports = copySymbols;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// node_modules/lodash/_getPrototype.js
var require_getPrototype = __commonJS({
  "node_modules/lodash/_getPrototype.js"(exports, module) {
    var overArg = require_overArg();
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    module.exports = getPrototype;
  }
});

// node_modules/lodash/_getSymbolsIn.js
var require_getSymbolsIn = __commonJS({
  "node_modules/lodash/_getSymbolsIn.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var getPrototype = require_getPrototype();
    var getSymbols = require_getSymbols();
    var stubArray = require_stubArray();
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };
    module.exports = getSymbolsIn;
  }
});

// node_modules/lodash/_copySymbolsIn.js
var require_copySymbolsIn = __commonJS({
  "node_modules/lodash/_copySymbolsIn.js"(exports, module) {
    var copyObject = require_copyObject();
    var getSymbolsIn = require_getSymbolsIn();
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }
    module.exports = copySymbolsIn;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// node_modules/lodash/_getAllKeysIn.js
var require_getAllKeysIn = __commonJS({
  "node_modules/lodash/_getAllKeysIn.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbolsIn = require_getSymbolsIn();
    var keysIn = require_keysIn();
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }
    module.exports = getAllKeysIn;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set2 = getNative(root, "Set");
    module.exports = Set2;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap = getNative(root, "WeakMap");
    module.exports = WeakMap;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports, module) {
    var DataView = require_DataView();
    var Map = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// node_modules/lodash/_initCloneArray.js
var require_initCloneArray = __commonJS({
  "node_modules/lodash/_initCloneArray.js"(exports, module) {
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function initCloneArray(array) {
      var length = array.length, result = new array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    module.exports = initCloneArray;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array2 = root.Uint8Array;
    module.exports = Uint8Array2;
  }
});

// node_modules/lodash/_cloneArrayBuffer.js
var require_cloneArrayBuffer = __commonJS({
  "node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
    var Uint8Array2 = require_Uint8Array();
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    module.exports = cloneArrayBuffer;
  }
});

// node_modules/lodash/_cloneDataView.js
var require_cloneDataView = __commonJS({
  "node_modules/lodash/_cloneDataView.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    module.exports = cloneDataView;
  }
});

// node_modules/lodash/_cloneRegExp.js
var require_cloneRegExp = __commonJS({
  "node_modules/lodash/_cloneRegExp.js"(exports, module) {
    var reFlags = /\w*$/;
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    module.exports = cloneRegExp;
  }
});

// node_modules/lodash/_cloneSymbol.js
var require_cloneSymbol = __commonJS({
  "node_modules/lodash/_cloneSymbol.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    module.exports = cloneSymbol;
  }
});

// node_modules/lodash/_cloneTypedArray.js
var require_cloneTypedArray = __commonJS({
  "node_modules/lodash/_cloneTypedArray.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    module.exports = cloneTypedArray;
  }
});

// node_modules/lodash/_initCloneByTag.js
var require_initCloneByTag = __commonJS({
  "node_modules/lodash/_initCloneByTag.js"(exports, module) {
    var cloneArrayBuffer = require_cloneArrayBuffer();
    var cloneDataView = require_cloneDataView();
    var cloneRegExp = require_cloneRegExp();
    var cloneSymbol = require_cloneSymbol();
    var cloneTypedArray = require_cloneTypedArray();
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return new Ctor();
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return new Ctor();
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    module.exports = initCloneByTag;
  }
});

// node_modules/lodash/_baseCreate.js
var require_baseCreate = __commonJS({
  "node_modules/lodash/_baseCreate.js"(exports, module) {
    var isObject = require_isObject();
    var objectCreate = Object.create;
    var baseCreate = /* @__PURE__ */ (function() {
      function object() {
      }
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    })();
    module.exports = baseCreate;
  }
});

// node_modules/lodash/_initCloneObject.js
var require_initCloneObject = __commonJS({
  "node_modules/lodash/_initCloneObject.js"(exports, module) {
    var baseCreate = require_baseCreate();
    var getPrototype = require_getPrototype();
    var isPrototype = require_isPrototype();
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    module.exports = initCloneObject;
  }
});

// node_modules/lodash/_baseIsMap.js
var require_baseIsMap = __commonJS({
  "node_modules/lodash/_baseIsMap.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var mapTag = "[object Map]";
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }
    module.exports = baseIsMap;
  }
});

// node_modules/lodash/isMap.js
var require_isMap = __commonJS({
  "node_modules/lodash/isMap.js"(exports, module) {
    var baseIsMap = require_baseIsMap();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsMap = nodeUtil && nodeUtil.isMap;
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
    module.exports = isMap;
  }
});

// node_modules/lodash/_baseIsSet.js
var require_baseIsSet = __commonJS({
  "node_modules/lodash/_baseIsSet.js"(exports, module) {
    var getTag = require_getTag();
    var isObjectLike = require_isObjectLike();
    var setTag = "[object Set]";
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }
    module.exports = baseIsSet;
  }
});

// node_modules/lodash/isSet.js
var require_isSet = __commonJS({
  "node_modules/lodash/isSet.js"(exports, module) {
    var baseIsSet = require_baseIsSet();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsSet = nodeUtil && nodeUtil.isSet;
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
    module.exports = isSet;
  }
});

// node_modules/lodash/_baseClone.js
var require_baseClone = __commonJS({
  "node_modules/lodash/_baseClone.js"(exports, module) {
    var Stack = require_Stack();
    var arrayEach = require_arrayEach();
    var assignValue = require_assignValue();
    var baseAssign = require_baseAssign();
    var baseAssignIn = require_baseAssignIn();
    var cloneBuffer = require_cloneBuffer();
    var copyArray = require_copyArray();
    var copySymbols = require_copySymbols();
    var copySymbolsIn = require_copySymbolsIn();
    var getAllKeys = require_getAllKeys();
    var getAllKeysIn = require_getAllKeysIn();
    var getTag = require_getTag();
    var initCloneArray = require_initCloneArray();
    var initCloneByTag = require_initCloneByTag();
    var initCloneObject = require_initCloneObject();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isMap = require_isMap();
    var isObject = require_isObject();
    var isSet = require_isSet();
    var keys = require_keys();
    var keysIn = require_keysIn();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_FLAT_FLAG = 2;
    var CLONE_SYMBOLS_FLAG = 4;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          result = isFlat || isFunc ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key2) {
          result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
      }
      var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
      var props = isArr ? void 0 : keysFunc(value);
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
      return result;
    }
    module.exports = baseClone;
  }
});

// node_modules/lodash/cloneDeep.js
var require_cloneDeep = __commonJS({
  "node_modules/lodash/cloneDeep.js"(exports, module) {
    var baseClone = require_baseClone();
    var CLONE_DEEP_FLAG = 1;
    var CLONE_SYMBOLS_FLAG = 4;
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }
    module.exports = cloneDeep;
  }
});

// overlay/scripts/ti4calc2/util/util-debug.js
var require_util_debug = __commonJS({
  "overlay/scripts/ti4calc2/util/util-debug.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.startDebugTimer = void 0;
    exports.isTest = isTest;
    var startDebugTimer = (taskName = "The task") => {
      const timer = {
        startTime: /* @__PURE__ */ new Date(),
        end: () => {
          const timeMs = (/* @__PURE__ */ new Date()).getTime() - timer.startTime.getTime();
          const tmp = Math.floor(timeMs / 100);
          const seconds = tmp / 10;
          if (seconds === 0) {
            console.log(`${taskName} took exactly ${timeMs} milliseconds`);
          } else if (seconds === Math.floor(seconds)) {
            console.log(`${taskName} took ${seconds}.0 seconds`);
          } else {
            console.log(`${taskName} took ${seconds} seconds`);
          }
        }
      };
      return timer;
    };
    exports.startDebugTimer = startDebugTimer;
    function isTest() {
      var _a;
      return typeof process !== "undefined" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((_a = process.env) === null || _a === void 0 ? void 0 : _a.JEST_WORKER_ID) !== void 0;
    }
  }
});

// overlay/scripts/ti4calc2/core/constant.js
var require_constant = __commonJS({
  "overlay/scripts/ti4calc2/core/constant.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LOG = exports.ROLLS_BETWEEN_UI_UPDATE = exports.NUMBER_OF_ROLLS = exports.ROLLS_WHEN_BUILDING_TEST_DATA = void 0;
    var util_debug_1 = require_util_debug();
    exports.ROLLS_WHEN_BUILDING_TEST_DATA = 1e6;
    exports.NUMBER_OF_ROLLS = 2e4;
    exports.ROLLS_BETWEEN_UI_UPDATE = 1e3;
    exports.LOG = exports.NUMBER_OF_ROLLS === 1 && !(0, util_debug_1.isTest)();
  }
});

// overlay/scripts/ti4calc2/util/util-log.js
var require_util_log = __commonJS({
  "overlay/scripts/ti4calc2/util/util-log.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logWrapper = logWrapper;
    var constant_1 = require_constant();
    function logWrapper(...args) {
      if (constant_1.LOG) {
        console.log(args);
      }
    }
  }
});

// overlay/scripts/ti4calc2/core/unit.js
var require_unit = __commonJS({
  "overlay/scripts/ti4calc2/core/unit.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UNIT_MAP = exports.defaultRoll = exports.UnitType = void 0;
    exports.getUnitWithImproved = getUnitWithImproved;
    exports.createUnit = createUnit;
    exports.createUnitAndApplyEffects = createUnitAndApplyEffects;
    var cloneDeep_1 = __importDefault(require_cloneDeep());
    var util_log_1 = require_util_log();
    var enums_1 = require_enums();
    var UnitType2;
    (function(UnitType3) {
      UnitType3["cruiser"] = "cruiser";
      UnitType3["carrier"] = "carrier";
      UnitType3["destroyer"] = "destroyer";
      UnitType3["dreadnought"] = "dreadnought";
      UnitType3["fighter"] = "fighter";
      UnitType3["flagship"] = "flagship";
      UnitType3["infantry"] = "infantry";
      UnitType3["mech"] = "mech";
      UnitType3["pds"] = "pds";
      UnitType3["warsun"] = "warsun";
      UnitType3["other"] = "other";
      UnitType3["nonunit"] = "nonunit";
    })(UnitType2 || (exports.UnitType = UnitType2 = {}));
    exports.defaultRoll = {
      hit: 0,
      hitBonus: 0,
      hitBonusTmp: 0,
      count: 1,
      countBonus: 0,
      countBonusTmp: 0,
      reroll: 0,
      rerollBonus: 0,
      rerollBonusTmp: 0
    };
    var carrier = {
      type: UnitType2.carrier,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9 }),
      sustainDamage: false,
      planetaryShield: false,
      isGroundForce: false,
      isShip: true,
      diePriority: 60
    };
    var cruiser = {
      type: UnitType2.cruiser,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 7 }),
      sustainDamage: false,
      planetaryShield: false,
      isGroundForce: false,
      isShip: true,
      diePriority: 70
    };
    var destroyer = {
      type: UnitType2.destroyer,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9 }),
      afb: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9, count: 2 }),
      sustainDamage: false,
      planetaryShield: false,
      isGroundForce: false,
      isShip: true,
      diePriority: 80
    };
    var dreadnought = {
      type: UnitType2.dreadnought,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 5 }),
      bombardment: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 5 }),
      sustainDamage: true,
      planetaryShield: false,
      isGroundForce: false,
      isShip: true,
      useSustainDamagePriority: 100,
      diePriority: 40
    };
    var fighter = {
      type: UnitType2.fighter,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 9 }),
      sustainDamage: false,
      planetaryShield: false,
      isGroundForce: false,
      isShip: true,
      diePriority: 100
    };
    var flagship = {
      type: UnitType2.flagship,
      sustainDamage: true,
      planetaryShield: false,
      isGroundForce: false,
      isShip: true,
      diePriority: 20,
      useSustainDamagePriority: 20
    };
    var infantry = {
      type: UnitType2.infantry,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 8 }),
      sustainDamage: false,
      planetaryShield: false,
      isGroundForce: true,
      isShip: false,
      diePriority: 80
    };
    var mech = {
      type: UnitType2.mech,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 6 }),
      sustainDamage: true,
      planetaryShield: false,
      isGroundForce: true,
      isShip: false,
      diePriority: 50,
      useSustainDamagePriority: 50
    };
    var pds = {
      type: UnitType2.pds,
      spaceCannon: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 6 }),
      sustainDamage: false,
      planetaryShield: true,
      isGroundForce: false,
      isShip: false
    };
    var warsun = {
      type: UnitType2.warsun,
      combat: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 3, count: 3 }),
      bombardment: Object.assign(Object.assign({}, exports.defaultRoll), { hit: 3, count: 3 }),
      sustainDamage: true,
      planetaryShield: false,
      isGroundForce: false,
      isShip: true,
      diePriority: 10,
      useSustainDamagePriority: 10,
      battleEffects: [
        {
          name: "warsun remove planetary shield",
          type: "other",
          place: enums_1.Place.ground,
          transformEnemyUnit: (u) => {
            return Object.assign(Object.assign({}, u), { planetaryShield: false });
          }
        }
      ]
    };
    var other = {
      type: UnitType2.other,
      sustainDamage: false,
      planetaryShield: false,
      isGroundForce: false,
      isShip: false
    };
    var nonunit = {
      type: UnitType2.nonunit,
      sustainDamage: false,
      planetaryShield: false,
      isGroundForce: false,
      isShip: false
    };
    exports.UNIT_MAP = {
      carrier,
      cruiser,
      destroyer,
      dreadnought,
      fighter,
      flagship,
      infantry,
      mech,
      pds,
      warsun,
      other,
      nonunit
    };
    function getUnitWithImproved(unit, rollType, how, duration, value = 1) {
      if (unit[rollType] === void 0) {
        console.warn(`Tried to improve ${rollType} on unit ${unit.type} but failed.`);
        return unit;
      }
      const bonus = `${how}Bonus${duration === "temp" ? "Tmp" : ""}`;
      return Object.assign(Object.assign({}, unit), { [rollType]: Object.assign(Object.assign({}, unit[rollType]), { [bonus]: unit[rollType][bonus] + value }) });
    }
    function createUnit(type) {
      const unit = (0, cloneDeep_1.default)(exports.UNIT_MAP[type]);
      const unitInstance = Object.assign(Object.assign({}, unit), { takenDamage: false, isDestroyed: false, usedSustain: false });
      return unitInstance;
    }
    function createUnitAndApplyEffects(type, participant, place, modify) {
      let unit = createUnit(type);
      modify(unit);
      participant.allUnitTransform.forEach((effect) => {
        unit = effect(unit, participant, place, effect.name);
      });
      (0, util_log_1.logWrapper)(`${participant.side} created a new unit: ${unit.type}`);
      return unit;
    }
  }
});

// node_modules/lodash/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/identity.js"(exports, module) {
    function identity(value) {
      return value;
    }
    module.exports = identity;
  }
});

// node_modules/lodash/_castFunction.js
var require_castFunction = __commonJS({
  "node_modules/lodash/_castFunction.js"(exports, module) {
    var identity = require_identity();
    function castFunction(value) {
      return typeof value == "function" ? value : identity;
    }
    module.exports = castFunction;
  }
});

// node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    module.exports = trimmedEndIndex;
  }
});

// node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "node_modules/lodash/_baseTrim.js"(exports, module) {
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "node_modules/lodash/toNumber.js"(exports, module) {
    var baseTrim = require_baseTrim();
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// node_modules/lodash/toFinite.js
var require_toFinite = __commonJS({
  "node_modules/lodash/toFinite.js"(exports, module) {
    var toNumber = require_toNumber();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    module.exports = toFinite;
  }
});

// node_modules/lodash/toInteger.js
var require_toInteger = __commonJS({
  "node_modules/lodash/toInteger.js"(exports, module) {
    var toFinite = require_toFinite();
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    module.exports = toInteger;
  }
});

// node_modules/lodash/times.js
var require_times = __commonJS({
  "node_modules/lodash/times.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var castFunction = require_castFunction();
    var toInteger = require_toInteger();
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_ARRAY_LENGTH = 4294967295;
    var nativeMin = Math.min;
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
      iteratee = castFunction(iteratee);
      n -= MAX_ARRAY_LENGTH;
      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }
    module.exports = times;
  }
});

// overlay/scripts/ti4calc2/core/battle-types.js
var require_battle_types = __commonJS({
  "overlay/scripts/ti4calc2/core/battle-types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EFFECT_LOW_PRIORITY = exports.EFFECT_DEFAULT_PRIORITY = exports.EFFECT_HIGH_PRIORITY = exports.BattleWinner = void 0;
    exports.isSide = isSide;
    function isSide(value) {
      return value === "attacker" || value === "defender";
    }
    var BattleWinner;
    (function(BattleWinner2) {
      BattleWinner2["attacker"] = "attacker";
      BattleWinner2["draw"] = "draw";
      BattleWinner2["defender"] = "defender";
    })(BattleWinner || (exports.BattleWinner = BattleWinner = {}));
    exports.EFFECT_HIGH_PRIORITY = 75;
    exports.EFFECT_DEFAULT_PRIORITY = 50;
    exports.EFFECT_LOW_PRIORITY = 25;
  }
});

// overlay/scripts/ti4calc2/core/factions/arborec.js
var require_arborec = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/arborec.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.arborec = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.arborec = [
      {
        type: "faction",
        name: "Arborec flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Arborec mech",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.mech) {
            return Object.assign(Object.assign({}, unit), { planetaryShield: true });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/unitGet.js
var require_unitGet = __commonJS({
  "overlay/scripts/ti4calc2/core/unitGet.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHighestWorthUnit = getHighestWorthUnit;
    exports.getNonFighterShips = getNonFighterShips;
    exports.getHighestWorthSustainUnit = getHighestWorthSustainUnit;
    exports.getLowestWorthSustainUnit = getLowestWorthSustainUnit;
    exports.getHighestWorthNonSustainUnit = getHighestWorthNonSustainUnit;
    exports.getLowestWorthNonSustainUndamagedUnit = getLowestWorthNonSustainUndamagedUnit;
    exports.getLowestWorthUnit = getLowestWorthUnit;
    exports.getWeakestCombatUnit = getWeakestCombatUnit;
    exports.getUndamagedUnits = getUndamagedUnits;
    exports.getUnits = getUnits;
    exports.isHighestHitUnit = isHighestHitUnit;
    exports.getHighestHitUnit = getHighestHitUnit;
    exports.getHighestDiceCountUnit = getHighestDiceCountUnit;
    exports.hasAttackType = hasAttackType;
    exports.doesUnitFitPlace = doesUnitFitPlace;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    function getHighestWorthUnit(p, place, includeFighter) {
      const units = getUnits(p, place, includeFighter);
      if (units.length === 0) {
        return void 0;
      }
      return units.reduce((a, b) => {
        if (a.diePriority === b.diePriority) {
          if (a.takenDamage !== b.takenDamage) {
            return a.takenDamage ? b : a;
          }
          return a.usedSustain ? a : b;
        }
        return a.diePriority > b.diePriority ? b : a;
      });
    }
    function getNonFighterShips(p) {
      return getUnits(p, enums_1.Place.space, false);
    }
    function getHighestWorthSustainUnit(p, place, includeFighter) {
      const units = getUnits(p, place, includeFighter, true);
      if (units.length === 0) {
        return void 0;
      } else {
        return units.reduce((a, b) => {
          var _a, _b;
          return ((_a = a.useSustainDamagePriority) !== null && _a !== void 0 ? _a : 50) > ((_b = b.useSustainDamagePriority) !== null && _b !== void 0 ? _b : 50) ? b : a;
        });
      }
    }
    function getLowestWorthSustainUnit(p, place, includeFighter) {
      const units = getUnits(p, place, includeFighter, true);
      if (units.length === 0) {
        return void 0;
      } else {
        return units.reduce((a, b) => {
          var _a, _b;
          return ((_a = a.useSustainDamagePriority) !== null && _a !== void 0 ? _a : 50) > ((_b = b.useSustainDamagePriority) !== null && _b !== void 0 ? _b : 50) ? a : b;
        });
      }
    }
    function getHighestWorthNonSustainUnit(p, place, includeFighter) {
      const units = getUnits(p, place, includeFighter, false);
      if (units.length === 0) {
        return void 0;
      }
      return units.reduce((a, b) => {
        return a.diePriority > b.diePriority ? b : a;
      });
    }
    function getLowestWorthNonSustainUndamagedUnit(p, place, includeFighter) {
      const units = getUndamagedUnits(p, place, includeFighter, false);
      if (units.length === 0) {
        return void 0;
      }
      return units.reduce((a, b) => {
        return a.diePriority > b.diePriority ? a : b;
      });
    }
    function getLowestWorthUnit(p, place, includeFighter) {
      const units = getUnits(p, place, includeFighter);
      if (units.length === 0) {
        return void 0;
      } else {
        return units.reduce((a, b) => {
          if (a.diePriority === b.diePriority) {
            if (a.takenDamage !== b.takenDamage) {
              return a.takenDamage && !b.usedSustain ? b : a;
            }
            return a.usedSustain ? b : a;
          }
          return a.diePriority > b.diePriority ? a : b;
        });
      }
    }
    function getWeakestCombatUnit(p, place, includeFighter) {
      const units = getUnits(p, place, includeFighter);
      if (units.length === 0) {
        return void 0;
      }
      return units.reduce((a, b) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (((_a = a.combat) === null || _a === void 0 ? void 0 : _a.hit) === ((_b = b.combat) === null || _b === void 0 ? void 0 : _b.hit)) {
          if (((_c = a.afb) === null || _c === void 0 ? void 0 : _c.hit) === ((_d = b.afb) === null || _d === void 0 ? void 0 : _d.hit)) {
            return a.sustainDamage > b.sustainDamage ? a : b;
          }
          return ((_f = (_e = a.afb) === null || _e === void 0 ? void 0 : _e.hit) !== null && _f !== void 0 ? _f : 10) > ((_h = (_g = b.afb) === null || _g === void 0 ? void 0 : _g.hit) !== null && _h !== void 0 ? _h : 10) ? a : b;
        }
        return ((_k = (_j = a.combat) === null || _j === void 0 ? void 0 : _j.hit) !== null && _k !== void 0 ? _k : 10) > ((_m = (_l = b.combat) === null || _l === void 0 ? void 0 : _l.hit) !== null && _m !== void 0 ? _m : 10) ? a : b;
      });
    }
    function getUndamagedUnits(p, place, includeFighter, withSustain) {
      return p.units.filter((u) => {
        if (!includeFighter && u.type === unit_1.UnitType.fighter) {
          return false;
        }
        if (place != null && !doesUnitFitPlace(u, place)) {
          return false;
        }
        if (u.isDestroyed) {
          return false;
        }
        if (u.type === "nonunit") {
          return false;
        }
        if (withSustain === true) {
          return u.sustainDamage && !u.takenDamage && !u.usedSustain;
        } else if (withSustain === false) {
          return !u.sustainDamage && !u.takenDamage && !u.usedSustain;
        } else {
          return true;
        }
      });
    }
    function getUnits(p, place, includeFighter, withSustain) {
      return p.units.filter((u) => {
        if (!includeFighter && u.type === unit_1.UnitType.fighter) {
          return false;
        }
        if (place != null && !doesUnitFitPlace(u, place)) {
          return false;
        }
        if (u.isDestroyed) {
          return false;
        }
        if (u.type === "nonunit") {
          return false;
        }
        if (withSustain === true) {
          return u.sustainDamage && !u.takenDamage && !u.usedSustain;
        } else if (withSustain === false) {
          return !u.sustainDamage || u.takenDamage || u.usedSustain;
        } else {
          return true;
        }
      });
    }
    function isHighestHitUnit(unit, p, attackType, place) {
      const highestHitUnit = getHighestHitUnit(p, attackType, place);
      if (!highestHitUnit) {
        return true;
      }
      const unitHit = unit[attackType].hit - unit[attackType].hitBonus - unit[attackType].hitBonusTmp;
      const bestHit = highestHitUnit[attackType].hit - highestHitUnit[attackType].hitBonus - highestHitUnit[attackType].hitBonusTmp;
      return unitHit <= bestHit;
    }
    function getHighestHitUnit(p, attackType, place) {
      const units = getUnits(p, place, true).filter((u) => !!u[attackType]);
      if (units.length === 0) {
        return void 0;
      }
      const bestUnit = units.reduce((a, b) => {
        if (a[attackType].hit - a[attackType].hitBonus - a[attackType].hitBonusTmp < b[attackType].hit - b[attackType].hitBonus - b[attackType].hitBonusTmp) {
          return a;
        } else {
          return b;
        }
      });
      return bestUnit;
    }
    function getHighestDiceCountUnit(p, attackType, place) {
      const units = getUnits(p, place, true).filter((u) => !!u[attackType]);
      if (units.length === 0) {
        return void 0;
      }
      const bestUnit = units.reduce((a, b) => {
        if (a[attackType].count + a[attackType].countBonus + a[attackType].countBonusTmp > b[attackType].count + b[attackType].countBonus + b[attackType].countBonusTmp) {
          return a;
        } else {
          return b;
        }
      });
      return bestUnit;
    }
    function hasAttackType(p, type) {
      return p.units.some((u) => u[type] !== void 0);
    }
    function doesUnitFitPlace(u, place) {
      if (place === enums_1.Place.space && !u.isShip) {
        return false;
      }
      if (place === enums_1.Place.ground && !u.isGroundForce) {
        return false;
      }
      return true;
    }
  }
});

// overlay/scripts/ti4calc2/core/factions/argentFlight.js
var require_argentFlight = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/argentFlight.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.argentFlight = void 0;
    var times_1 = __importDefault(require_times());
    var util_log_1 = require_util_log();
    var battleEffects_1 = require_battleEffects();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    exports.argentFlight = [
      {
        type: "faction",
        name: "Argent Flight flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), battleEffects: [
              {
                name: "Argent Flight flagship preventing pds",
                type: "other",
                place: enums_1.Place.space,
                transformEnemyUnit: (unit2, _participant, place) => {
                  if (place === enums_1.Place.space) {
                    return Object.assign(Object.assign({}, unit2), { spaceCannon: void 0 });
                  } else {
                    return unit2;
                  }
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Argent Flight destroyers",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.destroyer) {
            unit.combat.hit = 8;
          }
          return unit;
        },
        afterAfb: (p, battle, otherParticipant) => {
          (0, times_1.default)(otherParticipant.afbHitsToAssign.fighterHitsToAssign, () => {
            const bestSustainUnit = (0, unitGet_1.getLowestWorthSustainUnit)(otherParticipant, battle.place, true);
            if (bestSustainUnit) {
              (0, util_log_1.logWrapper)(`${p.side === "attacker" ? "defender" : "attacker"} used sustain damage from Argent anti fighter barrage`);
              bestSustainUnit.takenDamage = true;
              bestSustainUnit.takenDamageRound = 0;
            }
          });
        }
      },
      {
        type: "faction-tech",
        name: "Strike Wing Alpha II",
        place: enums_1.Place.space,
        faction: enums_1.Faction.argent_flight,
        unit: unit_1.UnitType.destroyer,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.destroyer) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 7 }), afb: Object.assign(Object.assign({}, unit.afb), { hit: 6, count: 3 }) });
          }
          return unit;
        },
        afterAfb: (p, battle, otherParticipant) => {
          (0, times_1.default)(otherParticipant.afbHitsToAssign.fighterHitsToAssign, () => {
            const bestSustainUnit = (0, unitGet_1.getLowestWorthSustainUnit)(otherParticipant, battle.place, true);
            if (bestSustainUnit) {
              (0, util_log_1.logWrapper)(`${p.side === "attacker" ? "defender" : "attacker"} used sustain damage from Argent anti fighter barrage`);
              bestSustainUnit.takenDamage = true;
              bestSustainUnit.takenDamageRound = 0;
            }
          });
          for (const rollInfo of otherParticipant.afbHitsToAssign.rollInfoList) {
            if (rollInfo.roll >= 9) {
              const infantryToDestroy = (0, unitGet_1.getUnits)(otherParticipant, void 0, false).find((u) => u.type === unit_1.UnitType.infantry && !u.isDestroyed);
              if (infantryToDestroy) {
                (0, util_log_1.logWrapper)(`${p.side === "attacker" ? "defender" : "attacker"} destroyed infantry from Strike Wing Alpha II`);
                infantryToDestroy.isDestroyed = true;
              }
            }
          }
        }
      },
      {
        type: "promissary",
        description: "When 1 or more of your units make a roll for a unit ability: Choose 1 of those units to roll 1 additional die",
        name: "Strike Wing Ambuscade",
        place: "both",
        onSpaceCannon: (p, _battle, _otherP, effectName) => {
          const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "spaceCannon", void 0);
          if (highestHitUnit) {
            highestHitUnit.spaceCannon.countBonusTmp += 1;
            (0, battleEffects_1.registerUse)(effectName, p);
          }
        },
        onAfb: (p, _battle, _otherP, effectName) => {
          const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "afb", void 0);
          if (highestHitUnit) {
            highestHitUnit.afb.countBonusTmp += 1;
            (0, battleEffects_1.registerUse)(effectName, p);
          }
        },
        onBombardment: (p, battle, _otherP, effectName) => {
          if (p.side === "attacker" && battle.place === enums_1.Place.ground) {
            const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "bombardment", void 0);
            if (highestHitUnit) {
              highestHitUnit.bombardment.countBonusTmp += 1;
              (0, battleEffects_1.registerUse)(effectName, p);
            }
          }
        },
        timesPerFight: 1
      },
      {
        type: "commander",
        description: "When 1 or more of your units make a roll for a unit ability: You may choose 1 of those units to roll 1 additional die.",
        name: "Argent Flight Commander",
        place: "both",
        onAfb: (p) => {
          const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "afb", void 0);
          if (highestHitUnit) {
            highestHitUnit.afb.countBonusTmp += 1;
          }
        },
        onSpaceCannon: (p) => {
          const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "spaceCannon", void 0);
          if (highestHitUnit) {
            highestHitUnit.spaceCannon.countBonusTmp += 1;
          }
        },
        onBombardment: (p) => {
          const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "bombardment", void 0);
          if (highestHitUnit) {
            highestHitUnit.bombardment.countBonusTmp += 1;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/baronyOfLetnev.js
var require_baronyOfLetnev = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/baronyOfLetnev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baronyOfLetnev = void 0;
    var util_log_1 = require_util_log();
    var battle_types_1 = require_battle_types();
    var battleEffects_1 = require_battleEffects();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    exports.baronyOfLetnev = [
      {
        type: "faction",
        name: "Barony of Letnev flagship",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), bombardment: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 }), battleEffects: [
              {
                name: "Barony flagship remove planetary shield",
                type: "other",
                place: "both",
                transformEnemyUnit: (u) => {
                  return Object.assign(Object.assign({}, u), { planetaryShield: false });
                }
              },
              {
                name: "Barony flagship repair",
                type: "other",
                place: enums_1.Place.space,
                onCombatRound: (participant) => {
                  participant.units.forEach((unit2) => {
                    if (unit2.type === unit_1.UnitType.flagship) {
                      unit2.takenDamage = false;
                    }
                  });
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        name: "Mech deploy",
        description: "At the start of a round of ground combat, you may spend 2 resources to replace 1 of your infantry in that combat with 1 mech.",
        type: "faction-ability",
        place: enums_1.Place.ground,
        faction: enums_1.Faction.barony_of_letnev,
        count: true,
        onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
          var _a;
          if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
            const infantryIndex = participant.units.findIndex((u) => u.type === unit_1.UnitType.infantry);
            if (infantryIndex !== -1) {
              const infantry = participant.units[infantryIndex];
              const genericMech = unit_1.UNIT_MAP[unit_1.UnitType.mech];
              if (infantry && infantry.combat) {
                participant.units[infantryIndex] = Object.assign(Object.assign({}, genericMech), { takenDamage: false, usedSustain: false, isDestroyed: false, combat: Object.assign(Object.assign({}, infantry.combat), { hit: genericMech.combat.hit }) });
                (0, util_log_1.logWrapper)(`${participant.side} used mech deploy ability to transform an infantry into a mech`);
              }
            }
            if (participant.effects[effectName] !== void 0) {
              participant.effects[effectName] -= 1;
            }
          }
        }
      },
      {
        name: "Non-Euclidean Shielding",
        description: "When 1 of your units uses SUSTAIN DAMAGE, cancel 2 hits instead of 1.",
        type: "faction-tech",
        place: "both",
        faction: enums_1.Faction.barony_of_letnev,
        onSustain: (_unit, participant, _battle) => {
          if (participant.hitsToAssign.hitsToNonFighters > 0) {
            participant.hitsToAssign.hitsToNonFighters -= 1;
          } else if (participant.hitsToAssign.hits > 0) {
            participant.hitsToAssign.hits -= 1;
          }
        }
      },
      {
        name: "L4 Disruptors",
        description: "During an invasion, units cannot use SPACE CANNON against your units.",
        type: "faction-tech",
        place: enums_1.Place.ground,
        faction: enums_1.Faction.barony_of_letnev,
        priority: battle_types_1.EFFECT_LOW_PRIORITY,
        transformEnemyUnit: (unit) => {
          return Object.assign(Object.assign({}, unit), { spaceCannon: void 0 });
        }
      },
      {
        name: "Munitions Reserves",
        description: "At the start of each round of space combat, you may spend 2 trade goods;  you may re-roll any number of your dice during that combat round.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.barony_of_letnev,
        count: true,
        onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
          var _a;
          if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
            participant.units.forEach((unit) => {
              if (unit.combat) {
                unit.combat.rerollBonusTmp += 1;
              }
            });
            if (participant.effects[effectName] !== void 0) {
              participant.effects[effectName] -= 1;
            }
          }
        }
      },
      {
        name: "War Funding",
        // TODO this could use the "worse than average" thingy
        description: "After you and your opponent roll dice during space combat: You may reroll all of your opponent's dice.  You may reroll any number of your dice. In this simulation it only rerolls your dice.",
        type: "promissary",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          return (0, unit_1.getUnitWithImproved)(unit, "combat", "reroll", "temp");
        }
      },
      {
        name: "Barony Agent",
        description: "At the start of a Space Combat round: You may exhaust this card to choose 1 ship in the active system. That ship rolls 1 additional die during this combat round.",
        type: "agent",
        place: enums_1.Place.space,
        onCombatRound: (p, _battle, _otherParticipant, effectName) => {
          const highestHitUnit = (0, unitGet_1.getHighestHitUnit)(p, "combat", enums_1.Place.space);
          if (highestHitUnit && highestHitUnit.combat) {
            highestHitUnit.combat.countBonusTmp += 1;
            (0, battleEffects_1.registerUse)(effectName, p);
          }
        },
        timesPerFight: 1
      },
      //TODO: Currently just picks the unit with the highest dice count. It could be smarter and include the "cap" on hit-bonus, reroll-value and stuff like that.
      {
        name: "Gravleash Maneuvers",
        description: "Barony Breakthrough: Before you roll dice during space combat, apply +X to the results of 1 of your ship's rolls, where X is the number of ship types you have in the combat.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.barony_of_letnev,
        onStart: (p, _b, _op) => {
          const highestDiceCountUnit = (0, unitGet_1.getHighestDiceCountUnit)(p, "combat", enums_1.Place.space);
          if (highestDiceCountUnit && highestDiceCountUnit.combat) {
            const units = (0, unitGet_1.getUnits)(p, enums_1.Place.space, true);
            const numUniqueUnits = [
              ...new Set(units.map((unit) => unit.type))
            ].length;
            highestDiceCountUnit.combat.hitBonus += numUniqueUnits;
            (0, util_log_1.logWrapper)(`${p.side} used Gravleash Maneuvers to give ${highestDiceCountUnit.type} with their ${highestDiceCountUnit.combat.count + highestDiceCountUnit.combat.countBonus + highestDiceCountUnit.combat.countBonusTmp} dice a +${numUniqueUnits} to hit.`);
          }
        },
        priority: battle_types_1.EFFECT_LOW_PRIORITY
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/clanOfSaar.js
var require_clanOfSaar = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/clanOfSaar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clanOfSaar = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.clanOfSaar = [
      {
        type: "faction",
        name: "Clan of Saar flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), afb: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 4 }) });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/creuss.js
var require_creuss = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/creuss.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.creuss = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.creuss = [
      {
        type: "faction",
        name: "Creuss flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 1 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-tech",
        name: "Dimensional Splicer",
        description: "At the start of space combat in a system that contains a wormhole and 1 or more of your ships, you may produce 1 hit and assign it to 1 of your opponent's ships.",
        place: enums_1.Place.space,
        faction: enums_1.Faction.creuss,
        onStart: (_participant, _battle, otherParticipant) => {
          otherParticipant.hitsToAssign.hitsAssignedByEnemy += 1;
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/crimsonRebellion.js
var require_crimsonRebellion = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/crimsonRebellion.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crimsonRebellion = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.crimsonRebellion = [
      {
        type: "faction",
        name: "Crimson Rebellion flagship",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }) });
          } else {
            return unit;
          }
        }
      },
      {
        // TODO units should regain abilities when the flagship is destroyed. Currently they do not. If we fix so "battle aura" can affect all abilites, it should be used instead.
        name: "Flagship active",
        description: "While this unit is in a system that contains an active breach, other players' units in systems with active breaches lose all their unit abilities.",
        type: "faction-ability",
        place: "both",
        faction: enums_1.Faction.crimson_rebellion,
        transformEnemyUnit: (unit, _p) => {
          return Object.assign(Object.assign({}, unit), { afb: void 0, bombardment: void 0, spaceCannon: void 0, sustainDamage: false, planetaryShield: false });
        }
      },
      {
        type: "faction",
        name: "Crimson Rebellion destroyers",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.destroyer) {
            unit.combat.hit = 8;
          }
          return unit;
        }
      },
      {
        type: "faction-tech",
        name: "Exile II",
        place: enums_1.Place.space,
        faction: enums_1.Faction.crimson_rebellion,
        unit: unit_1.UnitType.destroyer,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.destroyer) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 7 }), afb: Object.assign(Object.assign({}, unit.afb), { hit: 6, count: 3 }) });
          }
          return unit;
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/deepwrought.js
var require_deepwrought = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/deepwrought.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deepwrought = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.deepwrought = [
      {
        type: "faction",
        name: "Deepwrought flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }) });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/empyrean.js
var require_empyrean = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/empyrean.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.empyrean = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.empyrean = [
      {
        type: "faction",
        name: "Empyrean flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "general",
        name: "Empyrean flagship repair",
        description: "Empyrean flagship text: After any player's unit in this system or an adjacent system uses SUSTAIN DAMAGE, you may spend 2 influence to repair that unit.",
        place: "both",
        count: true,
        onSustain: (u, participant, _battle, effectName) => {
          var _a;
          if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
            u.takenDamage = false;
            if (participant.effects[effectName] !== void 0) {
              participant.effects[effectName] -= 1;
            }
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/hacan.js
var require_hacan = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/hacan.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hacan = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var hacanTradeGoods = "Hacan flagship trade goods";
    exports.hacan = [
      {
        type: "faction",
        name: "Hacan flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            const getNewOnHit = (oldOnHit) => {
              const onHit = (participant, battle, otherParticipant, hitInfo) => {
                var _a;
                if (oldOnHit) {
                  oldOnHit(participant, battle, otherParticipant, hitInfo);
                }
                for (const rollInfo of hitInfo.rollInfoList) {
                  if (rollInfo.roll + 1 === rollInfo.hitOn && ((_a = participant.effects[hacanTradeGoods]) !== null && _a !== void 0 ? _a : 0) > 0) {
                    rollInfo.roll += 1;
                    hitInfo.hits += 1;
                    if (participant.effects[hacanTradeGoods] !== void 0) {
                      participant.effects[hacanTradeGoods] -= 1;
                    }
                  }
                }
              };
              return onHit;
            };
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), aura: [
              {
                name: "Hacan flagship aura",
                place: enums_1.Place.space,
                transformUnit: (auraUnit, _participant) => {
                  const newOnHit = getNewOnHit(auraUnit.onHit);
                  return Object.assign(Object.assign({}, auraUnit), { onHit: newOnHit });
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        name: hacanTradeGoods,
        description: "Trade goods to be used by flagship. Hacan flagship text: After you roll a die during a space combat in this system, you may spend 1 trade good to apply +1 to the result.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.hacan,
        count: true
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/jolNar.js
var require_jolNar = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/jolNar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.jolNar = void 0;
    var battle_types_1 = require_battle_types();
    var battleEffects_1 = require_battleEffects();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.jolNar = [
      {
        type: "faction",
        name: "Jol-Nar flagship",
        place: enums_1.Place.space,
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 2 }), onHit: (_participant, _battle, _otherParticipant, hitInfo) => {
              hitInfo.rollInfoList.forEach((rollInfo) => {
                if (rollInfo.roll > 9) {
                  hitInfo.hits += 2;
                }
              });
            } });
          } else {
            return unit;
          }
        }
      },
      {
        name: "Jol-Nar Fragile ability",
        type: "faction",
        place: "both",
        transformUnit: (u) => {
          return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "permanent", -1);
        }
      },
      {
        type: "faction",
        name: "Jol-Nar mech",
        place: enums_1.Place.ground,
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.mech) {
            return Object.assign(Object.assign({}, unit), { aura: [
              {
                name: "Jol-Nar mech aura",
                place: enums_1.Place.ground,
                onCombatRoundStart: (auraUnits, p, _battle, effectName) => {
                  for (const unit2 of auraUnits) {
                    if (unit2.type === unit_1.UnitType.infantry) {
                      unit2.combat.hitBonusTmp += 1;
                    }
                  }
                  (0, battleEffects_1.registerUse)(effectName, p);
                },
                timesPerRound: 1
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        name: "Jol-Nar commander",
        description: "After you roll dice for a unit ability: You may reroll any of those dice.",
        type: "commander",
        place: "both",
        transformUnit: (unit) => {
          if (unit.spaceCannon) {
            unit = (0, unit_1.getUnitWithImproved)(unit, "spaceCannon", "reroll", "permanent");
          }
          if (unit.afb) {
            unit = (0, unit_1.getUnitWithImproved)(unit, "afb", "reroll", "permanent");
          }
          if (unit.bombardment) {
            unit = (0, unit_1.getUnitWithImproved)(unit, "bombardment", "reroll", "permanent");
          }
          return unit;
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/keleres.js
var require_keleres = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/keleres.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.keleres = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.keleres = [
      {
        type: "faction",
        name: "Keleres flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-ability",
        description: "The faction tech I.I.H.Q. MODERNIZATION gives Mecatol Rex a space cannon that hits on 5.",
        name: "I.I.H.Q. MODERNIZATION space cannon",
        place: "both",
        faction: enums_1.Faction.keleres,
        beforeStart: (p, battle) => {
          const modify = (instance) => {
            instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 1 });
          };
          const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
          p.units.push(planetUnit);
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/battleResult.js
var require_battleResult = __commonJS({
  "overlay/scripts/ti4calc2/core/battleResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBattleResultUnitString = getBattleResultUnitString;
    var unit_1 = require_unit();
    function getBattleResultUnitString(p) {
      return p.units.filter((u) => u.type !== unit_1.UnitType.other).sort((a, b) => {
        var _a, _b;
        if (a.type === b.type) {
          if (a.takenDamage) {
            return 1;
          } else {
            return -1;
          }
        }
        return ((_a = a.diePriority) !== null && _a !== void 0 ? _a : 50) - ((_b = b.diePriority) !== null && _b !== void 0 ? _b : 50);
      }).map((u) => {
        if (u.takenDamage) {
          return `${getChar(u)}-`;
        } else {
          return getChar(u);
        }
      }).join("");
    }
    function getChar(u) {
      switch (u.type) {
        case unit_1.UnitType.flagship:
          return "F";
        case unit_1.UnitType.warsun:
          return "W";
        case unit_1.UnitType.dreadnought:
          return "D";
        case unit_1.UnitType.carrier:
          return "C";
        case unit_1.UnitType.cruiser:
          return "c";
        case unit_1.UnitType.destroyer:
          return "d";
        case unit_1.UnitType.fighter:
          return "f";
        case unit_1.UnitType.mech:
          return "M";
        case unit_1.UnitType.infantry:
          return "i";
        case unit_1.UnitType.pds:
          return "p";
        case unit_1.UnitType.other:
          return "o";
        // should never happen
        case unit_1.UnitType.nonunit:
          return "n";
      }
    }
  }
});

// overlay/scripts/ti4calc2/core/roll.js
var require_roll = __commonJS({
  "overlay/scripts/ti4calc2/core/roll.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHits = getHits;
    var times_1 = __importDefault(require_times());
    function getHits(roll) {
      const count = roll.count + roll.countBonus + roll.countBonusTmp;
      const hit = roll.hit - roll.hitBonus - roll.hitBonusTmp;
      const rollInfo = [];
      const allResults = (0, times_1.default)(count, () => {
        let reroll = roll.reroll + roll.rerollBonus + roll.rerollBonusTmp;
        let result = false;
        while (!result && reroll >= 0) {
          const roll2 = Math.floor(Math.random() * 10 + 1);
          result = roll2 >= hit;
          reroll -= 1;
          rollInfo.push({
            roll: roll2,
            hitOn: hit
          });
        }
        return result;
      }).filter((r) => r).length;
      roll.hitBonusTmp = 0;
      roll.countBonusTmp = 0;
      roll.rerollBonusTmp = 0;
      return { hits: allResults, rollInfoList: rollInfo };
    }
  }
});

// overlay/scripts/ti4calc2/core/battle.js
var require_battle = __commonJS({
  "overlay/scripts/ti4calc2/core/battle.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.doBattle = doBattle2;
    exports.doBombardment = doBombardment;
    exports.destroyUnit = destroyUnit;
    exports.isBattleOngoing = isBattleOngoing;
    exports.isParticipantAlive = isParticipantAlive;
    exports.isSustainDisabled = isSustainDisabled;
    exports.getOtherParticipant = getOtherParticipant;
    var cloneDeep_1 = __importDefault(require_cloneDeep());
    var util_log_1 = require_util_log();
    var battle_types_1 = require_battle_types();
    var battleEffects_1 = require_battleEffects();
    var battleResult_1 = require_battleResult();
    var constant_1 = require_constant();
    var enums_1 = require_enums();
    var roll_1 = require_roll();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    function doBattle2(battle) {
      let isDuringCombat = false;
      const isDuringBombardment = false;
      battle.attacker.beforeStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
          effect.beforeStart(battle.attacker, battle, battle.defender, effect.name);
        }
      });
      battle.defender.beforeStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
          effect.beforeStart(battle.defender, battle, battle.attacker, effect.name);
        }
      });
      resolveHits(battle, isDuringCombat, isDuringBombardment);
      doBombardment(battle, isDuringCombat);
      doSpaceCannon(battle);
      resolveHits(battle, isDuringCombat, isDuringBombardment);
      battle.attacker.onStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
          effect.onStart(battle.attacker, battle, battle.defender, effect.name);
        }
      });
      battle.defender.onStartEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
          effect.onStart(battle.defender, battle, battle.attacker, effect.name);
        }
      });
      resolveHits(battle, isDuringCombat, isDuringBombardment);
      isDuringCombat = true;
      doAfb(battle);
      let battleResult = void 0;
      while (!battleResult) {
        doBattleRolls(battle);
        battle.attacker.onCombatRoundEndBeforeAssign.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            effect.onCombatRoundEndBeforeAssign(battle.attacker, battle, battle.defender, effect.name);
          }
        });
        battle.defender.onCombatRoundEndBeforeAssign.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
            effect.onCombatRoundEndBeforeAssign(battle.defender, battle, battle.attacker, effect.name);
          }
        });
        resolveHits(battle, isDuringCombat, isDuringBombardment);
        doRepairStep(battle, isDuringCombat);
        battle.attacker.onCombatRoundEnd.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            effect.onCombatRoundEnd(battle.attacker, battle, battle.defender, effect.name);
          }
        });
        battle.defender.onCombatRoundEnd.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
            effect.onCombatRoundEnd(battle.defender, battle, battle.attacker, effect.name);
          }
        });
        resolveHits(battle, isDuringCombat, isDuringBombardment);
        battle.roundNumber += 1;
        battle.attacker.roundActionTracker = {};
        battle.defender.roundActionTracker = {};
        if (battle.roundNumber === 400) {
          console.warn("Infinite fight detected");
          return {
            winner: battle_types_1.BattleWinner.draw,
            units: ""
          };
        }
        addNewUnits(battle.attacker);
        addNewUnits(battle.defender);
        const attackerAlive = isParticipantAlive(battle.attacker, battle.place);
        const defenderAlive = isParticipantAlive(battle.defender, battle.place);
        if (attackerAlive && !defenderAlive) {
          battleResult = {
            winner: battle_types_1.BattleWinner.attacker,
            units: (0, battleResult_1.getBattleResultUnitString)(battle.attacker)
          };
        } else if (!attackerAlive && defenderAlive) {
          battleResult = {
            winner: battle_types_1.BattleWinner.defender,
            units: (0, battleResult_1.getBattleResultUnitString)(battle.defender)
          };
        } else if (!attackerAlive && !defenderAlive) {
          battleResult = {
            winner: battle_types_1.BattleWinner.draw,
            units: ""
          };
        }
      }
      (0, util_log_1.logWrapper)(`Battle resolved after ${battle.roundNumber - 1} rounds`);
      if (battleResult.winner === battle_types_1.BattleWinner.attacker) {
        (0, util_log_1.logWrapper)("Attacker won");
      } else if (battleResult.winner === battle_types_1.BattleWinner.defender) {
        (0, util_log_1.logWrapper)("Defender won");
      } else {
        (0, util_log_1.logWrapper)("Battle ended in a draw");
      }
      return battleResult;
    }
    function clearSustains(p) {
      p.units.forEach((u) => u.usedSustain = false);
    }
    function addNewUnits(p) {
      if (p.newUnits.length > 0) {
        p.units = [...p.units, ...p.newUnits];
        p.newUnits = [];
      }
    }
    function doBombardment(battle, isDuringCombat) {
      const isDuringBombardment = true;
      if (battle.place !== enums_1.Place.ground) {
        return;
      }
      battle.attacker.onBombardment.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
          effect.onBombardment(battle.attacker, battle, battle.defender, effect.name);
        }
      });
      if (battle.defender.units.some((u) => u.planetaryShield)) {
        return;
      }
      const hits = battle.attacker.units.filter((u) => u.bombardment !== void 0).map((u) => {
        logAttack(battle.attacker, u, "bombardment");
        return (0, roll_1.getHits)(u.bombardment);
      });
      battle.attacker.onBombardmentHit.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
          hits.forEach((hit) => {
            effect.onBombardmentHit(battle.attacker, battle, battle.defender, hit);
          });
        }
      });
      const totalHits = hits.reduce((a, b) => {
        return a + b.hits;
      }, 0);
      (0, util_log_1.logWrapper)(`bombardment produced ${totalHits} hits.`);
      battle.defender.hitsToAssign.hits += totalHits;
      resolveHits(battle, isDuringCombat, isDuringBombardment);
    }
    function doSpaceCannon(battle) {
      if (battle.place === enums_1.Place.space) {
        const attackerHits = getSpaceCannonHits(battle.attacker, battle, battle.defender);
        if (constant_1.LOG && battle.attacker.units.some((u) => !!u.spaceCannon)) {
          logHits(battle.attacker, attackerHits, "spaceCannon");
        }
        battle.defender.hitsToAssign = attackerHits;
      }
      const defenderHits = getSpaceCannonHits(battle.defender, battle, battle.attacker);
      if (constant_1.LOG && battle.defender.units.some((u) => !!u.spaceCannon)) {
        logHits(battle.defender, defenderHits, "spaceCannon");
      }
      battle.attacker.hitsToAssign = defenderHits;
    }
    function getSpaceCannonHits(p, battle, otherParticipant) {
      p.onSpaceCannon.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
          effect.onSpaceCannon(p, battle, otherParticipant, effect.name);
        }
      });
      return p.units.map((u) => {
        logAttack(p, u, "spaceCannon");
        const hitInfo = u.spaceCannon ? (0, roll_1.getHits)(u.spaceCannon) : { hits: 0, rollInfoList: [] };
        const hits = hitInfo.hits;
        return {
          hits: u.assignHitsToNonFighters ? 0 : hits,
          hitsToNonFighters: u.assignHitsToNonFighters ? hits : 0,
          hitsAssignedByEnemy: 0
          // I dont think any unit uses this, so I wont implement it now.
        };
      }).reduce((a, b) => {
        return {
          hits: a.hits + b.hits,
          hitsToNonFighters: a.hitsToNonFighters + b.hitsToNonFighters,
          hitsAssignedByEnemy: a.hitsAssignedByEnemy + b.hitsAssignedByEnemy
        };
      }, {
        hits: 0,
        hitsToNonFighters: 0,
        hitsAssignedByEnemy: 0
      });
    }
    function doAfb(battle) {
      if (battle.place !== enums_1.Place.space) {
        return;
      }
      battle.defender.afbHitsToAssign = getAfbHits(battle.attacker, battle, battle.defender);
      battle.attacker.afbHitsToAssign = getAfbHits(battle.defender, battle, battle.attacker);
      resolveAfbHits(battle.attacker);
      resolveAfbHits(battle.defender);
      battle.attacker.afterAfbEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
          effect.afterAfb(battle.attacker, battle, battle.defender, effect.name);
        }
      });
      battle.defender.afterAfbEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.defender)) {
          effect.afterAfb(battle.defender, battle, battle.attacker, effect.name);
        }
      });
      removeDeadUnits(battle.attacker, battle);
      removeDeadUnits(battle.defender, battle);
    }
    function getAfbHits(p, battle, otherParticipant) {
      p.onAfb.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
          effect.onAfb(p, battle, otherParticipant, effect.name);
        }
      });
      const hits = p.units.flatMap((u) => {
        logAttack(p, u, "afb");
        return u.afb ? [(0, roll_1.getHits)(u.afb)] : [];
      });
      const fighterHits = hits.reduce((a, b) => {
        return a + b.hits;
      }, 0);
      const rollInfoList = hits.flatMap((h) => h.rollInfoList);
      return {
        fighterHitsToAssign: fighterHits,
        rollInfoList
      };
    }
    function resolveAfbHits(p) {
      while (p.afbHitsToAssign.fighterHitsToAssign > 0) {
        const aliveFighter = p.units.find((u) => u.type === unit_1.UnitType.fighter && !u.isDestroyed);
        if (aliveFighter) {
          aliveFighter.isDestroyed = true;
          p.afbHitsToAssign.fighterHitsToAssign -= 1;
          (0, util_log_1.logWrapper)(`${p.side} lost fighter to anti fighter barrage`);
        } else {
          break;
        }
      }
    }
    function doBattleRolls(battle) {
      doParticipantBattleRolls(battle, battle.attacker, battle.defender);
      doParticipantBattleRolls(battle, battle.defender, battle.attacker);
    }
    function doParticipantBattleRolls(battle, p, otherParticipant) {
      const friendlyUnitTransformEffects = p.units.filter((unit) => !!unit.aura && unit.aura.length > 0).map((unit) => unit.aura).flat().filter((aura) => aura.place === battle.place || aura.place === "both");
      const friendlyAuras = friendlyUnitTransformEffects.filter((effect) => !!effect.transformUnit);
      const onCombatRoundStartAura = friendlyUnitTransformEffects.filter((effect) => !!effect.onCombatRoundStart);
      const enemyAuras = otherParticipant.units.filter((unit) => !!unit.aura && unit.aura.length > 0).map((unit) => unit.aura).flat().filter((effect) => !!effect.transformEnemyUnit).filter((aura) => aura.place === battle.place || aura.place === "both");
      p.onCombatRound.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
          effect.onCombatRound(p, battle, otherParticipant, effect.name);
        }
      });
      let units;
      if (onCombatRoundStartAura.length > 0) {
        units = (0, cloneDeep_1.default)(p.units);
        onCombatRoundStartAura.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
            effect.onCombatRoundStart(units, p, battle, effect.name);
          }
        });
      } else {
        units = p.units;
      }
      const hits = units.filter((unit) => (0, unitGet_1.doesUnitFitPlace)(unit, battle.place)).map((unit) => {
        friendlyAuras.forEach((effect) => {
          unit = effect.transformUnit(unit, p, battle);
        });
        enemyAuras.forEach((effect) => {
          unit = effect.transformEnemyUnit(unit, p, battle);
        });
        logAttack(p, unit, "combat");
        const hitInfo = unit.combat ? (0, roll_1.getHits)(unit.combat) : { hits: 0, rollInfoList: [] };
        if (unit.onHit) {
          unit.onHit(p, battle, otherParticipant, hitInfo);
        }
        p.onHit.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, battle.attacker)) {
            effect.onHit(battle.attacker, battle, battle.defender, hitInfo);
          }
        });
        const hits2 = hitInfo.hits;
        return {
          hits: unit.assignHitsToNonFighters ? 0 : hits2,
          hitsToNonFighters: unit.assignHitsToNonFighters ? hits2 : 0,
          hitsAssignedByEnemy: 0
          // I dont think any unit uses this, so I wont implement it now.
        };
      }).reduce((a, b) => {
        return {
          hits: a.hits + b.hits,
          hitsToNonFighters: a.hitsToNonFighters + b.hitsToNonFighters,
          hitsAssignedByEnemy: a.hitsAssignedByEnemy + b.hitsAssignedByEnemy
        };
      }, {
        hits: 0,
        hitsToNonFighters: 0,
        hitsAssignedByEnemy: 0
      });
      logHits(p, hits, "combat");
      otherParticipant.hitsToAssign = hits;
    }
    function resolveHits(battle, isDuringCombat, isDuringBombardment) {
      while (hasHitToAssign(battle.attacker) || hasHitToAssign(battle.defender)) {
        resolveParticipantHits(battle, battle.attacker, isDuringCombat, isDuringBombardment);
        resolveParticipantHits(battle, battle.defender, isDuringCombat, isDuringBombardment);
        removeDeadUnits(battle.attacker, battle);
        removeDeadUnits(battle.defender, battle);
      }
      clearSustains(battle.attacker);
      clearSustains(battle.defender);
    }
    function hasHitToAssign(p) {
      return p.hitsToAssign.hits > 0 || p.hitsToAssign.hitsToNonFighters > 0 || p.hitsToAssign.hitsAssignedByEnemy > 0;
    }
    function resolveParticipantHits(battle, p, isDuringCombat, isDuringBombardment) {
      while (hasHitToAssign(p)) {
        if (p.soakHits > 0) {
          soakHit(p);
          continue;
        }
        if (p.hitsToAssign.hitsAssignedByEnemy > 0) {
          if (p.hitsToAssign.hitsAssignedByEnemy > 1) {
            console.warn("hitsAssignedByEnemy is larger than one, we should assign them to best sustain unit! But that aint implemented!");
          }
          const highestWorthNonSustainUnit = (0, unitGet_1.getHighestWorthNonSustainUnit)(p, battle.place, true);
          if (highestWorthNonSustainUnit) {
            (0, util_log_1.logWrapper)(`${p.side} loses ${highestWorthNonSustainUnit.type} after hits assigned by opponent.`);
            highestWorthNonSustainUnit.isDestroyed = true;
          } else {
            const highestWorthSustainUnit = (0, unitGet_1.getHighestWorthSustainUnit)(p, battle.place, true);
            if (highestWorthSustainUnit) {
              doSustainDamage(battle, p, highestWorthSustainUnit, isDuringCombat);
            }
          }
          p.hitsToAssign.hitsAssignedByEnemy -= 1;
        } else if (p.hitsToAssign.hitsToNonFighters > 0) {
          const appliedHitToNonFighter = applyHit(battle, p, false, isDuringCombat, isDuringBombardment);
          if (!appliedHitToNonFighter) {
            applyHit(battle, p, true, isDuringCombat, isDuringBombardment);
          }
          p.hitsToAssign.hitsToNonFighters -= 1;
        } else {
          applyHit(battle, p, true, isDuringCombat, isDuringBombardment);
          p.hitsToAssign.hits -= 1;
        }
      }
    }
    function destroyUnit(battle, unit) {
      unit.isDestroyed = true;
      removeDeadUnits(battle.attacker, battle);
      removeDeadUnits(battle.defender, battle);
    }
    function removeDeadUnits(p, battle) {
      const deadUnits = p.units.filter((u) => u.isDestroyed);
      p.units = p.units.filter((u) => !u.isDestroyed);
      if (deadUnits.length > 0) {
        const otherParticipant = getOtherParticipant(battle, p);
        p.onDeath.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
            effect.onDeath(deadUnits, p, otherParticipant, battle, true, effect.name);
          }
        });
        otherParticipant.onDeath.forEach((effect) => {
          if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, otherParticipant)) {
            effect.onDeath(deadUnits, otherParticipant, p, battle, false, effect.name);
          }
        });
      }
    }
    function soakHit(p) {
      p.soakHits -= 1;
      if (p.hitsToAssign.hitsAssignedByEnemy > 0) {
        p.hitsToAssign.hitsAssignedByEnemy -= 1;
      } else if (p.hitsToAssign.hitsToNonFighters > 0) {
        p.hitsToAssign.hitsToNonFighters -= 1;
      } else if (p.hitsToAssign.hits > 0) {
        p.hitsToAssign.hits -= 1;
      } else {
        throw new Error("soak hits called without reason");
      }
      (0, util_log_1.logWrapper)(`${p.side} soaked a hit. ${p.soakHits} soaks remaining.`);
    }
    function applyHit(battle, p, includeFighter, isDuringCombat, isDuringBombardment) {
      const sustainDisabled = isSustainDisabled(battle, p, isDuringBombardment);
      const bestSustainUnit = (0, unitGet_1.getLowestWorthSustainUnit)(p, battle.place, includeFighter);
      if (bestSustainUnit && !sustainDisabled && (battle.place === enums_1.Place.ground || p.riskDirectHit || bestSustainUnit.immuneToDirectHit)) {
        doSustainDamage(battle, p, bestSustainUnit, isDuringCombat);
        return true;
      } else {
        const bestDieUnit = (0, unitGet_1.getLowestWorthUnit)(p, battle.place, includeFighter);
        if (bestDieUnit) {
          if (!sustainDisabled && bestDieUnit.sustainDamage && !bestDieUnit.takenDamage && !bestDieUnit.usedSustain) {
            doSustainDamage(battle, p, bestDieUnit, isDuringCombat);
          } else {
            bestDieUnit.isDestroyed = true;
            (0, util_log_1.logWrapper)(`${p.side} loses ${bestDieUnit.type}`);
          }
          return true;
        }
        return false;
      }
    }
    function doSustainDamage(battle, p, unit, isDuringCombat) {
      unit.takenDamage = true;
      unit.takenDamageRound = battle.roundNumber;
      unit.usedSustain = true;
      p.onSustainEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, p)) {
          effect.onSustain(unit, p, battle, effect.name, isDuringCombat);
        }
      });
      const otherP = getOtherParticipant(battle, p);
      otherP.onEnemySustainEffect.forEach((effect) => {
        if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, otherP)) {
          effect.onEnemySustain(unit, otherP, battle, effect.name, isDuringCombat);
        }
      });
      (0, util_log_1.logWrapper)(`${p.side} uses sustain on ${unit.type}`);
    }
    function doRepairStep(battle, isDuringCombat) {
      doRepairStepForParticipant(battle, battle.attacker, isDuringCombat);
      doRepairStepForParticipant(battle, battle.defender, isDuringCombat);
    }
    function doRepairStepForParticipant(battle, participant, isDuringCombat) {
      if (participant.onRepairEffect.length > 0) {
        participant.units.forEach((unit) => {
          participant.onRepairEffect.forEach((effect) => {
            if ((0, battleEffects_1.canBattleEffectBeUsed)(effect, participant)) {
              effect.onRepair(unit, participant, battle, effect.name, isDuringCombat);
            }
          });
        });
      }
    }
    function isBattleOngoing(battle) {
      return isParticipantAlive(battle.attacker, battle.place) && isParticipantAlive(battle.defender, battle.place);
    }
    function isParticipantAlive(p, place) {
      if (p.newUnits.length > 0) {
        return true;
      }
      return p.units.some((u) => {
        if (!(0, unitGet_1.doesUnitFitPlace)(u, place)) {
          return false;
        }
        return !u.isDestroyed;
      });
    }
    function isSustainDisabled(battle, p, isDuringBombardment) {
      const other = getOtherParticipant(battle, p);
      return other.units.some((u) => u.preventEnemySustain === true || !isDuringBombardment && u.preventEnemySustainOnPlanet === true);
    }
    function getOtherParticipant(battle, p) {
      return p.side === "attacker" ? battle.defender : battle.attacker;
    }
    function logAttack(p, unit, rollType) {
      const roll = unit[rollType];
      if (constant_1.LOG && roll) {
        const hit = roll.hit - roll.hitBonus - roll.hitBonusTmp;
        const count = roll.count + roll.countBonus + roll.countBonusTmp;
        const reroll = roll.reroll + roll.rerollBonus + roll.rerollBonusTmp;
        if (count === 1 && reroll === 0) {
          console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}.`);
        } else if (reroll === 0) {
          console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}, using ${count} dices`);
        } else if (count === 1) {
          console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}, using ${reroll} rerolls`);
        } else {
          console.log(`${p.side} does ${rollType} with ${unit.type} at ${hit}, using ${count} dices and ${reroll} rerolls.`);
        }
      }
    }
    function logHits(p, hits, rollType) {
      if (constant_1.LOG) {
        if (hits.hits === 0 && hits.hitsToNonFighters === 0) {
          console.log(`${p.side} ${rollType} missed all`);
        } else if (hits.hitsToNonFighters === 0) {
          console.log(`${p.side} ${rollType} hits ${hits.hits} normal hits.`);
        } else if (hits.hits === 0) {
          console.log(`${p.side} ${rollType} hits ${hits.hitsToNonFighters} to non-fighters.`);
        } else {
          console.log(`${p.side} ${rollType} hits ${hits.hits} normal hits and ${hits.hitsToNonFighters} to non-fighters.`);
        }
      }
    }
  }
});

// overlay/scripts/ti4calc2/core/factions/l1z1x.js
var require_l1z1x = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/l1z1x.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.l1z1x = void 0;
    var battle_1 = require_battle();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.l1z1x = [
      {
        type: "faction",
        name: "L1z1x flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), aura: [
              {
                name: "L1z1x flagship forcing shots on non-fighters",
                place: enums_1.Place.space,
                transformUnit: (auraUnit) => {
                  if (auraUnit.type === unit_1.UnitType.flagship || auraUnit.type === unit_1.UnitType.dreadnought) {
                    return Object.assign(Object.assign({}, auraUnit), { assignHitsToNonFighters: true });
                  } else {
                    return auraUnit;
                  }
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "L1z1x Harrow",
        place: enums_1.Place.ground,
        onCombatRoundEnd: (participant, battle, _otherParticipant) => {
          if (participant.side === "attacker") {
            (0, battle_1.doBombardment)(battle, true);
          }
        }
      },
      {
        type: "faction-tech",
        name: "L1z1x dreadnought upgrade",
        place: "both",
        faction: enums_1.Faction.l1z1x,
        unit: unit_1.UnitType.dreadnought,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.dreadnought) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 4 }), bombardment: Object.assign(Object.assign({}, unit.bombardment), { hit: 4 }) });
          } else {
            return unit;
          }
        }
      },
      // TODO add mech
      {
        type: "commander",
        description: "Units that have PLANETARY SHIELD do not prevent you from using Bombardment.",
        name: "L1z1x commander",
        place: enums_1.Place.ground,
        transformEnemyUnit: (u) => {
          return Object.assign(Object.assign({}, u), { planetaryShield: false });
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/mahact.js
var require_mahact = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/mahact.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mahact = void 0;
    var battle_types_1 = require_battle_types();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.mahact = [
      {
        type: "faction",
        name: "Mahact flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-ability",
        name: "Mahact flagship bonus",
        description: "Mahact flagship bonus. Flagship text is: During combat against an opponent whose command token is not in your fleet pool, apply +2 to the results of this unit's combat rolls.",
        place: enums_1.Place.space,
        faction: enums_1.Faction.mahact,
        priority: battle_types_1.EFFECT_LOW_PRIORITY,
        transformUnit: (u) => {
          if (u.type === unit_1.UnitType.flagship) {
            return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "permanent", 2);
          } else {
            return u;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/mentak.js
var require_mentak = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/mentak.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mentak = void 0;
    var enums_1 = require_enums();
    var roll_1 = require_roll();
    var unit_1 = require_unit();
    exports.mentak = [
      {
        // TODO test all auras that affects enemies
        // TODO test this ship with assault cannon for enemy. It should snipe the ship and retain sustain damage
        // test this ship with with assault cannon for us. It should snipe an enemy war sun
        type: "faction",
        name: "Mentak flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), preventEnemySustain: true });
          } else {
            return unit;
          }
        }
      },
      {
        name: "Mentak mech",
        type: "faction",
        place: enums_1.Place.ground,
        transformUnit: (u) => {
          if (u.type === unit_1.UnitType.mech) {
            return Object.assign(Object.assign({}, u), { preventEnemySustainOnPlanet: true });
          } else {
            return u;
          }
        }
      },
      {
        name: "Ambush",
        type: "faction",
        place: enums_1.Place.space,
        onStart: (participant, _battle, otherParticipant) => {
          const cruisers = participant.units.filter((u) => u.type === unit_1.UnitType.cruiser).slice(0, 2);
          const destroyers = participant.units.filter((u) => u.type === unit_1.UnitType.destroyer).slice(0, 2 - cruisers.length);
          const ambushShips = [...cruisers, ...destroyers];
          let hits = 0;
          for (const ambushShip of ambushShips) {
            const hit = (0, roll_1.getHits)(Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: ambushShip.combat.hit }));
            hits += hit.hits;
          }
          otherParticipant.hitsToAssign.hits += hits;
        }
      },
      {
        name: "Mentak hero",
        description: "At the start of space combat that you are participating in: You may purge this card; if you do, for each other player's ship that is destroyed during this combat, place 1 ship of that type from your reinforcements in the active system.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.mentak,
        onDeath: (deadUnits, participant, _otherParticipant, battle, isOwnUnit) => {
          if (isOwnUnit) {
            return;
          }
          for (const rawUnit of deadUnits) {
            const unit = (0, unit_1.createUnitAndApplyEffects)(rawUnit.type, participant, battle.place, () => {
            });
            participant.newUnits.push(unit);
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/muaat.js
var require_muaat = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/muaat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.muaat = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.muaat = [
      {
        type: "faction",
        name: "Muaat flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }) });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/naalu.js
var require_naalu = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/naalu.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.naalu = void 0;
    var battle_1 = require_battle();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.naalu = [
      {
        type: "faction",
        name: "Naalu flagship",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), battleEffects: [
              {
                name: "Naalu flagship ability",
                type: "other",
                place: enums_1.Place.ground,
                transformUnit: (unit2, p) => {
                  if (unit2.type === unit_1.UnitType.fighter && p.side === "attacker") {
                    return Object.assign(Object.assign({}, unit2), { isGroundForce: true });
                  } else {
                    return unit2;
                  }
                },
                onCombatRoundEnd: (participant, battle) => {
                  if (!(0, battle_1.isBattleOngoing)(battle)) {
                    participant.units.forEach((unit2) => {
                      if (unit2.type === unit_1.UnitType.fighter) {
                        unit2.isGroundForce = false;
                      }
                    });
                  }
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Naalu fighters",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.fighter) {
            unit.combat.hit = 8;
          }
          return unit;
        }
      },
      {
        type: "faction-tech",
        name: "Hybrid Crystal Fighter II",
        place: "both",
        faction: enums_1.Faction.naalu,
        unit: unit_1.UnitType.fighter,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.fighter) {
            unit.combat.hit = 7;
          }
          return unit;
        }
      },
      {
        type: "faction-ability",
        name: "Codex mech",
        description: "Use Naalu's Codex III Mech: Other players cannot use ANTI-FIGHTER BARRAGE against your units in this system.",
        place: "both",
        faction: enums_1.Faction.naalu,
        transformUnit: (unit, _p) => {
          if (unit.type === unit_1.UnitType.mech) {
            return Object.assign(Object.assign({}, unit), { battleEffects: [
              {
                name: "Naalu mech remove afb",
                type: "other",
                place: "both",
                transformEnemyUnit: (u) => {
                  return Object.assign(Object.assign({}, u), { afb: void 0 });
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/naazRokha.js
var require_naazRokha = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/naazRokha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.naazRokha = void 0;
    var util_log_1 = require_util_log();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.naazRokha = [
      {
        type: "faction",
        name: "Naaz-Rokha flagship",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), aura: [
              {
                name: "Naaz-Rokha flagship aura",
                type: "other",
                place: "both",
                transformUnit: (auraUnit) => {
                  if (auraUnit.type === unit_1.UnitType.mech) {
                    return (0, unit_1.getUnitWithImproved)(auraUnit, "combat", "count", "temp");
                  } else {
                    return auraUnit;
                  }
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Naaz-Rokha mech",
        place: "both",
        transformUnit: (unit, _p, place) => {
          if (unit.type === unit_1.UnitType.mech) {
            if (place === enums_1.Place.space) {
              return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 8, count: 2 }), sustainDamage: false, isShip: true, isGroundForce: false });
            } else {
              return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 2 }), sustainDamage: true, isShip: false, isGroundForce: true });
            }
          } else {
            return unit;
          }
        }
      },
      {
        name: "Supercharge",
        description: "At the start of a combat round, you may exhaust this card to apply +1 to the result of each of your unit's combat rolls during this combat round",
        type: "faction-tech",
        place: "both",
        faction: enums_1.Faction.naaz_rokha,
        transformUnit: (unit) => {
          return (0, unit_1.getUnitWithImproved)(unit, "combat", "hit", "temp");
        }
      },
      // TODO: Cannot be assigned hits from Unit abilities. Suggestion: Add "immuneToabilities" property to units and check for that in all relevant places
      {
        name: "Eidolon Maximum",
        description: "Naaz-Rokha Breakthrough: This unit is both a ship and a ground force. It cannot be assigned hits from unit abilities. Repair it at the start of every combat round. WARNING: Immunity to abilities is not yet implemented",
        type: "faction-ability",
        place: "both",
        faction: enums_1.Faction.naaz_rokha,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.mech) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 4, count: 4 }), sustainDamage: true, isShip: true, isGroundForce: true, battleEffects: [
              {
                name: "Eidolon Maximum repair",
                type: "other",
                place: "both",
                onCombatRound: (p) => {
                  p.units.forEach((u) => {
                    if (u.type === unit_1.UnitType.mech) {
                      (0, util_log_1.logWrapper)(`Eidolon Maximum repaired!`);
                      u.takenDamage = false;
                      u.takenDamageRound = void 0;
                    }
                  });
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/nekro.js
var require_nekro = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/nekro.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nekro = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.nekro = [
      {
        type: "faction",
        name: "Nekro flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), battleEffects: [
              {
                type: "other",
                name: "Nekro flagship ability",
                place: enums_1.Place.space,
                transformUnit: (unit2) => {
                  if (unit2.isGroundForce) {
                    return Object.assign(Object.assign({}, unit2), { isShip: true });
                  } else {
                    return unit2;
                  }
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-ability",
        description: `Nekro mech text is: During combat against an opponent who has an "X" or "Y" token on 1 or more of their technologies, apply +2 to the result of each of this unit's combat rolls.`,
        place: "both",
        faction: enums_1.Faction.nekro,
        name: "Nekro mech bonus",
        transformUnit: (unit, _p) => {
          if (unit.type === unit_1.UnitType.mech) {
            return (0, unit_1.getUnitWithImproved)(unit, "combat", "hit", "permanent", 2);
          } else {
            return unit;
          }
        }
      }
      // TODO should we care about copying technology mid combat? No, right?
      // TODO should we fix so nekro can copy faction techs?
      // If we do, make sure nekro does not gain all faction unit-techs just by trying to upgrade any unit
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/neutral.js
var require_neutral = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/neutral.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.neutral = void 0;
    exports.neutral = [];
  }
});

// overlay/scripts/ti4calc2/core/factions/nomad.js
var require_nomad = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/nomad.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nomad = void 0;
    var util_log_1 = require_util_log();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    exports.nomad = [
      {
        type: "faction",
        name: "Nomad flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), afb: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 8, count: 3 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-tech",
        name: "Nomad flagship upgrade",
        place: enums_1.Place.space,
        faction: enums_1.Faction.nomad,
        unit: unit_1.UnitType.flagship,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), afb: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 }) });
          } else {
            return unit;
          }
        }
      },
      {
        name: "Memoria I",
        description: "At the start of a space combat against a player other than the Nomad: During this combat, treat 1 of your non-fighter ships as if it has the SUSTAIN DAMAGE ability, combat value, and ANTI-FIGHTER BARRAGE value of the Nomad's flagship",
        type: "promissary",
        place: enums_1.Place.space,
        onStart: (participant, _battle, otherParticipant) => {
          if (otherParticipant.faction === enums_1.Faction.nomad) {
            return;
          }
          const worstNonFighterShip = (0, unitGet_1.getWeakestCombatUnit)(participant, enums_1.Place.space, false);
          if (!worstNonFighterShip) {
            return;
          }
          (0, util_log_1.logWrapper)(`${participant.side} used nomad promissary to transform ${worstNonFighterShip.type} into the Memoria I!`);
          worstNonFighterShip.combat = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 });
          worstNonFighterShip.afb = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 });
          worstNonFighterShip.sustainDamage = true;
        }
      },
      {
        name: "Memoria II",
        description: "At the start of a space combat against a player other than the Nomad: During this combat, treat 1 of your non-fighter ships as if it has the SUSTAIN DAMAGE ability, combat value, and ANTI-FIGHTER BARRAGE value of the Nomad's flagship",
        type: "promissary",
        place: enums_1.Place.space,
        onStart: (participant, _battle, otherParticipant) => {
          if (otherParticipant.faction === enums_1.Faction.nomad) {
            return;
          }
          const worstNonFighterShip = (0, unitGet_1.getWeakestCombatUnit)(participant, enums_1.Place.space, false);
          if (!worstNonFighterShip) {
            return;
          }
          (0, util_log_1.logWrapper)(`${participant.side} used nomad promissary to transform ${worstNonFighterShip.type} into the Memoria II!`);
          worstNonFighterShip.combat = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, countBonus: 2 });
          worstNonFighterShip.afb = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, countBonus: 3 });
          worstNonFighterShip.sustainDamage = true;
        }
      },
      {
        name: "Nomad mech sustain in space battle ability",
        type: "faction",
        place: enums_1.Place.space,
        onStart: (participant) => {
          const mechCount = participant.units.filter((u) => u.type === unit_1.UnitType.mech).length;
          participant.soakHits += mechCount;
        }
      }
      // TODO add agent? Would require "determine when round is worse than average" function and "redo round" function.
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/sardakkNorr.js
var require_sardakkNorr = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/sardakkNorr.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sardarkkNorr = void 0;
    var times_1 = __importDefault(require_times());
    var util_log_1 = require_util_log();
    var battle_1 = require_battle();
    var battle_types_1 = require_battle_types();
    var battleEffects_1 = require_battleEffects();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    exports.sardarkkNorr = [
      {
        type: "faction",
        name: "Sardakk Norr flagship",
        place: enums_1.Place.space,
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
          var _a;
          if (unit.type === unit_1.UnitType.flagship) {
            const flagshipBuff = {
              name: "Sardakk Norr flagship buff",
              place: enums_1.Place.space,
              transformUnit: (auraUnit) => {
                if (auraUnit.combat && auraUnit.type !== unit_1.UnitType.flagship) {
                  return (0, unit_1.getUnitWithImproved)(auraUnit, "combat", "hit", "temp");
                } else {
                  return auraUnit;
                }
              }
            };
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 2 }), aura: [...(_a = unit.aura) !== null && _a !== void 0 ? _a : [], flagshipBuff] });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Sardakk mech ability",
        place: enums_1.Place.ground,
        onSustain: (u, participant, battle, _effectName, isDuringCombat) => {
          if (u.type === unit_1.UnitType.mech && isDuringCombat) {
            const otherParticipant = (0, battle_1.getOtherParticipant)(battle, participant);
            otherParticipant.hitsToAssign.hits += 1;
            (0, util_log_1.logWrapper)(`${participant.side} assigned hit to enemy due to mech sustain.`);
          }
        }
      },
      {
        type: "faction",
        name: "Sardakk Norr buff",
        place: "both",
        transformUnit: (unit) => {
          if (unit.combat) {
            return (0, unit_1.getUnitWithImproved)(unit, "combat", "hit", "permanent");
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Sardakk Norr dreadnoughts",
        place: "both",
        priority: battle_types_1.EFFECT_HIGH_PRIORITY,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.dreadnought) {
            unit.bombardment.hit = 4;
            unit.bombardment.count = 2;
          }
          return unit;
        }
      },
      {
        type: "faction-tech",
        name: "Exotrireme II",
        place: "both",
        faction: enums_1.Faction.sardakk_norr,
        unit: unit_1.UnitType.dreadnought,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.dreadnought) {
            return Object.assign(Object.assign({}, unit), { immuneToDirectHit: true });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-ability",
        name: "Exotrireme II should suicide",
        description: 'If the Sardakk dreadnought is upgraded, it will activate its ability after the first combat round. The ability reads: "After a round of space combat, you may destroy this unit to destroy up to 2 ships in this system. Just enough ships will be sacrified to kill all enemy ships"',
        place: enums_1.Place.space,
        faction: enums_1.Faction.sardakk_norr,
        onCombatRoundEnd: (participant, battle, otherParticipant) => {
          if (participant.unitUpgrades[unit_1.UnitType.dreadnought] && (0, battle_1.isParticipantAlive)(otherParticipant, battle.place)) {
            const enemyCount = (0, unitGet_1.getUnits)(otherParticipant, battle.place, true).length;
            const units = (0, unitGet_1.getUnits)(participant, battle.place, false);
            const dreadNoughtsToSuicide = units.filter((u) => u.type === unit_1.UnitType.dreadnought).sort((u1) => u1.takenDamage ? -1 : 1).slice(0, Math.ceil(enemyCount / 2));
            dreadNoughtsToSuicide.forEach((u) => {
              (0, battle_1.destroyUnit)(battle, u);
            });
            (0, util_log_1.logWrapper)(`${participant.side} used Exotrireme II ability for ${dreadNoughtsToSuicide.length} ships.`);
            (0, times_1.default)(dreadNoughtsToSuicide.length * 2, () => {
              const highestWorthUnit = (0, unitGet_1.getHighestWorthUnit)(otherParticipant, battle.place, true);
              if (highestWorthUnit) {
                (0, util_log_1.logWrapper)(`${highestWorthUnit.type} was destroyed by Exotrireme II ability.`);
                (0, battle_1.destroyUnit)(battle, highestWorthUnit);
              }
            });
          }
        }
      },
      {
        type: "faction-tech",
        name: "Valkyrie Particle Weave",
        description: "After making combat rolls during a round of ground combat, if your opponent produced 1 or more hits, you produce 1 additional hit",
        place: enums_1.Place.ground,
        faction: enums_1.Faction.sardakk_norr,
        onDeath: (_deadUnits, participant, otherParticipant, _battle, isOwnUnit, effectName) => {
          if (!isOwnUnit) {
            return;
          }
          otherParticipant.hitsToAssign.hits += 1;
          (0, battleEffects_1.registerUse)(effectName, participant);
          (0, util_log_1.logWrapper)(`${participant.side} uses Valkyrie Particle Weave to produce 1 hit`);
        },
        onSustain: (_u, participant, battle, effectName) => {
          const otherParticipant = (0, battle_1.getOtherParticipant)(battle, participant);
          otherParticipant.hitsToAssign.hits += 1;
          (0, battleEffects_1.registerUse)(effectName, participant);
          (0, util_log_1.logWrapper)(`${participant.side} uses Valkyrie Particle Weave to produce 1 hit`);
        },
        timesPerRound: 1
      },
      {
        type: "promissary",
        name: "Tekklar Legion",
        description: "At the start of an invasion combat: Apply +1 to the result of each of your unit's combat rolls during this combat.  If your opponent is the N'orr player, apply -1 to the result of each of his unit's combat rolls during this combat.",
        place: enums_1.Place.ground,
        onStart: (participant, _battle, otherParticipant) => {
          participant.units.forEach((unit) => {
            if (unit.combat) {
              unit.combat.hitBonus += 1;
            }
          });
          if (otherParticipant.faction === enums_1.Faction.sardakk_norr) {
            otherParticipant.units.forEach((unit) => {
              if (unit.combat) {
                unit.combat.hitBonus -= 1;
              }
            });
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/sol.js
var require_sol = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/sol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sol = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.sol = [
      {
        type: "faction",
        name: "Sol flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Sol infantry",
        place: enums_1.Place.ground,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.infantry) {
            unit.combat.hit = 7;
          }
          return unit;
        }
      },
      {
        type: "faction-tech",
        name: "Spec Ops II",
        place: enums_1.Place.ground,
        faction: enums_1.Faction.sol,
        unit: unit_1.UnitType.infantry,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.infantry) {
            unit.combat.hit = 6;
          }
          return unit;
        }
      },
      {
        type: "faction-tech",
        name: "Advanced Carrier II",
        place: enums_1.Place.space,
        faction: enums_1.Faction.sol,
        unit: unit_1.UnitType.carrier,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.carrier) {
            return Object.assign(Object.assign({}, unit), {
              sustainDamage: true,
              // really hard to determine sustain priority here... lets keep it low
              useSustainDamagePriority: 25
            });
          }
          return unit;
        }
      },
      {
        type: "agent",
        description: "At the start of a ground combat round: You may exhaust this card to choose 1 ground force in the active system; that ground force rolls 1 additional die during that combat round.",
        name: "Sol agent",
        place: enums_1.Place.ground,
        onStart: (participant, battle) => {
          if (battle.place === enums_1.Place.ground) {
            const infantry = participant.units.find((u) => u.type === unit_1.UnitType.infantry && u.combat !== void 0);
            if (infantry) {
              infantry.combat.countBonusTmp += 1;
            }
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/titansOfUl.js
var require_titansOfUl = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/titansOfUl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.titansOfUl = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.titansOfUl = [
      {
        type: "faction",
        name: "Titans of Ul flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }) });
          } else {
            return unit;
          }
        }
      },
      // TODO add some tests...
      {
        type: "faction",
        name: "Titans of Ul pds",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.pds) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7 }), isGroundForce: true, sustainDamage: true, useSustainDamagePriority: 20, diePriority: 20 });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-tech",
        name: "Titans of Ul pds upgrade",
        place: "both",
        faction: enums_1.Faction.titans_of_ul,
        unit: unit_1.UnitType.pds,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.pds) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 6 }), spaceCannon: Object.assign(Object.assign({}, unit.spaceCannon), { hit: 5 }), isGroundForce: true, sustainDamage: true, useSustainDamagePriority: 20, diePriority: 20 });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction-tech",
        name: "Titans of Ul cruiser upgrade",
        place: enums_1.Place.space,
        faction: enums_1.Faction.titans_of_ul,
        unit: unit_1.UnitType.cruiser,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.cruiser) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 6 }), useSustainDamagePriority: 200, sustainDamage: true });
          } else {
            return unit;
          }
        }
      },
      {
        type: "agent",
        description: "When a hit is produced against a unit: You may exhaust this card to cancel that hit.",
        name: "Titans agent",
        place: "both",
        beforeStart: (p) => {
          p.soakHits += 1;
        }
      },
      {
        type: "general",
        description: "The Titans hero gives their home system planet SPACE CANNON 5 (x3) ability as if it were a unit.",
        name: "Titans hero",
        place: "both",
        beforeStart: (p, battle) => {
          const modify = (instance) => {
            instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 });
          };
          const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
          p.units.push(planetUnit);
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/vuilRaith.js
var require_vuilRaith = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/vuilRaith.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.vuilRaith = void 0;
    var unit_1 = require_unit();
    exports.vuilRaith = [
      {
        type: "faction",
        name: "Vuil'Raith flagship",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }), bombardment: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5 }) });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/winnu.js
var require_winnu = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/winnu.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.winnu = void 0;
    var util_log_1 = require_util_log();
    var battle_1 = require_battle();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    exports.winnu = [
      {
        type: "faction",
        name: "Winnu flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 1 }), aura: [
              {
                name: "Winnu Flagship ability",
                type: "other",
                place: enums_1.Place.space,
                transformUnit: (auraUnit, p, battle) => {
                  if (auraUnit.type === unit_1.UnitType.flagship) {
                    const opponent = (0, battle_1.getOtherParticipant)(battle, p);
                    const nonFighterShips = (0, unitGet_1.getNonFighterShips)(opponent);
                    return Object.assign(Object.assign({}, auraUnit), { combat: Object.assign(Object.assign({}, auraUnit.combat), { count: nonFighterShips.length }) });
                  }
                  return auraUnit;
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        type: "commander",
        description: "During combat: Apply +2 to the result of each of your unit's combat rolls in the Mecatol Rex system, your home system, and each system that contains a legendary planet.",
        name: "Winnu commander",
        place: "both",
        transformUnit: (u) => {
          return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "permanent", 2);
        }
      },
      {
        name: "Imperator",
        type: "faction-ability",
        description: `Winnu Breakthrough: Apply +1 to the results of each of your unit's combat rolls for each "Support for the Throne" in your opponent's play area.`,
        place: "both",
        faction: enums_1.Faction.winnu,
        count: true,
        onStart: (p, _battle, _op, effectName) => {
          p.units.forEach((u) => {
            var _a, _b;
            if (u.combat) {
              u.combat.hitBonus += (_a = p.effects[effectName]) !== null && _a !== void 0 ? _a : 0;
              (0, util_log_1.logWrapper)(`${p.side} used Imperator to give all units a +${(_b = p.effects[effectName]) !== null && _b !== void 0 ? _b : 0} to hit.`);
            }
          });
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/xxcha.js
var require_xxcha = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/xxcha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.xxcha = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.xxcha = [
      {
        type: "faction",
        name: "Xxcha flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 7, count: 2 }), spaceCannon: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 }) });
          } else {
            return unit;
          }
        }
      },
      {
        type: "faction",
        name: "Xxcha mech",
        place: "both",
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.mech) {
            return Object.assign(Object.assign({}, unit), { spaceCannon: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 8 }) });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/yin.js
var require_yin = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/yin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.yin = void 0;
    var util_log_1 = require_util_log();
    var battle_1 = require_battle();
    var battleEffects_1 = require_battleEffects();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.yin = [
      {
        type: "faction",
        name: "Yin flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 9, count: 2 }), battleEffects: [
              {
                name: 'Yin flagship "kill everything" effect',
                type: "other",
                place: enums_1.Place.space,
                onDeath: (deadUnits, participant, otherParticipant, _battle, isOwnUnit) => {
                  if (isOwnUnit && deadUnits.some((u) => u.type === unit_1.UnitType.flagship)) {
                    participant.units.forEach((u) => u.isDestroyed = true);
                    otherParticipant.units.forEach((u) => u.isDestroyed = true);
                  }
                }
              }
            ] });
          } else {
            return unit;
          }
        }
      },
      {
        name: "Devotion",
        description: "After each space battle round, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit and assign it to 1 of your opponent's ships in that system.",
        type: "faction-ability",
        place: enums_1.Place.space,
        faction: enums_1.Faction.yin,
        onCombatRoundEnd: (participant, battle, otherParticipant) => {
          var _a;
          if (participant.units.length === 1 && otherParticipant.units.every((u) => u.sustainDamage && !u.takenDamage)) {
            return;
          }
          if (!(0, battle_1.isParticipantAlive)(otherParticipant, battle.place)) {
            return;
          }
          const suicideUnit = (_a = participant.units.find((u) => u.type === unit_1.UnitType.destroyer)) !== null && _a !== void 0 ? _a : participant.units.find((u) => u.type === unit_1.UnitType.cruiser);
          if (suicideUnit) {
            (0, battle_1.destroyUnit)(battle, suicideUnit);
            otherParticipant.hitsToAssign.hitsAssignedByEnemy += 1;
            (0, util_log_1.logWrapper)(`${participant.side} uses devotion to destroy their own ${suicideUnit.type}`);
          }
        }
      },
      {
        name: "Impulse Core",
        description: "At the start of a space combat, you may destroy 1 of your cruisers or destroyers in the active system to produce 1 hit against your opponent's ships; that hit must be assigned by your opponent to 1 of their non-fighters ships if able.",
        type: "faction-tech",
        place: enums_1.Place.space,
        faction: enums_1.Faction.yin,
        onStart: (participant, battle, otherParticipant) => {
          var _a;
          if (participant.units.length === 1 && otherParticipant.units.every((u) => u.sustainDamage && !u.takenDamage)) {
            return;
          }
          const suicideUnit = (_a = participant.units.find((u) => u.type === unit_1.UnitType.destroyer)) !== null && _a !== void 0 ? _a : participant.units.find((u) => u.type === unit_1.UnitType.cruiser);
          if (suicideUnit) {
            (0, battle_1.destroyUnit)(battle, suicideUnit);
            otherParticipant.hitsToAssign.hitsToNonFighters += 1;
          }
        }
      },
      {
        name: "Yin agent",
        description: "After a player's unit is destroyed: You may exhaust this card to allow that player to place 2 fighters in the destroyed unit's system if it was a ship, or 2 infantry on its planet if it was a ground force.",
        type: "agent",
        place: "both",
        onDeath: (_deadUnits, participant, _otherParticipant, battle, isOwnUnit, effectName) => {
          if (!isOwnUnit) {
            return;
          }
          if (battle.place === enums_1.Place.space) {
            const newFigher1 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.fighter, participant, battle.place, () => {
            });
            const newFigher2 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.fighter, participant, battle.place, () => {
            });
            participant.newUnits.push(newFigher1);
            participant.newUnits.push(newFigher2);
            (0, util_log_1.logWrapper)(`${participant.side} uses Yin agent to summon two fighters when a unit was destroyed`);
          } else {
            const newInfantry1 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.infantry, participant, battle.place, () => {
            });
            const newInfantry2 = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.infantry, participant, battle.place, () => {
            });
            participant.newUnits.push(newInfantry1);
            participant.newUnits.push(newInfantry2);
            (0, util_log_1.logWrapper)(`${participant.side} uses Yin agent to summon two infantry when a unit was destroyed`);
          }
          (0, battleEffects_1.registerUse)(effectName, participant);
        },
        timesPerFight: 1
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/yssaril.js
var require_yssaril = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/yssaril.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.yssaril = void 0;
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    exports.yssaril = [
      {
        type: "faction",
        name: "Yssaril flagship",
        place: enums_1.Place.space,
        transformUnit: (unit) => {
          if (unit.type === unit_1.UnitType.flagship) {
            return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 }) });
          } else {
            return unit;
          }
        }
      }
    ];
  }
});

// overlay/scripts/ti4calc2/core/factions/faction.js
var require_faction = __commonJS({
  "overlay/scripts/ti4calc2/core/factions/faction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFactionBattleEffects = getFactionBattleEffects;
    exports.getFactionStuffNonUnit = getFactionStuffNonUnit;
    exports.getPromissary = getPromissary;
    exports.getAgent = getAgent;
    exports.getCommanders = getCommanders;
    exports.getGeneralEffectFromFactions = getGeneralEffectFromFactions;
    var enums_1 = require_enums();
    var arborec_1 = require_arborec();
    var argentFlight_1 = require_argentFlight();
    var baronyOfLetnev_1 = require_baronyOfLetnev();
    var clanOfSaar_1 = require_clanOfSaar();
    var creuss_1 = require_creuss();
    var crimsonRebellion_1 = require_crimsonRebellion();
    var deepwrought_1 = require_deepwrought();
    var empyrean_1 = require_empyrean();
    var hacan_1 = require_hacan();
    var jolNar_1 = require_jolNar();
    var keleres_1 = require_keleres();
    var l1z1x_1 = require_l1z1x();
    var mahact_1 = require_mahact();
    var mentak_1 = require_mentak();
    var muaat_1 = require_muaat();
    var naalu_1 = require_naalu();
    var naazRokha_1 = require_naazRokha();
    var nekro_1 = require_nekro();
    var neutral_1 = require_neutral();
    var nomad_1 = require_nomad();
    var sardakkNorr_1 = require_sardakkNorr();
    var sol_1 = require_sol();
    var titansOfUl_1 = require_titansOfUl();
    var vuilRaith_1 = require_vuilRaith();
    var winnu_1 = require_winnu();
    var xxcha_1 = require_xxcha();
    var yin_1 = require_yin();
    var yssaril_1 = require_yssaril();
    var FACTION_MAP = {
      Arborec: arborec_1.arborec,
      "Argent flight": argentFlight_1.argentFlight,
      "Barony of Letnev": baronyOfLetnev_1.baronyOfLetnev,
      "Clan of Saar": clanOfSaar_1.clanOfSaar,
      Creuss: creuss_1.creuss,
      "Crimson Rebellion": crimsonRebellion_1.crimsonRebellion,
      Deepwrought: deepwrought_1.deepwrought,
      Empyrean: empyrean_1.empyrean,
      Hacan: hacan_1.hacan,
      "Jol-Nar": jolNar_1.jolNar,
      Keleres: keleres_1.keleres,
      L1z1x: l1z1x_1.l1z1x,
      Mahact: mahact_1.mahact,
      Mentak: mentak_1.mentak,
      Muaat: muaat_1.muaat,
      "Naaz-Rokha": naazRokha_1.naazRokha,
      Naalu: naalu_1.naalu,
      Nekro: nekro_1.nekro,
      Neutral: neutral_1.neutral,
      Nomad: nomad_1.nomad,
      "Sardakk N'orr": sardakkNorr_1.sardarkkNorr,
      Sol: sol_1.sol,
      "Titans of Ul": titansOfUl_1.titansOfUl,
      "Vuil'Raith": vuilRaith_1.vuilRaith,
      Winnu: winnu_1.winnu,
      Xxcha: xxcha_1.xxcha,
      Yin: yin_1.yin,
      Yssaril: yssaril_1.yssaril
    };
    function getFactionBattleEffects(p) {
      if (isParticipant(p)) {
        return FACTION_MAP[p.faction];
      } else {
        return FACTION_MAP[p];
      }
    }
    function isParticipant(p) {
      if (p.battleEffects !== void 0) {
        return true;
      } else {
        return false;
      }
    }
    function getFactionStuffNonUnit() {
      return Object.values(enums_1.Faction).map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => (effect.type === "faction-tech" || effect.type === "faction-ability") && effect.unit === void 0);
      }).flat();
    }
    function getPromissary() {
      return Object.values(enums_1.Faction).map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === "promissary");
      }).flat();
    }
    function getAgent() {
      return Object.values(enums_1.Faction).map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === "agent");
      }).flat();
    }
    function getCommanders() {
      return Object.values(enums_1.Faction).map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === "commander");
      }).flat();
    }
    function getGeneralEffectFromFactions() {
      return Object.values(enums_1.Faction).map((factionName) => {
        const faction = FACTION_MAP[factionName];
        return faction.filter((effect) => effect.type === "general");
      }).flat();
    }
  }
});

// overlay/scripts/ti4calc2/core/battleeffect/actioncard.js
var require_actioncard = __commonJS({
  "overlay/scripts/ti4calc2/core/battleeffect/actioncard.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.waylay = exports.solarFlare = exports.scrambleFrequency = exports.reflectiveShielding = exports.blitz = exports.shieldsHolding = exports.moraleBoost = exports.maneuveringJets = exports.fireTeam = exports.fighterPrototype = exports.experimentalBattlestation = exports.emergencyRepairs = exports.disable = exports.directHit = exports.courageousToTheEnd = exports.bunker = void 0;
    exports.getActioncards = getActioncards;
    var times_1 = __importDefault(require_times());
    var util_log_1 = require_util_log();
    var battle_1 = require_battle();
    var battle_types_1 = require_battle_types();
    var enums_1 = require_enums();
    var roll_1 = require_roll();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    var battleEffects_1 = require_battleEffects();
    function getActioncards() {
      return [
        exports.bunker,
        exports.courageousToTheEnd,
        exports.directHit,
        exports.disable,
        exports.emergencyRepairs,
        exports.experimentalBattlestation,
        exports.fighterPrototype,
        exports.fireTeam,
        // maneuveringJets,
        exports.moraleBoost,
        exports.shieldsHolding,
        exports.blitz,
        exports.reflectiveShielding,
        // scrambleFrequency,
        exports.solarFlare
        // waylay,
      ];
    }
    exports.bunker = {
      name: "Bunker",
      description: "During this invasion, apply -4 to the result of each BOMBARDMENT roll against planets you control.",
      type: "action-card",
      side: "defender",
      place: enums_1.Place.ground,
      transformEnemyUnit: (u) => {
        if (u.bombardment) {
          return (0, unit_1.getUnitWithImproved)(u, "bombardment", "hit", "permanent", -4);
        } else {
          return u;
        }
      }
    };
    exports.courageousToTheEnd = {
      name: "Courageous to the End",
      description: "After 1 of your ships is destroyed during a space combat: Roll 2 dice. For each result equal to or greater than that ship's combat value, your opponent must choose and destroy 1 of their ships. It will be played as soon as possible, even if it is just a fighter that is destroyed.",
      type: "action-card",
      place: enums_1.Place.space,
      onDeath: (deadUnits, participant, otherParticipant, battle, isOwnUnit, effectName) => {
        if (!isOwnUnit) {
          return;
        }
        const bestDeadUnit = deadUnits.reduce((a, b) => {
          var _a, _b, _c, _d;
          return ((_b = (_a = a.combat) === null || _a === void 0 ? void 0 : _a.hit) !== null && _b !== void 0 ? _b : 10) > ((_d = (_c = b.combat) === null || _c === void 0 ? void 0 : _c.hit) !== null && _d !== void 0 ? _d : 10) ? a : b;
        });
        if (!bestDeadUnit.combat) {
          return;
        }
        const roll = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: bestDeadUnit.combat.hit, count: 2 });
        const hits = (0, roll_1.getHits)(roll);
        (0, util_log_1.logWrapper)(`${participant.side} plays Courageous to the End on death of ${bestDeadUnit.type} and makes ${hits.hits} kill(s).`);
        (0, times_1.default)(hits.hits, () => {
          const lowestWorthUnit = (0, unitGet_1.getLowestWorthUnit)(otherParticipant, battle.place, true);
          if (lowestWorthUnit) {
            (0, battle_1.destroyUnit)(battle, lowestWorthUnit);
            (0, util_log_1.logWrapper)(`Courageous to the End destroyed ${lowestWorthUnit.type}`);
          }
        });
        (0, battleEffects_1.registerUse)(effectName, participant);
      },
      timesPerFight: 1
    };
    exports.directHit = {
      name: "Direct Hit",
      description: "After another player's ship uses SUSTAIN DAMAGE to cancel a hit produced by your units or abilities: Destroy that ship.",
      type: "action-card",
      place: enums_1.Place.space,
      count: true,
      onEnemySustain: (u, participant, _battle, effectName) => {
        var _a;
        if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
          if (!u.immuneToDirectHit && !u.isDestroyed) {
            u.isDestroyed = true;
            (0, util_log_1.logWrapper)(`${participant.side} used direct hit to destroy ${u.type}`);
            if (participant.effects[effectName] !== void 0) {
              participant.effects[effectName] -= 1;
            }
          }
        }
      }
    };
    exports.disable = {
      name: "Disable",
      description: "Your opponents' PDS units lose Planetary Shield and Space Cannon during this invasion.",
      type: "action-card",
      place: enums_1.Place.ground,
      side: "attacker",
      priority: battle_types_1.EFFECT_LOW_PRIORITY,
      transformEnemyUnit: (u) => {
        if (u.type === unit_1.UnitType.pds) {
          return Object.assign(Object.assign({}, u), { planetaryShield: false, spaceCannon: void 0 });
        } else {
          return u;
        }
      }
    };
    exports.emergencyRepairs = {
      name: "Emergency Repairs",
      description: "At the start or end of a combat round: Repair all of your units that have SUSTAIN DAMAGE in the active system.",
      type: "action-card",
      place: "both",
      onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
        if (participant.units.some((u) => u.takenDamage && u.sustainDamage)) {
          participant.units.forEach((u) => {
            u.takenDamage = false;
          });
          (0, util_log_1.logWrapper)(`${participant.side} used Emergency repair`);
          (0, battleEffects_1.registerUse)(effectName, participant);
        }
      },
      onCombatRoundEnd: (participant, _battle, _otherParticipant, effectName) => {
        if (participant.units.some((u) => u.takenDamage && u.sustainDamage)) {
          participant.units.forEach((u) => {
            u.takenDamage = false;
          });
          (0, util_log_1.logWrapper)(`${participant.side} used Emergency repair`);
          (0, battleEffects_1.registerUse)(effectName, participant);
        }
      },
      timesPerFight: 1
    };
    exports.experimentalBattlestation = {
      name: "Experimental Battlestation",
      description: "After another player moves ships into a system during a tactical action: Choose 1 of your space docks that is either in or adjacent to that system. That space dock uses Space Cannon 5 (x3) against ships in the active system.",
      type: "action-card",
      place: enums_1.Place.space,
      beforeStart: (p, battle) => {
        const modify = (instance) => {
          instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 3 });
        };
        const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
        p.units.push(planetUnit);
      }
    };
    exports.fighterPrototype = {
      name: "Fighter Prototype",
      description: "At the start of the first round of a space combat: Apply +2 to the result of each of your fighters' combat rolls during this combat round.",
      type: "action-card",
      place: enums_1.Place.space,
      transformUnit: (u) => {
        if (u.type === unit_1.UnitType.fighter) {
          return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "temp", 2);
        } else {
          return u;
        }
      }
    };
    exports.fireTeam = {
      name: "Fire Team",
      description: "After your ground forces make combat rolls during a round of ground combat: Reroll any number of your dice.",
      type: "action-card",
      place: enums_1.Place.ground,
      transformUnit: (u) => {
        if (u.type === unit_1.UnitType.infantry || u.type === unit_1.UnitType.mech) {
          return (0, unit_1.getUnitWithImproved)(u, "combat", "reroll", "temp", 1);
        } else {
          return u;
        }
      }
    };
    exports.maneuveringJets = {
      name: "Maneuvering Jets",
      description: "Before you assign hits produced by another player's Space Cannon roll: Cancel 1 hit.",
      type: "action-card",
      place: "both"
      // TODO
    };
    exports.moraleBoost = {
      name: "Morale Boost",
      description: "At the start of a combat round: Apply +1 to the result of each of your unit's combat rolls during this combat round.",
      type: "action-card",
      place: "both",
      count: true,
      onCombatRound: (participant, _battle, _otherParticipant, effectName) => {
        var _a;
        if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) > 0) {
          participant.units.forEach((u) => {
            if (u.combat) {
              u.combat.hitBonusTmp += 1;
            }
          });
          if (participant.effects[effectName] !== void 0) {
            participant.effects[effectName] -= 1;
          }
        }
      }
    };
    exports.shieldsHolding = {
      name: "Shields Holding",
      description: "Before you assign hits to your ships during a space combat: Cancel up to 2 hits.",
      type: "action-card",
      place: enums_1.Place.space,
      count: true,
      timesPerRound: 1,
      onCombatRoundEndBeforeAssign: (participant, _battle, _otherParticipant, effectName) => {
        var _a;
        if (((_a = participant.effects[effectName]) !== null && _a !== void 0 ? _a : 0) === 0) {
          return;
        }
        if (participant.hitsToAssign.hitsAssignedByEnemy > 0 || participant.hitsToAssign.hitsToNonFighters > 0 || participant.hitsToAssign.hits > 0) {
          let cancel = 2;
          const cancelHitsAssignedByEnemy = Math.min(cancel, participant.hitsToAssign.hitsAssignedByEnemy);
          cancel -= cancelHitsAssignedByEnemy;
          participant.hitsToAssign.hitsAssignedByEnemy -= cancelHitsAssignedByEnemy;
          const cancelHitsToNonFighters = Math.min(cancel, participant.hitsToAssign.hitsToNonFighters);
          cancel -= cancelHitsToNonFighters;
          participant.hitsToAssign.hitsToNonFighters -= cancelHitsToNonFighters;
          const cancelHits = Math.min(cancel, participant.hitsToAssign.hits);
          cancel -= cancelHits;
          participant.hitsToAssign.hits -= cancelHits;
          (0, battleEffects_1.registerUse)(effectName, participant);
          if (participant.effects[effectName] !== void 0) {
            participant.effects[effectName] -= 1;
          }
        }
      }
    };
    exports.blitz = {
      name: "Blitz",
      description: "At the start of an invasion: Each of your non-fighter ships in the active system that do not have BOMBARDMENT gain BOMBARDMENT 6 until the end of the invasion.",
      type: "action-card",
      place: enums_1.Place.ground,
      side: "attacker",
      transformUnit: (u, _p, place) => {
        if (!(0, unitGet_1.doesUnitFitPlace)(u, place) && u.type !== unit_1.UnitType.fighter && !u.bombardment) {
          return Object.assign(Object.assign({}, u), { bombardment: Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6 }) });
        } else {
          return u;
        }
      }
    };
    exports.reflectiveShielding = {
      name: "Reflective Shielding",
      description: "When one of your ships uses SUSTAIN DAMAGE during combat: Produce 2 hits against your opponent's ships in the active system.",
      type: "action-card",
      place: enums_1.Place.space,
      onSustain: (u, participant, battle, effectName) => {
        const otherParticipant = (0, battle_1.getOtherParticipant)(battle, participant);
        if (otherParticipant) {
          otherParticipant.hitsToAssign.hits += 2;
          (0, battleEffects_1.registerUse)(effectName, participant);
          (0, util_log_1.logWrapper)(`${participant.side} sustained damage on ${u.type} and played Reflective Shielding.`);
        }
      },
      timesPerFight: 1
    };
    exports.scrambleFrequency = {
      name: "Scramble Frequency",
      description: "After another player makes a BOMBARDMENT, SPACE CANNON, or ANTI-FIGHTER BARRAGE roll: That player rerolls all of their dice.",
      type: "action-card",
      place: "both"
      // TODO another thing that would require "worse than average" detection
    };
    exports.solarFlare = {
      name: "Solar Flare",
      description: "After you activate a system: During this movement, other players cannot use SPACE CANNON against your ships.",
      type: "action-card",
      place: enums_1.Place.space,
      priority: battle_types_1.EFFECT_LOW_PRIORITY,
      transformEnemyUnit: (u) => {
        if (u.spaceCannon) {
          return Object.assign(Object.assign({}, u), { spaceCannon: void 0 });
        } else {
          return u;
        }
      }
    };
    exports.waylay = {
      name: "Waylay",
      description: "Before you roll dice for ANTI-FIGHTER BARRAGE: Hits from this roll are produced against all ships (not just fighters).",
      type: "action-card",
      place: enums_1.Place.space
      // TODO
    };
  }
});

// overlay/scripts/ti4calc2/core/battleeffect/agenda.js
var require_agenda = __commonJS({
  "overlay/scripts/ti4calc2/core/battleeffect/agenda.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.conventionsOfWar = exports.articlesOfWar = exports.prophecyOfIxth = exports.publicizeWeaponSchematics = void 0;
    exports.getAgendas = getAgendas;
    var battle_types_1 = require_battle_types();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    function getAgendas() {
      return [
        exports.publicizeWeaponSchematics,
        exports.prophecyOfIxth,
        // articlesOfWar,
        exports.conventionsOfWar
      ];
    }
    exports.publicizeWeaponSchematics = {
      name: "Publicize Weapon Schematics",
      description: "All war suns lose SUSTAIN DAMAGE.",
      type: "agenda",
      place: enums_1.Place.space,
      symmetrical: true,
      transformUnit: (u) => {
        if (u.type === unit_1.UnitType.warsun) {
          return Object.assign(Object.assign({}, u), { sustainDamage: false });
        } else {
          return u;
        }
      }
    };
    exports.prophecyOfIxth = {
      name: "Prophecy of Ixth",
      description: "The owner of this card applies +1 to the result of their fighter's combat rolls.",
      type: "agenda",
      place: enums_1.Place.space,
      transformUnit: (u) => {
        if (u.type === unit_1.UnitType.fighter) {
          return (0, unit_1.getUnitWithImproved)(u, "combat", "hit", "permanent");
        } else {
          return u;
        }
      }
    };
    exports.articlesOfWar = {
      name: "Articles of War",
      description: "All mechs lose their printed abilities except for SUSTAIN DAMAGE.",
      type: "agenda",
      place: "both",
      symmetrical: true
      // TODO
    };
    exports.conventionsOfWar = {
      name: "Conventions of War",
      description: "No BOMBARDMENT.",
      type: "agenda",
      place: enums_1.Place.ground,
      symmetrical: true,
      priority: battle_types_1.EFFECT_LOW_PRIORITY,
      transformUnit: (u) => {
        if (u.bombardment) {
          return Object.assign(Object.assign({}, u), { bombardment: void 0 });
        } else {
          return u;
        }
      }
    };
  }
});

// overlay/scripts/ti4calc2/core/battleeffect/relic.js
var require_relic = __commonJS({
  "overlay/scripts/ti4calc2/core/battleeffect/relic.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metaliVoidArmaments = exports.metaliVoidShielding = exports.lightrailOrdnance = void 0;
    exports.getRelics = getRelics;
    var times_1 = __importDefault(require_times());
    var util_log_1 = require_util_log();
    var battle_types_1 = require_battle_types();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    function getRelics() {
      return [exports.lightrailOrdnance, exports.metaliVoidShielding, exports.metaliVoidArmaments];
    }
    exports.lightrailOrdnance = {
      name: "Lightrail Ordnance",
      description: "Your space docks gain SPACE CANNON 5 (x2). You may use your space dock's SPACE CANNON against ships that are adjacent to their system.",
      type: "relic",
      place: "both",
      count: true,
      beforeStart: (p, battle, _op, effectName) => {
        var _a;
        let spacedockCount = 0;
        if (battle.place === enums_1.Place.ground) {
          spacedockCount = 1;
        } else {
          spacedockCount = (_a = p.effects[effectName]) !== null && _a !== void 0 ? _a : 0;
        }
        const modify = (instance) => {
          instance.spaceCannon = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 5, count: 2 });
        };
        (0, times_1.default)(spacedockCount, () => {
          const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.other, p, battle.place, modify);
          p.units.push(planetUnit);
        });
      }
    };
    exports.metaliVoidShielding = {
      name: "Metali Void Shielding",
      description: "Each time hits are produced against 1 of your non-fighter ships, 1 of those ships may use SUSTAIN DAMAGE as if it had that ability.",
      type: "relic",
      place: enums_1.Place.space,
      onCombatRoundEndBeforeAssign: (p, battle, _op) => {
        const bestShieldingTarget = (0, unitGet_1.getLowestWorthNonSustainUndamagedUnit)(p, battle.place, false);
        if (bestShieldingTarget && p.hitsToAssign.hits > 0) {
          bestShieldingTarget.useSustainDamagePriority = 500;
          bestShieldingTarget.sustainDamage = true;
          (0, util_log_1.logWrapper)(`${p.side} uses Metali Void Shielding to sustain ${bestShieldingTarget.type}!`);
        }
      },
      timesPerRound: 1
    };
    exports.metaliVoidArmaments = {
      name: "Metali Void Armaments",
      description: `During the "Anti Fighter Barrage" step of space combat, you may resolve ANTI-FIGHTER BARRAGE 6 (x3) against your opponent's units.`,
      type: "relic",
      place: enums_1.Place.space,
      onAfb: (p, battle) => {
        const modify = (instance) => {
          instance.afb = Object.assign(Object.assign({}, unit_1.defaultRoll), { hit: 6, count: 3 });
        };
        const planetUnit = (0, unit_1.createUnitAndApplyEffects)(unit_1.UnitType.nonunit, p, battle.place, modify);
        p.units.push(planetUnit);
      },
      priority: battle_types_1.EFFECT_HIGH_PRIORITY
    };
  }
});

// overlay/scripts/ti4calc2/core/battleeffect/tech.js
var require_tech = __commonJS({
  "overlay/scripts/ti4calc2/core/battleeffect/tech.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gravitonLaserSystem = exports.antimassDeflectors = exports.x89BacterialWeapon = exports.assaultCannon = exports.duraniumArmor = exports.magenDefenseGrid = exports.plasmaScoring = void 0;
    exports.getTechBattleEffects = getTechBattleEffects;
    var util_log_1 = require_util_log();
    var battle_1 = require_battle();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var unitGet_1 = require_unitGet();
    var battleEffects_1 = require_battleEffects();
    function getTechBattleEffects() {
      return [
        exports.plasmaScoring,
        exports.magenDefenseGrid,
        exports.duraniumArmor,
        exports.assaultCannon,
        exports.x89BacterialWeapon,
        exports.antimassDeflectors,
        exports.gravitonLaserSystem
      ];
    }
    exports.plasmaScoring = {
      name: "Plasma Scoring",
      description: "When 1 or more of your units use BOMBARDMENT or SPACE CANNON, 1 of those units may roll 1 additional die.",
      type: "tech",
      place: "both",
      beforeStart: (participant) => {
        const bestBomber = (0, unitGet_1.getHighestHitUnit)(participant, "bombardment", void 0);
        if (bestBomber === null || bestBomber === void 0 ? void 0 : bestBomber.bombardment) {
          bestBomber.bombardment.countBonus += 1;
        }
        const bestSpacecannon = (0, unitGet_1.getHighestHitUnit)(participant, "spaceCannon", void 0);
        if (bestSpacecannon === null || bestSpacecannon === void 0 ? void 0 : bestSpacecannon.spaceCannon) {
          bestSpacecannon.spaceCannon.countBonus += 1;
        }
      }
    };
    exports.magenDefenseGrid = {
      name: "Magen Defense Grid",
      description: "When any player activates a system that contains 1 or more of your structures, place 1 infantry from your reinforcements with each of those structures. At the start of ground combat on a planet that contains 1 or more of your structures, produce 1 hit and assign it to 1 of your opponent's ground forces.\nPLEASE NOTE: We dont place extra infantry, increase the count yourself. Checking this assumes you have at least one structure.",
      type: "tech",
      place: enums_1.Place.ground,
      side: "defender",
      onStart: (_participant, _battle, otherParticipant) => {
        otherParticipant.hitsToAssign.hitsAssignedByEnemy += 1;
      }
    };
    exports.duraniumArmor = {
      name: "Duranium Armor",
      description: "During each combat round, after you assign hits to your units, repair 1 of your damaged units that did not use SUSTAIN DAMAGE during this combat round.",
      type: "tech",
      place: "both",
      onRepair: (unit, participant, battle, effectName) => {
        if (unit.takenDamage && unit.takenDamageRound !== battle.roundNumber) {
          if (!unit.isGroundForce && battle.place === enums_1.Place.ground) {
            return;
          }
          if (!unit.isShip && battle.place === enums_1.Place.space) {
            return;
          }
          unit.takenDamage = false;
          (0, battleEffects_1.registerUse)(effectName, participant);
          (0, util_log_1.logWrapper)(`${participant.side} used duranium armor in round ${battle.roundNumber}`);
        }
      },
      timesPerRound: 1
    };
    exports.assaultCannon = {
      name: "Assault Cannon",
      description: "At the start of a space combat in a system that contains 3 or more of your non-fighter ships, your opponent must destroy 1 of their non-fighter ships.",
      type: "tech",
      place: enums_1.Place.space,
      onStart: (participant, battle, otherParticipant) => {
        if ((0, unitGet_1.getNonFighterShips)(participant).length >= 3) {
          const worstShip = (0, unitGet_1.getLowestWorthUnit)(otherParticipant, enums_1.Place.space, false);
          if (worstShip) {
            (0, battle_1.destroyUnit)(battle, worstShip);
            (0, util_log_1.logWrapper)(`Assault cannon destroyed ${worstShip.type}`);
          }
        }
      }
    };
    exports.x89BacterialWeapon = {
      name: "X-89 Bacterial Weapon",
      description: "Double the hits produced by your units' BOMBARDMENT and ground combat rolls. Exhaust each planet you use BOMBARDMENT against.",
      type: "tech",
      place: enums_1.Place.ground,
      onBombardmentHit: (_participant, _battle, _otherParticipant, hitInfo) => {
        if (hitInfo.hits > 0) {
          (0, util_log_1.logWrapper)(`X-89 Bacterial Weapon adds ${hitInfo.hits} hits to bombardment`);
          hitInfo.hits *= 2;
        }
      },
      onHit: (_participant, _battle, _otherParticipant, hitInfo) => {
        if (hitInfo.hits > 0) {
          (0, util_log_1.logWrapper)(`X-89 Bacterial Weapon adds ${hitInfo.hits} hits to ground combat hit.`);
          hitInfo.hits *= 2;
        }
      }
    };
    exports.antimassDeflectors = {
      name: "Antimass Deflectors",
      description: "When other players\u2019 units use SPACE CANNON against your units, apply -1 to the result of each die roll.",
      type: "tech",
      place: "both",
      transformEnemyUnit: (u) => {
        if (u.spaceCannon) {
          return (0, unit_1.getUnitWithImproved)(u, "spaceCannon", "hit", "permanent", -1);
        } else {
          return u;
        }
      }
    };
    exports.gravitonLaserSystem = {
      name: "Graviton Laser System",
      description: "You may exhaust this card before 1 or more of your units uses SPACE CANNON; hits produced by those units must be assigned to non-fighter ships if able.",
      type: "tech",
      place: enums_1.Place.space,
      transformUnit: (u) => {
        if (u.spaceCannon) {
          u.assignHitsToNonFighters = true;
          return u;
        } else {
          return u;
        }
      }
    };
  }
});

// overlay/scripts/ti4calc2/core/battleeffect/battleEffects.js
var require_battleEffects = __commonJS({
  "overlay/scripts/ti4calc2/core/battleeffect/battleEffects.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defendingInNebula = exports.entropicScar = void 0;
    exports.getAllBattleEffects = getAllBattleEffects;
    exports.getOtherBattleEffects = getOtherBattleEffects;
    exports.isBattleEffectRelevantForSome = isBattleEffectRelevantForSome;
    exports.isBattleEffectRelevant = isBattleEffectRelevant;
    exports.registerUse = registerUse;
    exports.canBattleEffectBeUsed = canBattleEffectBeUsed;
    var enums_1 = require_enums();
    var faction_1 = require_faction();
    var actioncard_1 = require_actioncard();
    var agenda_1 = require_agenda();
    var relic_1 = require_relic();
    var tech_1 = require_tech();
    exports.entropicScar = {
      name: "Entropic Scar",
      description: "All unit abilities (AFB, Bombardment, Space Cannon, Planetary Shield, Sustain Damage, Deploy) cannot be used by or against units inside of an entropic scar. Text abilities are unaffected.",
      type: "general",
      place: "both",
      symmetrical: true,
      transformUnit: (unit) => {
        return Object.assign(Object.assign({}, unit), { afb: void 0, bombardment: void 0, spaceCannon: void 0, sustainDamage: false, planetaryShield: false });
      }
    };
    exports.defendingInNebula = {
      name: "Defending in nebula",
      description: "If a space combat occurs in a nebula, the defender applies +1 to each combat roll of their ships during that combat.",
      type: "general",
      side: "defender",
      place: enums_1.Place.space,
      transformUnit: (unit) => {
        if (unit.combat) {
          return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hitBonus: unit.combat.hitBonus + 1 }) });
        } else {
          return unit;
        }
      }
    };
    function getAllBattleEffects() {
      const otherBattleEffects = getOtherBattleEffects();
      const techs = (0, tech_1.getTechBattleEffects)();
      const factionTechs = (0, faction_1.getFactionStuffNonUnit)();
      const promissary = (0, faction_1.getPromissary)();
      const agents = (0, faction_1.getAgent)();
      const commanders = (0, faction_1.getCommanders)();
      const general = (0, faction_1.getGeneralEffectFromFactions)();
      const actioncards = (0, actioncard_1.getActioncards)();
      const agendas = (0, agenda_1.getAgendas)();
      const relics = (0, relic_1.getRelics)();
      return [
        ...otherBattleEffects,
        ...techs,
        ...factionTechs,
        ...promissary,
        ...agents,
        ...commanders,
        ...general,
        ...actioncards,
        ...agendas,
        ...relics
      ];
    }
    function getOtherBattleEffects() {
      return [exports.defendingInNebula, exports.entropicScar];
    }
    function isBattleEffectRelevantForSome(effect, participant) {
      return participant.some((p) => isBattleEffectRelevant(effect, p));
    }
    function isBattleEffectRelevant(effect, participant) {
      if (effect.side !== void 0 && effect.side !== participant.side) {
        return false;
      }
      if (effect.type === "faction" || effect.type === "faction-ability") {
        if (participant.faction !== effect.faction) {
          return false;
        }
      }
      if (effect.type === "faction-tech") {
        if (participant.faction !== effect.faction && participant.faction !== enums_1.Faction.nekro) {
          return false;
        }
      }
      return true;
    }
    function registerUse(effectName, p) {
      var _a, _b;
      p.roundActionTracker[effectName] = ((_a = p.roundActionTracker[effectName]) !== null && _a !== void 0 ? _a : 0) + 1;
      p.fightActionTracker[effectName] = ((_b = p.fightActionTracker[effectName]) !== null && _b !== void 0 ? _b : 0) + 1;
    }
    function canBattleEffectBeUsed(effect, participant) {
      if (effect.timesPerFight !== void 0) {
        const timesUsedThisFight = participant.fightActionTracker[effect.name];
        if (timesUsedThisFight !== void 0 && timesUsedThisFight >= effect.timesPerFight) {
          return false;
        }
      }
      if (effect.timesPerRound !== void 0) {
        const timesUsedThisRound = participant.roundActionTracker[effect.name];
        if (timesUsedThisRound !== void 0 && timesUsedThisRound >= effect.timesPerRound) {
          return false;
        }
      }
      return true;
    }
  }
});

// overlay/scripts/ti4calc2/util/util-object.js
var require_util_object = __commonJS({
  "overlay/scripts/ti4calc2/util/util-object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.objectKeys = objectKeys;
    exports.objectEntries = objectEntries;
    function objectKeys(obj) {
      const entries = Object.keys(obj);
      return entries;
    }
    function objectEntries(obj) {
      const entries = Object.entries(obj);
      return entries;
    }
  }
});

// overlay/scripts/ti4calc2/util/query-params.js
var require_query_params = __commonJS({
  "overlay/scripts/ti4calc2/util/query-params.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createQueryParams = createQueryParams;
    exports.applyQueryParams = applyQueryParams;
    exports.hasSomeQueryParams = hasSomeQueryParams;
    exports.hasQueryParamForFaction = hasQueryParamForFaction;
    var battle_types_1 = require_battle_types();
    var battleEffects_1 = require_battleEffects();
    var enums_1 = require_enums();
    var unit_1 = require_unit();
    var util_object_1 = require_util_object();
    var allBattleEffects = (0, battleEffects_1.getAllBattleEffects)();
    function createQueryParams(attacker, defender, place) {
      const params = new URLSearchParams();
      addParticipant(params, attacker, "attacker");
      addParticipant(params, defender, "defender");
      if (place !== enums_1.Place.space) {
        params.set("place", place);
      }
      if (hasUnits(attacker) || hasUnits(defender)) {
        const paramsNonEmpty = params.toString().length > 0;
        window.history.replaceState({}, "", `${location.pathname}${paramsNonEmpty ? "?" : ""}${params}`);
      } else {
        window.history.replaceState({}, "", location.pathname);
      }
    }
    function addParticipant(params, p, side) {
      params.set(side + "-faction", p.faction);
      for (const unit of (0, util_object_1.objectEntries)(p.units)) {
        if (unit[1] > 0) {
          params.set(`${side}-unit-${unit[0]}`, `${unit[1]}`);
        }
      }
      for (const unit of (0, util_object_1.objectEntries)(p.damagedUnits)) {
        const ownedUnits = p.units[unit[0]];
        const actualNumber = Math.min(unit[1], ownedUnits);
        if (actualNumber) {
          params.set(`${side}-damaged-${unit[0]}`, `${actualNumber}`);
        }
      }
      if (!p.riskDirectHit) {
        params.set(`${side}-risk-direct-hit`, "false");
      }
      for (const unitUpgrades of (0, util_object_1.objectEntries)(p.unitUpgrades)) {
        if (unitUpgrades[1]) {
          params.set(`${side}-upgrade-${unitUpgrades[0]}`, "true");
        }
      }
      for (const battleEffects of (0, util_object_1.objectEntries)(p.battleEffects)) {
        if (battleEffects[1] > 0) {
          const symmetrical = allBattleEffects.some((e) => e.name === battleEffects[0] && !!e.symmetrical);
          if (symmetrical) {
            params.set(`effect-${battleEffects[0]}`, `${battleEffects[1]}`);
          } else {
            params.set(`${side}-effect-${battleEffects[0]}`, `${battleEffects[1]}`);
          }
        }
      }
    }
    function applyQueryParams(participant, query) {
      (0, util_object_1.objectEntries)(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          console.warn(`value of ${key} was unexpected array: ${JSON.stringify(value)}`);
          return;
        }
        const factionMatch = key.match(/(attacker|defender)-faction/);
        if (factionMatch) {
          const side = factionMatch[1];
          if (!(0, battle_types_1.isSide)(side)) {
            console.warn(`failed to identify Side: ${side}`);
            return;
          }
          const faction = value;
          if (!Object.values(enums_1.Faction).includes(faction)) {
            console.warn(`Unknown faction found: ${faction}`);
            return;
          } else if (side === participant.side) {
            participant.faction = faction;
          }
        }
        const unitMatch = key.match(/(attacker|defender)-unit-(.*)/);
        if (unitMatch) {
          const side = unitMatch[1];
          const unit = unitMatch[2];
          if (!(0, battle_types_1.isSide)(side)) {
            console.warn(`failed to identify Side: ${side}`);
            return;
          }
          if (!Object.values(unit_1.UnitType).includes(unit)) {
            console.warn(`Unknown unit found: ${unit}`);
            return;
          }
          const num = parseInt(value);
          if (isNaN(num)) {
            console.warn(`Unit number was not number for ${unit}: ${value}`);
            return;
          } else if (side === participant.side) {
            participant.units[unit] = num;
          }
        }
        const unitDamagedMatch = key.match(/(attacker|defender)-damaged-(.*)/);
        if (unitDamagedMatch) {
          const side = unitDamagedMatch[1];
          const unit = unitDamagedMatch[2];
          if (!(0, battle_types_1.isSide)(side)) {
            console.warn(`failed to identify Side: ${side}`);
            return;
          }
          if (!Object.values(unit_1.UnitType).includes(unit)) {
            console.warn(`Unknown unit found: ${unit}`);
            return;
          }
          const num = parseInt(value);
          if (isNaN(num)) {
            console.warn(`Unit damaged number was not number for ${unit}: ${value}`);
            return;
          } else if (side === participant.side) {
            participant.damagedUnits[unit] = num;
          }
        }
        const riskDirectHitMatch = key.match(/(attacker|defender)-risk-direct-hit/);
        if (riskDirectHitMatch) {
          const side = riskDirectHitMatch[1];
          if (!(0, battle_types_1.isSide)(side)) {
            console.warn(`failed to identify Side: ${side}`);
            return;
          }
          const bool = value === "true";
          if (side === participant.side) {
            participant.riskDirectHit = bool;
          }
        }
        const upgradeMatch = key.match(/(attacker|defender)-upgrade-(.*)/);
        if (upgradeMatch) {
          const side = upgradeMatch[1];
          const unit = upgradeMatch[2];
          if (!(0, battle_types_1.isSide)(side)) {
            console.warn(`failed to identify Side: ${side}`);
            return;
          }
          if (!Object.values(unit_1.UnitType).includes(unit)) {
            console.warn(`Unknown unit upgrade found: ${unit}`);
            return;
          }
          const bool = value === "true";
          if (side === participant.side) {
            participant.unitUpgrades[unit] = bool;
          }
        }
        const effectMatch = key.match(/(attacker|defender|)-?effect-(.*)/);
        if (effectMatch) {
          const side = effectMatch[1];
          const effect = effectMatch[2];
          if (!effect) {
            console.warn(`failed to identify effect from ${key}`);
            return;
          }
          if (!(0, battle_types_1.isSide)(side) && side !== "") {
            console.warn(`failed to identify Side: ${side}`);
            return;
          }
          const num = parseInt(value);
          if (isNaN(num)) {
            console.warn(`Effect number was not number for ${effect}: ${value}`);
            return;
          } else if (side === participant.side || side === "") {
            participant.battleEffects[effect] = num;
          }
        }
      });
    }
    function hasUnits(p) {
      return Object.values(p.units).some((val) => val > 0);
    }
    function hasSomeQueryParams(query) {
      return Object.entries(query).length > 0;
    }
    function hasQueryParamForFaction(query, side) {
      return Object.keys(query).some((key) => key === `${side}-faction`);
    }
  }
});

// overlay/scripts/ti4calc2/core/battleeffect/unitUpgrades.js
var require_unitUpgrades = __commonJS({
  "overlay/scripts/ti4calc2/core/battleeffect/unitUpgrades.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAllUnitUpgrades = void 0;
    exports.getUnitUpgrade = getUnitUpgrade;
    var faction_1 = require_faction();
    var unit_1 = require_unit();
    var destroyer = {
      name: "destroyer upgrade",
      type: "unit-upgrade",
      place: "both",
      unit: unit_1.UnitType.destroyer,
      transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.destroyer) {
          return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 8 }), afb: Object.assign(Object.assign({}, unit.afb), { hit: 6, count: 3 }) });
        } else {
          return unit;
        }
      }
    };
    var cruiser = {
      name: "cruiser upgrade",
      type: "unit-upgrade",
      place: "both",
      unit: unit_1.UnitType.cruiser,
      transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.cruiser) {
          return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 6 }) });
        } else {
          return unit;
        }
      }
    };
    var carrier = {
      name: "carrier upgrade",
      type: "unit-upgrade",
      place: "both",
      unit: unit_1.UnitType.carrier,
      transformUnit: (unit) => {
        return unit;
      }
    };
    var dreadnought = {
      name: "dreadnought upgrade",
      type: "unit-upgrade",
      place: "both",
      unit: unit_1.UnitType.dreadnought,
      transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.dreadnought) {
          return Object.assign(Object.assign({}, unit), { immuneToDirectHit: true });
        } else {
          return unit;
        }
      }
    };
    var fighter = {
      name: "fighter upgrade",
      type: "unit-upgrade",
      place: "both",
      unit: unit_1.UnitType.fighter,
      transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.fighter) {
          return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 8 }) });
        } else {
          return unit;
        }
      }
    };
    var infantry = {
      name: "infantry upgrade",
      type: "unit-upgrade",
      place: "both",
      unit: unit_1.UnitType.infantry,
      transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.infantry) {
          return Object.assign(Object.assign({}, unit), { combat: Object.assign(Object.assign({}, unit.combat), { hit: 7 }) });
        } else {
          return unit;
        }
      }
    };
    var pds = {
      name: "pds upgrade",
      type: "unit-upgrade",
      place: "both",
      unit: unit_1.UnitType.pds,
      transformUnit: (unit) => {
        if (unit.type === unit_1.UnitType.pds) {
          return Object.assign(Object.assign({}, unit), { spaceCannon: Object.assign(Object.assign({}, unit.spaceCannon), { hit: 5 }) });
        } else {
          return unit;
        }
      }
    };
    var getAllUnitUpgrades = () => [
      destroyer,
      cruiser,
      carrier,
      dreadnought,
      fighter,
      infantry,
      pds
    ];
    exports.getAllUnitUpgrades = getAllUnitUpgrades;
    function getUnitUpgrade(faction, unitType) {
      const factionTechs = (0, faction_1.getFactionBattleEffects)(faction).filter((effect) => effect.type === "faction-tech");
      const factionTech = factionTechs.find((tech) => tech.unit === unitType);
      if (factionTech) {
        return factionTech;
      } else {
        return (0, exports.getAllUnitUpgrades)().find((unitUpgrade) => unitUpgrade.unit === unitType);
      }
    }
  }
});

// overlay/scripts/ti4calc2/core/battleSetup.js
var require_battleSetup = __commonJS({
  "overlay/scripts/ti4calc2/core/battleSetup.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUnitMap = void 0;
    exports.setupBattle = setupBattle2;
    exports.startBattle = startBattle;
    exports.createParticipant = createParticipant;
    var cloneDeep_1 = __importDefault(require_cloneDeep());
    var times_1 = __importDefault(require_times());
    var query_params_1 = require_query_params();
    var util_object_1 = require_util_object();
    var battle_1 = require_battle();
    var battle_types_1 = require_battle_types();
    var battleEffects_1 = require_battleEffects();
    var unitUpgrades_1 = require_unitUpgrades();
    var enums_1 = require_enums();
    var faction_1 = require_faction();
    var unit_1 = require_unit();
    function setupBattle2(battle) {
      battle = (0, cloneDeep_1.default)(battle);
      return createBattleInstance(battle);
    }
    function startBattle(battle) {
      return (0, battle_1.doBattle)(battle);
    }
    function createBattleInstance(battle) {
      const attackerBattleEffects = getParticipantBattleEffects(battle.attacker, battle.place);
      const attacker = createParticipantInstance(battle.attacker, attackerBattleEffects, "attacker", battle.place);
      const defenderBattleEffects = getParticipantBattleEffects(battle.defender, battle.place);
      const defender = createParticipantInstance(battle.defender, defenderBattleEffects, "defender", battle.place);
      addOtherParticipantsBattleEffects(attacker, defenderBattleEffects, battle.place);
      addOtherParticipantsBattleEffects(defender, attackerBattleEffects, battle.place);
      fixUnitBattleEffects(battle.attacker, attacker, defender, battle.place);
      fixUnitBattleEffects(battle.defender, defender, attacker, battle.place);
      damageUnits(attacker, battle.attacker.damagedUnits);
      damageUnits(defender, battle.defender.damagedUnits);
      return {
        place: battle.place,
        attacker,
        defender,
        roundNumber: 1
      };
    }
    function getParticipantUnits(participant) {
      const units = (0, util_object_1.objectEntries)(participant.units).map(([unitType, number]) => {
        return (0, times_1.default)(number, () => {
          return (0, unit_1.createUnit)(unitType);
        });
      }).flat();
      return units;
    }
    function getParticipantBattleEffects(participant, place) {
      const allBattleEffects = (0, battleEffects_1.getAllBattleEffects)();
      const battleEffects = [];
      for (const effectName in participant.battleEffects) {
        const battleEffectCount = participant.battleEffects[effectName];
        if (battleEffectCount === void 0 || battleEffectCount === 0) {
          continue;
        }
        const effect = allBattleEffects.find((e) => e.name === effectName);
        if (effect.faction === void 0 || effect.faction === participant.faction || participant.faction === enums_1.Faction.nekro) {
          battleEffects.push(effect);
        }
      }
      const factionAbilities = (0, faction_1.getFactionBattleEffects)(participant).filter((effect) => effect.type === "faction");
      battleEffects.push(...factionAbilities);
      (0, util_object_1.objectEntries)(participant.unitUpgrades).forEach(([unitType, upgraded]) => {
        if (upgraded) {
          const unitUpgrade = (0, unitUpgrades_1.getUnitUpgrade)(participant.faction, unitType);
          if (unitUpgrade) {
            battleEffects.push(unitUpgrade);
          }
        }
      });
      return battleEffects.filter((effect) => {
        return effect.place === "both" || effect.place === place;
      });
    }
    function createParticipantInstance(participant, battleEffects, side, place) {
      const units = getParticipantUnits(participant);
      const participantInstance = {
        side,
        faction: participant.faction,
        units,
        unitUpgrades: participant.unitUpgrades,
        newUnits: [],
        allUnitTransform: [],
        beforeStartEffect: [],
        onStartEffect: [],
        onSustainEffect: [],
        onEnemySustainEffect: [],
        onRepairEffect: [],
        onCombatRoundEnd: [],
        onCombatRoundEndBeforeAssign: [],
        afterAfbEffect: [],
        onDeath: [],
        onHit: [],
        onBombardmentHit: [],
        onSpaceCannon: [],
        onBombardment: [],
        onAfb: [],
        onCombatRound: [],
        effects: {},
        riskDirectHit: participant.riskDirectHit,
        soakHits: 0,
        hitsToAssign: {
          hits: 0,
          hitsToNonFighters: 0,
          hitsAssignedByEnemy: 0
        },
        afbHitsToAssign: {
          fighterHitsToAssign: 0,
          rollInfoList: []
        },
        roundActionTracker: {},
        fightActionTracker: {}
      };
      applyBattleEffects(participant, participantInstance, battleEffects, place);
      return participantInstance;
    }
    function fixUnitBattleEffects(participant, participantInstance, other, place) {
      const participantUnitBattleEffects = participantInstance.units.filter((u) => !!u.battleEffects).map((u) => u.battleEffects).flat();
      applyBattleEffects(participant, participantInstance, participantUnitBattleEffects, place);
      addOtherParticipantsBattleEffects(other, participantUnitBattleEffects, place);
    }
    function addOtherParticipantsBattleEffects(participantInstance, battleEffects, place) {
      battleEffects.forEach((battleEffect) => {
        if (battleEffect.transformEnemyUnit) {
          participantInstance.allUnitTransform.push(battleEffect.transformEnemyUnit);
          participantInstance.units = participantInstance.units.map((u) => {
            return battleEffect.transformEnemyUnit(u, participantInstance, place, battleEffect.name);
          });
        }
      });
    }
    function applyBattleEffects(participant, participantInstance, battleEffects, place) {
      battleEffects.sort((a, b) => {
        var _a, _b;
        const prioDiff = ((_a = b.priority) !== null && _a !== void 0 ? _a : battle_types_1.EFFECT_DEFAULT_PRIORITY) - ((_b = a.priority) !== null && _b !== void 0 ? _b : battle_types_1.EFFECT_DEFAULT_PRIORITY);
        if (prioDiff === 0) {
          return a.type === "faction" ? -1 : 1;
        }
        return prioDiff;
      }).forEach((battleEffect) => {
        if (battleEffect.beforeStart) {
          participantInstance.beforeStartEffect.push(battleEffect);
        }
        if (battleEffect.onStart) {
          participantInstance.onStartEffect.push(battleEffect);
        }
        if (battleEffect.onSustain) {
          participantInstance.onSustainEffect.push(battleEffect);
        }
        if (battleEffect.onEnemySustain) {
          participantInstance.onEnemySustainEffect.push(battleEffect);
        }
        if (battleEffect.onRepair) {
          participantInstance.onRepairEffect.push(battleEffect);
        }
        if (battleEffect.onCombatRoundEnd) {
          participantInstance.onCombatRoundEnd.push(battleEffect);
        }
        if (battleEffect.onCombatRoundEndBeforeAssign) {
          participantInstance.onCombatRoundEndBeforeAssign.push(battleEffect);
        }
        if (battleEffect.afterAfb) {
          participantInstance.afterAfbEffect.push(battleEffect);
        }
        if (battleEffect.onDeath) {
          participantInstance.onDeath.push(battleEffect);
        }
        if (battleEffect.onSpaceCannon) {
          participantInstance.onSpaceCannon.push(battleEffect);
        }
        if (battleEffect.onBombardment) {
          participantInstance.onBombardment.push(battleEffect);
        }
        if (battleEffect.onAfb) {
          participantInstance.onAfb.push(battleEffect);
        }
        if (battleEffect.onCombatRound) {
          participantInstance.onCombatRound.push(battleEffect);
        }
        if (battleEffect.onHit) {
          participantInstance.onHit.push(battleEffect);
        }
        if (battleEffect.onBombardmentHit) {
          participantInstance.onBombardmentHit.push(battleEffect);
        }
        if (battleEffect.transformUnit) {
          participantInstance.allUnitTransform.push(battleEffect.transformUnit);
          participantInstance.units = participantInstance.units.map((u) => battleEffect.transformUnit(u, participantInstance, place, battleEffect.name));
        }
        const effectNumber = participant.battleEffects[battleEffect.name];
        if (effectNumber !== void 0) {
          participantInstance.effects[battleEffect.name] = effectNumber;
        }
      });
    }
    function createParticipant(side, faction, query) {
      const participant = {
        faction: faction !== null && faction !== void 0 ? faction : enums_1.Faction.barony_of_letnev,
        side,
        units: (0, exports.getUnitMap)(),
        unitUpgrades: {},
        damagedUnits: {},
        battleEffects: {},
        riskDirectHit: true
      };
      if (query) {
        (0, query_params_1.applyQueryParams)(participant, query);
      }
      return participant;
    }
    var getUnitMap = (units) => {
      const unitMap = Object.assign({ flagship: 0, warsun: 0, dreadnought: 0, carrier: 0, cruiser: 0, destroyer: 0, fighter: 0, mech: 0, infantry: 0, pds: 0, other: 0, nonunit: 0 }, units);
      return unitMap;
    };
    exports.getUnitMap = getUnitMap;
    function damageUnits(participant, damagedUnits) {
      (0, util_object_1.objectEntries)(damagedUnits).forEach(([unitType, n]) => {
        (0, times_1.default)(n, () => {
          const unit = participant.units.find((u) => {
            return u.type === unitType && u.sustainDamage && !u.takenDamage;
          });
          if (unit) {
            unit.takenDamage = true;
            unit.takenDamageRound = 0;
          }
        });
      });
    }
  }
});

// overlay/scripts/refresh-calc.js
var { Faction } = require_enums();
var { Place } = require_enums();
var { UnitType } = require_unit();
var { setupBattle } = require_battleSetup();
var { doBattle } = require_battle();
var Calc = class _Calc {
  static getInstance() {
    if (!_Calc.__instance) {
      _Calc.__instance = new _Calc();
    }
    return _Calc.__instance;
  }
  constructor() {
    let elementId = "calc";
    this._div = document.getElementById(elementId);
    if (!this._div) {
      throw new Error(`Missing element id "${elementId}"`);
    }
    elementId = "calc-map";
    const mapCanvas = document.getElementById(elementId);
    if (!mapCanvas) {
      throw new Error(`Missing element id "${elementId}"`);
    }
    const w = Math.floor(mapCanvas.parentNode.offsetWidth * 1.45);
    this._mapUtil = new MapUtil(mapCanvas, w);
    this._tileToRegionToSimulation = {};
    new BroadcastChannel("onGameDataEvent").onmessage = (event) => {
      if (event.data.type === "UPDATE" || event.data.type === "NOT_MODIFIED") {
        this.update(event.data.detail);
      }
    };
  }
  update(gameData) {
    console.assert(typeof gameData === "object");
    let regionNameTDs = document.getElementsByClassName("calc-region");
    regionNameTDs = [...regionNameTDs];
    regionNameTDs.forEach((td) => td.innerText = "-");
    let regionResultTDs = document.getElementsByClassName("calc-result");
    regionResultTDs = [...regionResultTDs];
    const regionResultEntries = regionResultTDs.map((td) => {
      const attackerDiv = td.getElementsByClassName("calc-attacker")[0];
      const attackerValue = td.getElementsByClassName("value-attacker")[0];
      const defenderDiv = td.getElementsByClassName("calc-defender")[0];
      const defenderValue = td.getElementsByClassName("value-defender")[0];
      td.style.backgroundColor = "unset";
      attackerDiv.style.backgroundColor = "unset";
      attackerDiv.style.width = "0px";
      attackerValue.innerText = "";
      defenderDiv.style.backgroundColor = "unset";
      defenderDiv.style.width = "0px";
      defenderValue.innerText = "";
      return {
        td,
        w: td.offsetWidth - 4,
        attackerDiv,
        attackerValue,
        defenderDiv,
        defenderValue
      };
    });
    const colorNameToPlayerData = {};
    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    for (const playerData of playerDataArray) {
      const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
      colorNameToPlayerData[colorName] = playerData;
    }
    const activePlayerColorName = GameDataUtil.parseCurrentTurnColorName(gameData);
    const activePlayerData = colorNameToPlayerData[activePlayerColorName];
    const activeSystem = GameDataUtil.parseActiveSystem(gameData);
    if (!activeSystem) {
      return;
    }
    const hexSummary = GameDataUtil.parseHexSummary(gameData);
    let tileHexSummary = hexSummary.filter((entry) => {
      return entry.tile === activeSystem.tile;
    })[0];
    if (!tileHexSummary) {
      tileHexSummary = { tile: 0, regions: [] };
    }
    const { tileWidth, tileHeight, canvasWidth, canvasHeight } = this._mapUtil.getSizes();
    const x = Math.floor((canvasWidth - tileWidth) / 2);
    const y = -Math.floor((canvasHeight - tileHeight) / 2);
    this._mapUtil.clear();
    this._mapUtil.drawTile(x, y, tileHexSummary);
    tileHexSummary.regions.forEach((region, regionIndex) => {
      this._mapUtil.drawOccupants(x, y, tileHexSummary, regionIndex);
    });
    if (!activePlayerData || tileHexSummary.tile <= 0) {
      return;
    }
    for (let regionIndex = 0; regionIndex < 4; regionIndex++) {
      const region = tileHexSummary.regions[regionIndex] || {};
      const regionName = regionIndex === 0 ? "SPACE" : activeSystem.planets[regionIndex - 1] || "-";
      if (regionIndex > activeSystem.planets.length) {
        break;
      }
      const newParticipant = () => ({
        faction: Faction.barony_of_letnev,
        units: {},
        unitUpgrades: {},
        battleEffects: {},
        damagedUnits: {}
      });
      const battle = {
        place: regionIndex === 0 ? Place.space : Place.ground,
        attacker: newParticipant(),
        defender: newParticipant()
      };
      const peerColorName = this._getPeerColor(region, activePlayerColorName);
      const peerPlayerData = colorNameToPlayerData[peerColorName];
      this._fillCalcFaction(battle.attacker, activePlayerData);
      this._fillCalcFleet(battle.attacker, region, activePlayerColorName);
      this._fillCalcUnitUpgrades(battle.attacker, activePlayerData);
      this._fillCalcModifiers(battle.attacker, gameData, activePlayerData);
      if (peerPlayerData) {
        this._fillCalcFaction(battle.defender, peerPlayerData);
        this._fillCalcFleet(battle.defender, region, peerColorName);
        this._fillCalcUnitUpgrades(battle.defender, peerPlayerData);
        this._fillCalcModifiers(battle.defender, gameData, peerPlayerData);
      }
      let regionToSimulation = this._tileToRegionToSimulation[tileHexSummary.tile];
      if (!regionToSimulation) {
        regionToSimulation = {};
        this._tileToRegionToSimulation[tileHexSummary.tile] = regionToSimulation;
      }
      let simulation = regionToSimulation[regionIndex];
      if (!simulation) {
        simulation = {};
        regionToSimulation[regionIndex] = simulation;
      }
      const allKeys = /* @__PURE__ */ new Set();
      JSON.stringify(battle, (key, value) => (allKeys.add(key), value));
      const simulationKey = JSON.stringify(battle, Array.from(allKeys).sort());
      if (simulation.key !== simulationKey) {
        simulation.key = simulationKey;
        const start = Date.now();
        simulation.attacker = 0;
        simulation.defender = 0;
        simulation.draw = 0;
        const numSimulations = 2e3;
        for (let i = 0; i < numSimulations; i++) {
          const battleInstance = setupBattle(battle);
          const battleResult = doBattle(battleInstance);
          if (battleResult.winner === "attacker") {
            simulation.attacker += 1;
          } else if (battleResult.winner === "defender") {
            simulation.defender += 1;
          } else {
            simulation.draw += 1;
          }
        }
        simulation.attacker = Math.round(
          simulation.attacker * 1e3 / numSimulations / 10
        );
        simulation.defender = Math.round(
          simulation.defender * 1e3 / numSimulations / 10
        );
        simulation.draw = 100 - (simulation.attacker + simulation.defender);
        simulation.msecs = Date.now() - start;
        if (!peerColorName || !battle.defender.units || Object.entries(battle.defender.units).length === 0) {
          simulation.attacker = 100;
          simulation.defender = 0;
          simulation.draw = 0;
        }
      }
      regionNameTDs[regionIndex].innerText = regionName.toUpperCase();
      const { td, w, attackerDiv, attackerValue, defenderDiv, defenderValue } = regionResultEntries[regionIndex];
      td.style.backgroundColor = "#aaa";
      attackerDiv.style.backgroundColor = GameDataUtil.colorNameToHex(
        activePlayerColorName
      );
      attackerDiv.style.width = `${Math.floor(
        w * simulation.attacker / 100
      )}px`;
      attackerValue.innerText = `${simulation.attacker}%`;
      defenderDiv.style.backgroundColor = peerColorName ? GameDataUtil.colorNameToHex(peerColorName) : "black";
      defenderDiv.style.width = `${Math.floor(
        w * simulation.defender / 100
      )}px`;
      defenderValue.innerText = `${simulation.defender}%`;
    }
  }
  _getPeerColor(region, activePlayerColorName) {
    for (const [unitColorName, unitNameToCount] of Object.entries(
      region.colorToUnitNameToCount || {}
    )) {
      if (unitColorName !== activePlayerColorName) {
        return unitColorName;
      }
    }
  }
  _fillCalcFaction(participant, playerData) {
    const factionToCalc = {
      arborec: Faction.arborec,
      creuss: Faction.creuss,
      hacan: Faction.hacan,
      jolnar: Faction.jol_nar,
      l1z1x: Faction.l1z1x,
      letnev: Faction.barony_of_letnev,
      mentak: Faction.mentak,
      muaat: Faction.muaat,
      naalu: Faction.naalu,
      saar: Faction.clan_of_saar,
      norr: Faction.sardakk_norr,
      sol: Faction.sol,
      nekro: Faction.nekro,
      winnu: Faction.winnu,
      xxcha: Faction.xxcha,
      yin: Faction.yin,
      yssaril: Faction.yssaril,
      // pok
      argent: Faction.argent_flight,
      vuilraith: Faction.vuil_raith,
      empyrean: Faction.empyrean,
      mahact: Faction.mahact,
      naazrokha: Faction.naaz_rokha,
      nomad: Faction.nomad,
      ul: Faction.titans_of_ul,
      // codex 3
      keleres: Faction.keleres,
      // thunders edge
      //bastion: Faction.bastion,
      deepwrought: Faction.deepwrought,
      //firmament: Faction.firmament,
      //obsidian: Faction.obsidian,
      //ralnel: Faction.ralnel,
      rebellion: Faction.crimson_rebellion
    };
    const faction = GameDataUtil.parsePlayerFaction(playerData);
    const calcFaction = factionToCalc[faction];
    if (!calcFaction) {
      console.log(`Calc._fillCalcFaction: unknown "${faction}"`);
      participant.faction = Faction.arborec;
      return false;
    }
    participant.faction = calcFaction;
    return true;
  }
  _fillCalcFleet(participant, region, colorName) {
    if (!participant.units) {
      participant.units = {};
    }
    const unitToCalc = {
      flagship: UnitType.Flagship,
      war_sun: UnitType.WarSun,
      dreadnought: UnitType.Dreadnought,
      carrier: UnitType.Carrier,
      cruiser: UnitType.Cruiser,
      destroyer: UnitType.Destroyer,
      fighter: UnitType.Fighter,
      pds: UnitType.PDS,
      mech: UnitType.Mech,
      infantry: UnitType.Infantry,
      space_dock: "SpaceDock"
      // not official, but add for knowing a unit is there
    };
    for (const [unitColorName, unitNameToCount] of Object.entries(
      region.colorToUnitNameToCount || {}
    )) {
      if (unitColorName !== colorName) {
        continue;
      }
      for (const [unitName, count] of Object.entries(unitNameToCount)) {
        const calcName = unitToCalc[unitName];
        if (!calcName) {
          continue;
        }
        participant.units[calcName] = { count };
      }
    }
  }
  _fillCalcUnitUpgrades(participant, playerData) {
    if (!participant.unitUpgrades) {
      participant.unitUpgrades = {};
    }
    const unitUpgrades = GameDataUtil.parsePlayerUnitUpgrades(playerData);
    const unitToCalc = {
      flagship: UnitType.Flagship,
      war_sun: UnitType.WarSun,
      dreadnought: UnitType.Dreadnought,
      carrier: UnitType.Carrier,
      cruiser: UnitType.Cruiser,
      destroyer: UnitType.Destroyer,
      fighter: UnitType.Fighter,
      pds: UnitType.PDS,
      mech: UnitType.Mech,
      infantry: UnitType.Infantry
    };
    for (const unitName of unitUpgrades) {
      const calcName = unitToCalc[unitName];
      if (!calcName) {
        continue;
      }
      participant.unitUpgrades[calcName] = true;
    }
  }
  _fillCalcModifiers(participant, gameData, playerData) {
    if (!participant.battleEffects) {
      participant.battleEffects = {};
    }
    const modifierToCalc = {
      antimass_deflectors: "antimassDeflectors",
      plasma_scoring: "plasmaScoring"
    };
    const modifiers = GameDataUtil.parsePlayerUnitModifiers(playerData);
    for (const modifier of modifiers) {
      const calc = modifierToCalc[modifier.localeName];
      if (calc) {
        participant.battleEffects[calc] = 1;
      }
    }
    const techToCalc = {
      "Antimass Deflectors": "antimassDeflectors",
      "Assault Cannon": "assaultCannon",
      "Duranium Armor": "duraniumArmor",
      "Graviton Laser System": "gravitonLaser",
      "Plasma Scoring": "plasmaScoring",
      "X-89 Bacterial Weapon": "x89Omega",
      // game data does not track omega for tech, assume omega
      "Non-Euclidean Shielding": "nonEuclidean",
      "L4 Disruptors": "l4Disruptors",
      "Valkyrie Particle Weave": "valkyrieParticleWeave"
    };
    const technologies = GameDataUtil.parsePlayerTechnologies(playerData);
    for (const tech of technologies) {
      const calc = techToCalc[tech.name];
      if (calc) {
        participant.battleEffects[calc] = 1;
      }
    }
    const agendaToCalc = {
      "Articles of War": "articlesOfWar",
      "Prophecy of Ixth": "prophecyOfIxth",
      "Publicize Weapon Schematics": "publicizeSchematics"
    };
    const mustOwn = ["Prophecy of Ixth"];
    const colorName = GameDataUtil.parsePlayerColor(playerData).colorName;
    const agendaNamesAndPlayerColorNames = GameDataUtil.parseLaws(gameData);
    for (const [name, colorNames] of Object.entries(
      agendaNamesAndPlayerColorNames
    )) {
      const calc = agendaToCalc[name];
      if (calc) {
        if (mustOwn.includes(name) && !colorNames.includes(colorName)) {
          continue;
        }
        participant.battleEffects[calc] = 1;
      }
    }
  }
};
window.addEventListener("load", () => {
  Calc.getInstance().update({});
  setTimeout(() => {
    Calc.getInstance().update({});
  }, 500);
});
