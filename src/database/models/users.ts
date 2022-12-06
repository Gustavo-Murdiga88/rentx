import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class users extends Model {
  static table = 'users'
  
  @field("id_user")
  id_user!: string;

  @field("name")
  name!: string;

  @field("email")
  email!: string;

  @field("driver_license")
  driver_license!: string;

  @field("avatar")
  avatar!: string;

  @field("token")
  token!: string;
}

export { users };
