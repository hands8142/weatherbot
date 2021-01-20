import speedNameData from "./data/speed_name.json";

export const parser = (speed: number): string => {
  let num;
  if (speed >= 0 && speed <= 2) {
    num = 1;
  } else if (speed >= 3 && speed <= 15) {
    num = 2;
  } else if (speed >= 16 && speed <= 33) {
    num = 3;
  } else if (speed >= 34 && speed <= 54) {
    num = 4;
  } else if (speed >= 55 && speed <= 79) {
    num = 5;
  } else if (speed >= 80 && speed <= 107) {
    num = 6;
  } else if (speed >= 108 && speed <= 138) {
    num = 7;
  } else if (speed >= 139 && speed <= 171) {
    num = 8;
  } else if (speed >= 172 && speed <= 207) {
    num = 9;
  } else if (speed >= 208 && speed <= 244) {
    num = 10;
  } else if (speed >= 245 && speed <= 284) {
    num = 11;
  } else if (speed >= 285 && speed <= 326) {
    num = 12;
  } else if (speed >= 327) {
    num = 13;
  } else {
    num = null;
  }

  console.log("✅ 스피드 이름 파싱 완료");

  return num ? (<any>speedNameData)[num] || null : null;
};
