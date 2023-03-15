export default function createRandomNumberForOTP() {
  return Math.floor(Math.random() * 89999) + 10000;
}
export default function createRandomNumberForPassword(){
  return Math.floor(Math.random() * 89999) + 10000;
}