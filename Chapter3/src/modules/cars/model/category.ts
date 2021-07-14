import { v4 as uuid_v4 } from "uuid";

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid_v4();
    }
  }
}

export { Category };
