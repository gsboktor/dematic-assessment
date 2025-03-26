import { BaseRobot } from './BaseRobot';
import { BoxSizes, RobotConfig, Robots } from './types';

export class AMR extends BaseRobot<RobotConfig> {
  constructor() {
    super(Robots.AMR, {
      moveCost: 2,
      pickCost: 1,
      fullChargeRate: 10,
      quickChargeRate: 4,
      batteryCapacity: 10,
      ratedFor: [BoxSizes.LG, BoxSizes.MD, BoxSizes.SM],
    });
  }
}
