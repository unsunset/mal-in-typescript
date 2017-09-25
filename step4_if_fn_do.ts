import { MalSymbol, MalList } from './types';
import { ReadLine, createInterface } from 'readline';
import { Reader } from './Reader';
import { MalVal } from './types';
import { pr_str } from './printer';
import { Env } from './env';

let operations = new Array<string>();
let position = 0;

let repl_env = new Env(null);

repl_env.set("+", (a, b) => {
  return Number(a) + Number(b);
})

repl_env.set("-", (a, b) => {
  return Number(a) - Number(b);
})

repl_env.set("*", (a, b) => {
  return Number(a) * Number(b);
})

repl_env.set("/", (a, b) => {
  return Number(a) / Number(b);
})

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

function READ(input: string): MalVal {
  let v = Reader.read_str(input);
  return v;
}

function EVAL(input: MalVal, env): MalVal {
  if (input instanceof MalList) {
    if (input.holds == null || input.holds.length == 0) {
      return input;
    } else {
      let ast = input.holds;
      let first = ast[0] as MalSymbol;
      let name = first.symbolName;
      if (name == "def!") {
        let key = ast[1] as MalSymbol;
        let value = EVAL(ast[2], env);
        env.set(key.symbolName, value);
        return value;
      } else if (name == "let*") {
        let inner = new Env(env);
        let list = ast[1] as MalList;
        let length = list.holds.length;
        for (let i = 0; i < length; i = i + 2) {
          let odd = list.holds[i] as MalSymbol;
          let even = list.holds[i + 1];
          inner.set(odd.symbolName, EVAL(even, inner));
        }
        return EVAL(ast[2], inner);
      } else if (name == "do") {
        
      } else if (name == "if") {
        
      } else {
        let holds = input.holds;
        if (holds[0] instanceof MalList) {
          let fn = holds[0] as MalList;
          let symbol = fn.holds[0] as MalSymbol;
          if (symbol.symbolName == "fn*") {
            let formalParams = fn.holds[1] as MalList;
            let inner = new Env(env);
            for (let i = 0; i < formalParams.holds.length; i++) {
              inner.set(formalParams.holds[i].toString(), holds[i + 1]);
            }
            return EVAL(fn.holds[2], inner);
          }
        } else if((holds[0] as MalSymbol).symbolName == "fn*" ){
          return new MalSymbol("#function");
        }
        let list = eval_ast(input, env) as Array<any>;
        let first = list[0];
        let result = first(...list.slice(1));
        return result
      }
    }
  } else {
    return eval_ast(input, env);
  }
}

function PRINT(input: MalVal): string {
  let str = pr_str(input);
  console.log(str);
  return str;
}

function rep(input: string) {
  // return EVAL(READ(input));
  let v = READ(input);
  let e = EVAL(v, repl_env);
  return e;
}

function eval_ast(ast: MalVal, env: Env) {
  if (ast instanceof MalSymbol) {
    return env.get(ast.symbolName);
  } else if (ast instanceof MalList) {
    return ast.holds.map((hold) => {
      return EVAL(hold, env);
    })
  } else {
    return ast;
  }
} 