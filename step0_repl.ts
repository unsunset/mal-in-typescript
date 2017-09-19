#!usr/bin/env node
import { ReadLine, createInterface } from 'readline';

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

read();
function read() {
  readLine.question('user> ', (answer) => {
    const result = rep(answer);
    PRINT(result);
    read();
  })
}

readLine.on('SIGINT', () => {
  console.log('Over');
  readLine.close();
});

function READ(input: string): string {
  return input;
}

function EVAL(input: string): string {
  return input;
}

function PRINT(input: string): string {
  console.log(input);
  return input;
}

function rep(input: string) {
  return EVAL(READ(input));
}

function read_str(input: string) {
  const tokens = tokenizer(input);
  const reader = new Reader(tokens);
  
}

function tokenizer(input: string): Array<string> {
  return null;
}