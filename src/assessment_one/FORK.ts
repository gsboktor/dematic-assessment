import { BaseRobot, DEFAULT_CONFIG } from './BaseRobot';
import { LiftableRobotActions, LiftableRobotConfig, Robots } from './types';

export class FORK extends BaseRobot<LiftableRobotConfig> implements LiftableRobotActions {
  constructor() {
    super(Robots.FORK, {
      ...DEFAULT_CONFIG,
      liftCost: 6,
    });
  }

  public lift() {
    const requiredCharge = this.battery - this.baseRobotConfig.liftCost;
    if (requiredCharge < 0) {
      console.warn(`\n${this.robotType}: Please Recharge Battery`);
      this.fullCharge();

      throw new Error('Battery is too low');
    }
    this.currentActivity = 'LIFT';
    this.battery = requiredCharge;
    this.reportStatus();
  }
}
