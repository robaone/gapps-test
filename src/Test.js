function Test(testClass) {
    this.tests = testClass;
    this.run = function () {
        var objectKeys = Object.keys(this.tests);
        var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this.tests));

        const keys = [...new Set([...objectKeys, ...propertyNames])];

        keys.filter(key => key.startsWith('test_')).forEach(k => {
            const before_index = keys.findIndex(key => key == 'before');
            if (before_index > -1) this.tests['before']();
            Logger.log(`Running test: ${k.substring(5)}`);
            this.tests[k]();
            const after_index = keys.findIndex(key => key == 'after');
            if (after_index > -1) this.tests['after']();
        });
    }
};

var Assert = {
    'isTrue': function (value) {
        if (value != true) {
            throw 'Value is not true';
        }
    },
    'match': function (expected, actual) {
        if (expected != actual) {
            throw 'Expected value is (' + JSON.stringify(expected) + ') but is (' + JSON.stringify(actual) + ')';
        }
    },
    'equals': (expected, actual) => {
        if (expected !== actual) {
            throw new Error(`Assertion failed: expected ${expected}, but got ${actual}`);
        }
    },
    'deepEquals': function (array1, array2) {
        const result = (() => {
            if (array1.length !== array2.length) {
                return false;
            }

            for (var i = 0; i < array1.length; i++) {
                if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
                    if (!Assert.deepEquals(array1[i], array2[i])) {
                        return false;
                    }
                } else {
                    const array1_str = JSON.stringify(array1[i]);
                    const array2_str = JSON.stringify(array2[i]);
                    if (array1_str !== array2_str) {
                        return false;
                    }
                }
            }

            return true;
        })();
        if (!result) {
            throw `Expected value is (${JSON.stringify(array1)}) but is (${JSON.stringify(array2)})`;
        }
        return result;
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
        Assert.isTrue(true);
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