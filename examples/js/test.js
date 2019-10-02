const { duckIt } = require("../../lib");

const exec = async () => {
  const result = await duckIt('bart simpsons');
  console.log('res', result);
};

exec();