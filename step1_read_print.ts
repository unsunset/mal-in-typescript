#!usr/bin/env node
import { ReadLine, createInterface } from 'readline';
import { Reader } from './Reader';
import { MalVal } from './types';
import { pr_str } from './printer';

let operations = new Array<string>();
let position = 0;

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

read();
function read() {
  readLine.question('user> ', (answer) => {
    operations.push(answer);
    position = operations.length - 1;
    const result = rep(answer);
    PRINT(result);
    read();
  })
}

function getNextOperation(): string {
  let length = operations.length;
  if(position >= -1 && position + 1 < length - 1) {
    position++;
    return operations[position];
  }
  return null;
}

function getLastOperation(): string {
  let length = operations.length;
  if(position >= 1 && position < length) {
    position--;
    return operations[position];
  }
  return null;
}

readLine.on('SIGINT', () => {
  console.log('Over');
  readLine.close();
});

function READ(input: string): MalVal {
  let v = Reader.read_str(input);
  return v;
}

function EVAL(input: MalVal): MalVal {
  return input;
}

function PRINT(input: MalVal): string {
  let str = pr_str(input);
  console.log(str);
  return str;
}

function rep(input: string) {
  // return EVAL(READ(input));
  let v = READ(input);
  let e = EVAL(v);
  return e;
}