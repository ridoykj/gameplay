export interface Cheat {
  effect: string;
  cheatCode: string;
}

export interface CheatCategory {
  header: string;
  data: Cheat[];
}

export interface ResponseData {
  message: string;
  isError: boolean;
}