# Reference: Testing Framework

This document provides a reference for the testing framework used in this repository. It covers the main classes, functions, and assertions that can be used to write and execute tests for JavaScript projects.

## Classes and Functions

### `Test(testClass)`

The `Test` class runs the tests contained within the provided `testClass`. It looks for methods prefixed with `test_` and executes them.

#### Parameters:
- `testClass`: An instance of the class that contains your test methods.

#### Methods:
- **`run()`**: Runs all test methods in `testClass`. Handles setup (`before`) and teardown (`after`) methods before and after each test.

#### Example:

```javascript
const testObject = new MyTest();
new Test(testObject).run();
```

### `before()` and `after()` Methods

- **`before()`**: Runs before each test to set up any required state.
- **`after()`**: Runs after each test to clean up.

These methods are optional but useful for managing test setup and teardown.

## Assertions

Assertions are used to verify that the code behaves as expected. If an assertion fails, the test fails.

### `Assert.isTrue(value)`

- Ensures that `value` is `true`.
- Throws an error if `value` is not `true`.

#### Example:

```javascript
Assert.isTrue(1 < 2);  // Passes
Assert.isTrue(false);  // Fails
```

### `Assert.equals(expected, actual)`

- Checks strict equality (`===`) between `expected` and `actual`.
- Throws an error if the values are not equal.

#### Example:

```javascript
Assert.equals(5, 5);  // Passes
Assert.equals(5, '5');  // Fails
```

### `Assert.deepEquals(array1, array2)`

- Verifies that two arrays, including nested arrays, are equal.
- Throws an error if the arrays are not equal.

#### Example:

```javascript
const array1 = [1, [2, 3], 4];
const array2 = [1, [2, 3], 4];
Assert.deepEquals(array1, array2);  // Passes
```

## Test Method Naming

- All test methods must be prefixed with `test_` to be recognized by the `Test` runner.
- Use descriptive names to indicate what the test is verifying (e.g., `test_userAuthentication`).

#### Example:

```javascript
class UserTest {
    test_userAuthentication() {
        // Code to test user authentication
    }
}
```

## Logger Output

- The framework uses `Logger.log` to print test execution details.
- Logs include which test is being run, whether it passes or fails, and any error messages.

#### Example Output:

```
Running test: userAuthentication
Test passed: userAuthentication
1 tests passed
0 tests failed
```

## Summary

- Use the `Test` class to run your test methods.
- Include optional `before` and `after` methods for setup and teardown.
- Utilize the `Assert` object to verify expected outcomes.
- Prefix test methods with `test_` for the framework to recognize them.

This reference should help you effectively use the testing framework to create and run tests for your JavaScript code.

