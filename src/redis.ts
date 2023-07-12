import Redis from "ioredis";

console.log("hello world");
export const redisClient = new Redis(process.env.REDIS_URL);

redisClient.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// ioredis supports the node.js callback style
redisClient.get("mykey", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Prints "value"
  }
});
