import { FORK } from './FORK';
import { BoxSizes, ValidRobots, WarehouseActions } from './types';

export const ValidActivities = ['PICK', 'QUICK_CHARGE', 'FULL_CHARGE', 'MOVE', 'LIFT'];

export class Warehouse<TValidRobots extends ValidRobots> implements WarehouseActions<TValidRobots> {
  private activity_iteration: number = 0;
  constructor(private readonly registeredRobots: TValidRobots[], private packages: BoxSizes[]) {}

  public registerRobot(r: TValidRobots) {
    this.registeredRobots.push(r);
  }

  public randomizeActivity() {
    console.log(
      `Randomized Activity, round #${++this
        .activity_iteration}\n====================================================================\n`,
    );

    this.registeredRobots.forEach((r) => {
      const random_activity = ValidActivities[Math.floor(Math.random() * ValidActivities.length)];

      switch (random_activity) {
        case 'PICK': {
          if (this.packages.length === 0) {
            console.log('All packages have been processed');
            break;
          }

          const packageIdx = Math.floor(Math.random() * this.packages.length);
          const p = this.packages[packageIdx];

          this.packages.splice(packageIdx, 1);

          r.pickPackage(p);
          break;
        }
        case 'MOVE': {
          r.move();
          break;
        }
        case 'LIFT': {
          if (r instanceof FORK) {
            try {
              r.lift();
            } catch (e) {
              console.log('Fork Lift encountered error: ', (e as Error).message);
            }
          }
          console.log(`This Robot ${r.getRobotType()} is not configured to LIFT`);
          break;
        }
        case 'QUICK_CHARGE': {
          r.quickCharge();
          break;
        }
        case 'FULL_CHARGE': {
          r.fullCharge();
          break;
        }
        default: {
          console.log("Shouldn't get here");
        }
      }
    });

    console.log(`====================================================================\n`);
  }

  public statusCheck() {
    console.log('WAREHOUSE STATUS CHECK\n\n');
    this.registeredRobots.forEach((r) => {
      r.reportStatus();
    });
  }
}
