import { AGV } from './AGV';
import { AMR } from './AMR';
import { FORK } from './FORK';

export class RobotFactory {
  static createAGV(): AGV {
    return new AGV();
  }

  static createAMR(): AMR {
    return new AMR();
  }

  static createForkLift(): FORK {
    return new FORK();
  }
}
