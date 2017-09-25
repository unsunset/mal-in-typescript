import { MalVal } from './types'

export class Env {
  data: Map<string, MalVal>; 
  outer: Env;
  constructor(outer: Env) {
    this.data = new Map<string, MalVal>();
    this.outer = outer;
    // let length = binds.length;
    // for (let i = 0; i < length; i++) {
    //   let bind = binds[i];
    //   let expr = exprs[i];
    //   this.set(bind, expr);
    // }
  }

  set(key: string, value: MalVal) {
    this.data.set(key, value);
  }

  find(key: string): MalVal {
    let value = this.data.get(key);
    if (value == null) {
      if (this.outer != null) {
        return this.outer.find(key);
      }
    }
    return value;
  }

  get(key: string): MalVal {
    console.log("get " + key + " from env.");
    let value = this.find(key);
    console.log("get " + key + " is " + value);
    if (value == null) {
      throw new Error("not found");
    }
    return value;
  }

  toString(): string {
    return JSON.stringify(this.data);
  }
}