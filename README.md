# dematic-assessment

## Outline

- **For Assessment One,** I built a parent class `BaseRobot` that accepts `BaseConfig` for values such as movement,
  package pick cost, and quick charge rate. `BaseRobot` also implements some shared Robot actions all other subclasses
  should have access to.
- Subclasses “AGV, AMR, and FORK” inherit `BaseRobot` and define their `RobotType.<TYPE>` from an enum I’ve defined in
  the `types.ts` file, with other type and interface declarations.
  - If a Subclass has additional requirements or restrictions, they’re free to `override` the parent `BaseRobot` method,
    which is what I’ve done in `AGV.ts` and `AMR.ts`
- For additional functionality, as is the case of `FORK.ts` for a lifting operation, the `FORK` subclass will inherit
  the `BaseRobot` class, then implement a separate `LiftableRobotActions` interface with a `lift()` operation exposed.
- The `RobotFactory` is a static class that simply instantiates any of the defined Robot subclasses.
- The `Warehouse` class defines the number of packages in-warehouse, as well as a list of registered robots, which can
  be appended to via the `registerRobot(...)` public member.
  - The `randomizeActivity` function was sort of a question-mark for me. I decided that I should just create a fixed
    list of actions that correspond to the actions I know these robots can perform, but for the sake of time, I didn’t
    think too hard about how I can make this logic more generic/extensible.
- **For Assessment Two**, the `src/assessement_two` subdirectory houses each function. They’re self explanatory. I
  commented in the outputs I received locally when running each test case.
- **For each Assessment**, I wrote a suite of tests in the `__tests__` directory at the root of the project.

## To install dependencies:

```bash
bun install
```

or

```bash
yarn
```

To run:

```bash
bun start
```

or

```bash
yarn start
```

To test

```bash
bun run test
```

or

```bash
yarn test
```

This project was created using `bun init` in bun v1.1.27. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
