import { BaseRobot } from './BaseRobot';
import { BoxSizes, RobotConfig, Robots } from './types';

export class AGV extends BaseRobot<RobotConfig> {
  constructor() {
    super(Robots.AGV, {
      moveCost: 6,
      pickCost: 1,
      fullChargeRate: 10,
      batteryCapacity: 10,
      ratedFor: [BoxSizes.LG, BoxSizes.MD, BoxSizes.SM, BoxSizes.XL],
    });
  }

  override quickCharge(): void {
    console.warn(`Robot: ${this.robotType} not configured for quick charging\n`);
    return;
  }
}
