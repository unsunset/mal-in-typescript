export abstract class MalVal {
  abstract toString(): string;
}

export class MalBool extends MalVal {
  bool: boolean;
  constructor(bool: boolean) {
    super();
    this.bool = bool;
  }
  toString() {
    if (this.bool) {
      return "true";
    }
    return "false";
  }
}

export class MalNumber extends MalVal {
  num: number;
  constructor(num: number) {
    super();
    this.num = num;
  }
  toString() {
    return this.num + "";
  }
}

export class MalList extends MalVal {
  holds: Array<MalVal>;
  constructor(holds: Array<MalVal>) {
    super();
    this.holds = holds;
  }

  toString() {
    let str = "(";
    this.holds.forEach((hold) => {
      str = str +  hold.toString() + " ";
    })
    str = str.trim();
    str += ")";
    return str;
  }
}

export class MalSymbol extends MalVal {
  symbolName: string;
  constructor(symbol: string) {
    super();
    this.symbolName = symbol;
  }

  toString() {
    return this.symbolName;
  }
}

export class MalFunc extends MalVal {
  func: Function; 
  constructor(func: Function) {
    super();
    this.func = func;
  }

  toString() {
    return "#" + this.func.toString();
  }
}