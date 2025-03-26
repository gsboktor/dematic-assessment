import { BaseRobotActions, BoxSizes, RobotConfig, Robots } from './types';

export class BaseRobot<TConfig extends RobotConfig> implements BaseRobotActions {
  private static robotInstances: Map<Robots, number> = new Map<Robots, number>();

  protected battery: number;
  protected currentActivity: string = 'IDLE';

  constructor(
    protected readonly robotType: Robots,
    protected readonly baseRobotConfig = {
      moveCost: 3,
      pickCost: 1,
      quickChargeRate: 5,
      fullChargeRate: 10,
      batteryCapacity: 10,
      ratedFor: [BoxSizes.LG, BoxSizes.MD, BoxSizes.SM, BoxSizes.XL],
    } as TConfig,
  ) {
    this.battery = this.baseRobotConfig.batteryCapacity;

    if (!BaseRobot.robotInstances.has(robotType)) {
      BaseRobot.robotInstances.set(robotType, 1);
      return;
    }

    const currCount = BaseRobot.robotInstances.get(robotType);
    BaseRobot.robotInstances.set(robotType, (currCount ?? 0) + 1);
  }

  private static getTypeCounts(t: Robots): number | undefined {
    return BaseRobot.robotInstances.get(t);
  }

  public getRobotType() {
    return this.robotType;
  }

  public move() {
    const requiredCharge = this.battery - this.baseRobotConfig.moveCost;
    if (requiredCharge < 0) {
      console.warn('Please recharge battery');
      return;
    }
    this.currentActivity = 'MOVE';
    this.battery = requiredCharge;
    this.reportStatus();
  }

  public pickPackage(size: BoxSizes) {
    const requiredCharge = this.battery - this.baseRobotConfig.pickCost;
    if (requiredCharge < 0) {
      console.warn('Please recharge battery');
      return;
    }
    this.currentActivity = `PICKING_PACKAGE (${size})`;
    this.battery = requiredCharge;

    this.reportStatus();
  }

  public quickCharge() {
    const newCharge = this.battery + (this.baseRobotConfig.quickChargeRate ?? 0);

    this.battery = newCharge > this.baseRobotConfig.batteryCapacity ? this.baseRobotConfig.batteryCapacity : newCharge;

    this.currentActivity = 'QUICK_CHARGING';
    this.reportStatus();
  }

  public fullCharge() {
    this.battery = this.baseRobotConfig.batteryCapacity;
    this.currentActivity = 'FULL_CHARGING';
    this.reportStatus();
  }

  public reportStatus() {
    console.log(
      `STATUS OF ${this.robotType}:\n\nBattery Percentage: ${this.battery}\nCurrent Activity: ${this.currentActivity}\n\n`,
    );
  }

  public getCounts() {
    console.log(`Number of robots for ${this.robotType}\n\n${BaseRobot.getTypeCounts(this.robotType)}\n\n`);
  }
}
