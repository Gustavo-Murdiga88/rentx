import { appSchema } from "@nozbe/watermelondb";
import { userScheme } from "./UserScheme";
import { carsSchema } from "./carsSchema";

const schema = appSchema({
  version: 2,
  tables: [userScheme, carsSchema],
});

export { schema };
