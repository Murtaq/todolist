import { BaseModel } from '../base.model';

export interface TodoItem extends BaseModel {
  todoText: string;
  isChecked: boolean;
}
