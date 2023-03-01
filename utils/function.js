export default function createRandomNumberForOTP() {
  return Math.floor(Math.random() * 89999) + 10000;
}
