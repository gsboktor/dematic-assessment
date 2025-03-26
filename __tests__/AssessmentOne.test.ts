import { AGV } from '../src/assessment_one/AGV';
import { AMR } from '../src/assessment_one/AMR';
import { FORK } from '../src/assessment_one/FORK';
import { RobotFactory } from '../src/assessment_one/RobotFactory';
import { BoxSizes } from '../src/assessment_one/types';
import { Warehouse } from '../src/assessment_one/Warehouse';

describe('RobotFactory', () => {
  describe('createAGV', () => {
    it('should create an AGV instance with correct configuration', () => {
      const agv = RobotFactory.createAGV();
      expect(agv).toBeInstanceOf(AGV);
      expect(agv['baseRobotConfig'].moveCost).toBe(6);
      expect(agv['baseRobotConfig'].batteryCapacity).toBe(10);
    });
  });

  describe('createAMR', () => {
    it('should create an AMR instance with correct configuration', () => {
      const amr = RobotFactory.createAMR();
      expect(amr).toBeInstanceOf(AMR);
      expect(amr['baseRobotConfig'].moveCost).toBe(2);
      expect(amr['baseRobotConfig'].quickChargeRate).toBe(4);
    });
  });

  describe('createForkLift', () => {
    it('should create a FORK instance with correct configuration', () => {
      const fork = RobotFactory.createForkLift();
      expect(fork).toBeInstanceOf(FORK);
      expect(fork['baseRobotConfig'].moveCost).toBe(3);
      expect(fork['baseRobotConfig'].liftCost).toBe(6);
    });
  });

  describe('Robot Specific Behaviors', () => {
    it('should handle robot-specific package size restrictions', () => {
      const amr = RobotFactory.createAMR();
      const agv = RobotFactory.createAGV();

      // AMR should not handle XL packages
      amr.pickPackage(BoxSizes.XL);
      expect(amr['currentActivity']).toBe('IDLE');

      // AGV should handle XL package sizes
      agv.pickPackage(BoxSizes.XL);
      expect(agv['currentActivity']).toBe(`PICKING_PACKAGE (${BoxSizes.XL})`);
    });
  });
});

describe('Warehouse', () => {
  let warehouse: Warehouse<any>;
  const testPackages: BoxSizes[] = [BoxSizes.SM, BoxSizes.MD, BoxSizes.LG, BoxSizes.XL];

  beforeEach(() => {
    warehouse = new Warehouse([], testPackages);
  });

  describe('Robot Registration', () => {
    it('should register and track multiple robot types', () => {
      const agv = RobotFactory.createAGV();
      const amr = RobotFactory.createAMR();
      const fork = RobotFactory.createForkLift();

      warehouse.registerRobot(agv);
      warehouse.registerRobot(amr);
      warehouse.registerRobot(fork);

      expect(warehouse['registeredRobots']).toHaveLength(3);
      expect(warehouse['registeredRobots']).toContain(agv);
      expect(warehouse['registeredRobots']).toContain(amr);
      expect(warehouse['registeredRobots']).toContain(fork);
    });
  });

  describe('Package Processing', () => {
    it('should process packages', () => {
      const agv = RobotFactory.createAGV();
      warehouse.registerRobot(agv);

      const initialPackageCount = warehouse['packages'].length;
      warehouse.randomizeActivity();
      const finalPackageCount = warehouse['packages'].length;

      expect(finalPackageCount).toBeLessThanOrEqual(initialPackageCount);
    });
  });

  describe('Status Reporting', () => {
    it('should report status of all registered robots', () => {
      const agv = RobotFactory.createAGV();
      const amr = RobotFactory.createAMR();
      warehouse.registerRobot(agv);
      warehouse.registerRobot(amr);

      const consoleSpy = jest.spyOn(console, 'log');
      warehouse.statusCheck();

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('STATUS OF AGV'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('STATUS OF AMR'));

      consoleSpy.mockRestore();
    });
  });
});
