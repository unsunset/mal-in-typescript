import { MalVal } from './types';

export function pr_str(v: MalVal): string {
  console.log(v);
  return v.toString();
}