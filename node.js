function isNumber(n) {
  let arr = [];
  for (let i = 0; i < n.length; i++) {
    let num = Number(n[i]);

    if (Number.isNaN(num)) {
      console.error("Error: Invalid input");
    }
    arr.push(num);
  }
  return arr;
}
function mean(nums) {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }
  return total / nums.length;
}

function median(nums) {
  const mid = Math.floor((nums.length - 1) / 2) || 0;
  const median = nums[mid];
  return median;
}

function mode(nums) {
  let mf = {};
  let m = 0;
  let mode;

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    mf[num] = (mf[num] || 0) + 1;

    if (mf[num] > m) {
      m = mf[num];
      mode = num;
    }
  }
  return mode;
}

module.exports = {
  mean: mean,
  median: median,
  mode: mode,
  isNumber: isNumber,
};
