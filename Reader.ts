import { MalVal, MalNumber, MalList, MalSymbol } from './types';

export class Reader {
  position: number;
  tokens: Array<string>;

  constructor(tokens: Array<string>) {
    this.tokens = tokens;
    this.position = 0;
  }

  next(): string {
    this.position++;
    if (this.position >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.position];
  }

  peek(): string {
    if (this.position >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.position];
  }

  static read_str(input: string): MalVal {
    let tokens = Reader.tokenizer(input);
    console.log("tokens is " + tokens);
    tokens = tokens.map((token) => {
      return token.trim();
    }).filter((token) => {
      return token != '';
    });
    const reader = new Reader(tokens);
    const result = reader.read_form();
    return result;
  }

  static tokenizer(input: string): Array<string> {
    const reg = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
    return input.match(reg);
  }

  read_form(): MalVal {
    const token = this.peek();
    switch (token) {
      case "(":
        return this.read_list(); 
      default:
        return this.read_atom();  
    }
  }

  read_atom(): MalVal {
    let next = this.peek();
    if (this.isNumber(next)) {
      return new MalNumber(parseInt(next));
    }  
    return new MalSymbol(next);
  }

  isNumber(input: string): boolean {
    return !isNaN(input as any );
  }

  read_list(): MalList {
    let arr = new Array<MalVal>();
    let next = this.next();
    while(next != null ) {
      if (next == ")") {
        return new MalList(arr);
      } else {
        arr.push(this.read_form());
      }
      next = this.next();
    }
  }
}