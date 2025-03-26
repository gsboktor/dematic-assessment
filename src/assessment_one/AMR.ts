import { BaseRobot, DEFAULT_CONFIG } from './BaseRobot';
import { BoxSizes, RobotConfig, Robots } from './types';

export class AMR extends BaseRobot<RobotConfig> {
  constructor() {
    super(Robots.AMR, {
      ...DEFAULT_CONFIG,
      moveCost: 2,
      quickChargeRate: 4,
      ratedFor: [BoxSizes.LG, BoxSizes.MD, BoxSizes.SM],
    });
  }
}
