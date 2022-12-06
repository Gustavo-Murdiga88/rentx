import { tableSchema } from "@nozbe/watermelondb";

export const carsSchema = tableSchema({
  name: "cars",
  columns: [
    { name: "id_car", type: "string" },
    { name: "name", type: "string" },
    { name: "brand", type: "string" },
    { name: "about", type: "string" },
    { name: "price", type: "number",  },
    { name: "fuel_type", type: "string" },
    { name: "thumbnail", type: "string" },
  ],
});
