import { BaseRobot, DEFAULT_CONFIG } from './BaseRobot';
import { RobotConfig, Robots } from './types';

export class AGV extends BaseRobot<RobotConfig> {
  constructor() {
    super(Robots.AGV, {
      ...DEFAULT_CONFIG,
      quickChargeRate: undefined,
      moveCost: 6,
    });
  }

  override quickCharge(): void {
    console.warn(`Robot: ${this.robotType} not configured for quick charging\n`);
    return;
  }
}
