export type status = "todo" | "done";

export interface Todo {
  id: number;
  label: string;
  status: status;
  startDate: string;
  limitDate: string;
}

export type Todos = Todo[];
