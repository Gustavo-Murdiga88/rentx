import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class cars extends Model{
  static table = "cars";

  @field("id_car")
  id_car!: string;

  @field("name")
  name!: string;

  @field("brand")
  brand!: string;

  @field("about")
  about!: string;

  @field("price")
  price!: number;

  @field("fuel_type")
  fuel_type!: string;

  @field("thumbnail")
  thumbnail!: string;
}

export { cars } 