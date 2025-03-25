import { AGV } from './AGV';
import { AMR } from './AMR';
import { FORK } from './FORK';

export enum Robots {
  AGV = 'AGV',
  AMR = 'AMR',
  FORK = 'FORK_LIFT',
}

export enum BoxSizes {
  SM = 'small',
  MD = 'medium',
  LG = 'large',
  XL = 'extra-large',
}

export type RobotConfig = {
  moveCost: number;
  pickCost: number;
  quickChargeRate?: number;
  fullChargeRate: number;
  batteryCapacity: number;
  ratedFor: BoxSizes[];
};

export type LiftableRobotConfig = RobotConfig & {
  liftCost: number;
};

export interface BaseRobotActions {
  move: () => void;
  pickPackage: (size: BoxSizes) => void;
  quickCharge: () => void;
  fullCharge: () => void;
  reportStatus: () => void;
  getCounts: () => void;
  getRobotType: () => Robots;
}

export interface LiftableRobotActions {
  lift: () => void;
}

export interface WarehouseActions<T> {
  registerRobot: (r: T) => void;
  statusCheck: () => void;
  randomizeActivity: () => void;
}

export type ValidRobots = AGV | AMR | FORK;
