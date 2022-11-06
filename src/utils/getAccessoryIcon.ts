import Acceleration from "../assets/acceleration.svg";
import Force from "../assets/force.svg";
import Gasoline from "../assets/gasoline.svg";
import Energy from "../assets/energy.svg";
import Exchange from "../assets/exchange.svg";
import Hybrid from "../assets/hybrid.svg";
import People from "../assets/people.svg";
import Speed from "../assets/speed.svg";
import Car from "../assets/car.svg";

export function getAccessoryIcon(type: string) {
  switch (type) {
    case "acceleration":
      return Acceleration;
    case "turning_diameter":
      return Force;
    case "electric_motor":
      return Energy;
    case "gasoline_motor":
      return Gasoline;
    case "exchange":
      return Exchange;
    case "acceleration":
      return Acceleration;
    case "seats":
      return People;
    case "speed":
      return Speed;
    case "hybrid_motor": 
    return Hybrid;
    default:
      return Car;
  }
}
