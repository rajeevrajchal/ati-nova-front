import { SYSTEM } from "./system.model";

export interface FEATURE {
  id: string;
  name: string;
  status: string;
  key: string;
  description: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  system: Pick<SYSTEM, "id" | "name">;
}
