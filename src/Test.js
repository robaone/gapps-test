function Test(testClass) {
    const tests = testClass;
    this.run = function () {
        const results = { passed: 0, failed: 0, errors: [] };
        const objectKeys = Object.keys(tests);
        const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(tests));

        const keys = [...new Set([...objectKeys, ...propertyNames])];

        keys.filter(key => key.startsWith('test_')).forEach(k => {
            try {
                if (typeof tests.before === 'function') tests.before();
                Logger.log(`Running test: ${k.substring(5)}`);
                tests[k]();
                results.passed++;
            } catch (error) {
                results.failed++;
                results.errors.push(`${k}: ${error.message || error}`);
                Logger.log(`Test failed: ${k} - ${error.message || error}`);
            } finally {
                try {
                    if (typeof tests.after === 'function') tests.after();
                } catch (error) {
                    Logger.log(`After hook failed: ${error.message || error}`);
                }
            }
        });
        Logger.log(`${results.passed} tests passed`);
        Logger.log(`${results.failed} tests failed`);
        results.errors.forEach((error) => Logger.log(error));
        return results;
    }
};

var Assert = {
    isTrue(value) {
        if (value !== true) {
            throw new Error('Value is not true');
        }
    },
    match(expected, actual) {
        if (expected != actual) {
            throw new Error(`Expected value is (${JSON.stringify(expected)}) but is (${JSON.stringify(actual)})`);
        }
    },
    equals(expected, actual) {
        if (expected !== actual) {
            throw new Error(`Assertion failed: expected ${expected}, but got ${actual}`);
        }
    },
    deepEquals(array1, array2) {
        if (!Array.isArray(array1) || !Array.isArray(array2)) {
            throw new Error('Both arguments must be arrays');
        }
        if (array1.length !== array2.length) {
            throw new Error(`Arrays have different lengths: ${array1.length} !== ${array2.length}`);
        }

        for (let i = 0; i < array1.length; i++) {
            if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
                this.deepEquals(array1[i], array2[i]);
            } else {
                const array1Str = JSON.stringify(array1[i]);
                const array2Str = JSON.stringify(array2[i]);
                if (array1Str !== array2Str) {
                    throw new Error(`Arrays differ at index ${i}: ${array1Str} !== ${array2Str}`);
                }
            }
        }
    }
};

/**
 * Copy this class and test_Example function to your implementation file.
 * Change the class name and test name to match the class that you are testing.
 */
class ExampleTest {
    before() {
        // This happens before every test
        Logger.log('before()');
    }
    after() {
        // This happens after every test
        Logger.log('after()');
    }
    test_testName1() {
        // This is a test
        Logger.log('GIVEN');
        Logger.log('WHEN');
        Logger.log('THEN');
        Assert.equals(true,false);
    }
    test_testName2() {
        // This is a test
        Logger.log('GIVEN');
        Logger.log('WHEN');
        Logger.log('THEN');
        Assert.isTrue(true);
    }
}

function test_Example() {
    const object = new ExampleTest();
    new Test(object).run();
}
