import { RobotFactory } from './assessment_one/RobotFactory';
import { BoxSizes } from './assessment_one/types';
import { Warehouse } from './assessment_one/Warehouse';
import { FrequencyMap } from './assessment_two/FrequencyMap';
import { LetterSwitching } from './assessment_two/LetterSwitching';

function AssessmentOneDriver() {
  const w = new Warehouse(
    [RobotFactory.createAGV()],
    [BoxSizes.LG, BoxSizes.MD, BoxSizes.XL, BoxSizes.MD, BoxSizes.SM],
  );

  w.registerRobot(RobotFactory.createAMR());
  w.registerRobot(RobotFactory.createForkLift());

  w.randomizeActivity();
  w.randomizeActivity();
  w.randomizeActivity();

  w.statusCheck();
}

function AssessmentTwoDriver() {
  console.log(LetterSwitching('Errors in strategy cannot be correct through tactical maneuvers'));
  //Outputs: "viilih rm hgizgvtb xzmmlg yv xliivxg gsilfts gzxgrxzo nzmvfevih"

  console.log(FrequencyMap('Hellothere! Apple!'));
  //Outputs:
  //   {
  //     a: 1,
  //     b: 0,
  //     c: 0,
  //     d: 0,
  //     e: 4,
  //     f: 0,
  //     g: 0,
  //     h: 2,
  //     i: 0,
  //     j: 0,
  //     k: 0,
  //     l: 3,
  //     m: 0,
  //     n: 0,
  //     o: 1,
  //     p: 2,
  //     q: 0,
  //     r: 1,
  //     s: 0,
  //     t: 1,
  //     u: 0,
  //     v: 0,
  //     w: 0,
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   }
}

AssessmentOneDriver();
AssessmentTwoDriver();
