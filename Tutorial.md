# Tutorial: Using the Testing Framework

## Introduction

This tutorial will guide you through using the testing framework included in this repository. It is designed to help you write, run, and verify JavaScript tests efficiently. This framework is especially useful for developers working on Google Apps Script projects.

## Step 1: Setting Up Your Test Class

The first step is to create a test class that contains the tests you want to run. This class should include the setup (`before`) and teardown (`after`) methods as well as the actual test methods.

- **Setup (`before`)**: This method runs before each test and can be used to set up any required state or dependencies.
- **Teardown (`after`)**: This method runs after each test and can be used to clean up.

Each test method must start with `test_` to be recognized by the test runner.

### Example Code

```javascript
class ExampleTest {
    before() {
        // Setup code before every test
        Logger.log('Setting up before the test');
    }
    after() {
        // Teardown code after every test
        Logger.log('Cleaning up after the test');
    }
    test_addition() {
        // This is a sample test to verify addition functionality
        Logger.log('Testing addition');
        Assert.equals(2 + 2, 4);
    }
    test_subtraction() {
        // This is a sample test to verify subtraction functionality
        Logger.log('Testing subtraction');
        Assert.equals(5 - 3, 2);
    }
}
```

## Step 2: Running Your Tests

To run your tests, you need to create an instance of the `ExampleTest` class and pass it to the `Test` class, which will execute all test methods.

### Example Code

```javascript
function test_Example() {
    const testObject = new ExampleTest();
    new Test(testObject).run();
}
```

This function creates an instance of `ExampleTest` and calls the `run()` method to execute all the test methods prefixed with `test_`.

## Step 3: Understanding the Test Output

The output of the tests is displayed using `Logger.log` statements. The framework will log the following information:

- **Test Execution**: Which test is being run.
- **Results**: Number of tests that passed, number of tests that failed, and detailed error messages for any failed tests.

### Sample Output

```
Running test: addition
Test passed: addition
Running test: subtraction
Test passed: subtraction
2 tests passed
0 tests failed
```

In the case of a failure, the framework will log the specific error:

```
Running test: addition
Test failed: addition - Assertion failed: expected 5, but got 4
1 tests passed
1 tests failed
```

## Step 4: Writing More Complex Tests

You can create more complex tests by using the available assertions. Here are some examples:

- **Basic Assertions**:
  - `Assert.isTrue(value)`: Validates that `value` is `true`.
  - `Assert.equals(expected, actual)`: Checks strict equality between `expected` and `actual`.
  - `Assert.deepEquals(array1, array2)`: Verifies that two arrays, including nested arrays, are equal.

### Example: Testing Arrays

```javascript
class ArrayTest {
    test_arrayEquality() {
        const array1 = [1, [2, 3], 4];
        const array2 = [1, [2, 3], 4];
        Assert.deepEquals(array1, array2);
    }
}

function test_Array() {
    const arrayTest = new ArrayTest();
    new Test(arrayTest).run();
}
```

## Step 5: Tips for Writing Effective Tests

- **Use `before` and `after` hooks** to minimize repetitive setup and teardown code.
- **Name your tests descriptively** to understand their purpose easily (e.g., `test_userAuthentication` rather than `test_auth`).
- **Keep tests independent**: Each test should be able to run on its own without depending on other tests.

## Summary

- Define your test class and include `before`, `after`, and `test_` methods.
- Use the `Test` runner to execute your tests.
- Utilize assertions provided by the `Assert` object to verify expected outcomes.

By following this tutorial, you should be able to create effective tests for your JavaScript code using this framework. Happy testing!

