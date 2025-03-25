import { BaseRobot } from './BaseRobot';
import { BoxSizes, LiftableRobotActions, LiftableRobotConfig, Robots } from './types';

export class FORK extends BaseRobot<LiftableRobotConfig> implements LiftableRobotActions {
  constructor() {
    super(Robots.FORK, {
      moveCost: 2,
      pickCost: 1,
      fullChargeRate: 10,
      quickChargeRate: 4,
      batteryCapacity: 10,
      liftCost: 6,
      ratedFor: [BoxSizes.LG, BoxSizes.MD, BoxSizes.SM, BoxSizes.XL],
    });
  }

  public lift() {
    const requiredCharge = this.battery - this.baseRobotConfig.liftCost;
    if (requiredCharge < 0) {
      console.error('Please recharge battery');
      this.battery = this.baseRobotConfig.batteryCapacity;

      throw new Error('Battery is too low');
    }
    this.currentActivity = 'LIFT';
    this.battery = requiredCharge;
    this.reportStatus();
  }
}
