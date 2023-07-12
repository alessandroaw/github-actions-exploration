import Redis from "ioredis";

const main = async () => {
  console.log("hello world");
  try {
    const redisClient = new Redis(process.env.REDIS_URL);

    await redisClient.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

    // ioredis supports the node.js callback style
    const data = await redisClient.get("mykey");

    console.log(data);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
