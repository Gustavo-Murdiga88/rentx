import { Database } from "@nozbe/watermelondb";
import SQLAdaptor from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "./schemas/index";
import { users } from "./models/users";
import { cars } from "./models/cars";

const adapter = new SQLAdaptor({
  schema,
  dbName: "rent",
});

const database = new Database({
  adapter: adapter,
  modelClasses: [users, cars],
});

export { database };
