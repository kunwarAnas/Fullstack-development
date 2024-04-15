const mongoose = require("mongoose");
const redis = require("redis");

const client = redis.createClient();
client.connect().then();

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

// This is how monkey patch/trick a library
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  // to make a new object not copy
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      Collection: this.mongooseCollection.name,
    })
  ); // make JSON since redis accept json/string only

  //  Nested cache structure =   {
  //     '1234-userID':{
  //         'query-CollectionName':'Data'
  //     },
  //     '12356-userID':{
  //         'query-CollectionName':'Data'
  //     }
  //   }

  const cachedValue = await client.hGet(this.hashKey, key);
  if (cachedValue) {
    console.log("Serving from cache");
    const doc = JSON.parse(cachedValue);
    if (Array.isArray(doc)) {
      return doc.map((d) => new this.model(d));
    }

    return new this.model(doc);
  }
  console.log("Serving from DB");
  const result = await exec.apply(this, arguments);
  client.hSet(this.hashKey, key, JSON.stringify(result), "EX", 10);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey))
  },
};
