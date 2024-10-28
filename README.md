# Testing Framework

## Overview

This repository contains a simple yet functional testing framework designed for JavaScript. It provides an easy-to-use interface for defining and running unit tests, featuring hooks for test setup (`before`) and teardown (`after`) as well as a series of assertion methods to validate your test results. This can be particularly helpful when building quick tests for Google Apps Script projects.

- [Tutorial](Tutorial.md)
- [Reference](Reference.md)
- [Discussion](Discussion.md)

## How It Works

- The `Test` class is used to execute test cases from a given test class.
- Any method in your test class that starts with `test_` will be treated as a test case.
- The `before` and `after` methods, if defined, are called before and after each test respectively.
- Test results include a summary of passed and failed tests, along with error messages.

### Main Components

- **Test Runner** (`Test` function)

  - Runs test cases from a provided test class.
  - Reports results including passed and failed tests and error messages.

- **Assertions** (`Assert` object)

  - `isTrue(value)`: Verifies that a value is `true`.
  - `match(expected, actual)`: Verifies that `expected` loosely equals `actual`.
  - `equals(expected, actual)`: Verifies that `expected` strictly equals `actual`.
  - `deepEquals(array1, array2)`: Verifies deep equality of two arrays, including nested arrays.

- **Example Test Class** (`ExampleTest`)

  - Shows how to write test cases using the framework.
  - Includes `before` and `after` hooks for setup and teardown processes.

## Example Usage

Here is how you can use the test framework:

1. **Create a Test Class**: Define a class containing your test methods. Test methods should be prefixed with `test_`.

```javascript
class ExampleTest {
    before() {
        // Setup code before every test
        Logger.log('before()');
    }
    after() {
        // Teardown code after every test
        Logger.log('after()');
    }
    test_testName1() {
        // Example failing test
        Logger.log('GIVEN');
        Logger.log('WHEN');
        Logger.log('THEN');
        Assert.equals(true, false);
    }
    test_testName2() {
        // Example passing test
        Logger.log('GIVEN');
        Logger.log('WHEN');
        Logger.log('THEN');
        Assert.isTrue(true);
    }
}
```

2. **Run the Tests**: Instantiate the test class and pass it to the `Test` function.

```javascript
function test_Example() {
    const object = new ExampleTest();
    new Test(object).run();
}
```

## Writing Your Own Tests

- Copy the `ExampleTest` class and `test_Example` function to your implementation file.
- Rename the class and methods to match what you are testing.
- Use `before` and `after` to set up and clean up as needed.
- Prefix your test methods with `test_` to ensure they are executed.

## Output

The `Logger.log` statements provide a detailed output of which tests are running, which ones pass or fail, and any errors encountered. The results are logged as follows:

- Number of tests passed
- Number of tests failed
- Detailed error messages for each failed test

## Example Output

```
Running test: testName1
Test failed: testName1 - Assertion failed: expected true, but got false
Running test: testName2
2 tests passed
1 tests failed
```

## Contributing

Feel free to contribute to this project by creating pull requests. You can add new features, improve existing functionality, or add more examples.

## License

This project is licensed under the Apache 2.0 license.

