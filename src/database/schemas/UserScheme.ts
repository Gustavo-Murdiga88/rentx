import { tableSchema } from "@nozbe/watermelondb";

const userScheme = tableSchema({
  name: "users",
  columns: [
    {
      name: "id_user",
      type: "string",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "driver_license",
      type: "string",
    },
    {
      name: "avatar",
      type: "string",
    },
    {
      name: "token",
      type: "string",
    },
  ],
});

export {userScheme};
