module.exports = () => ({
    files: ["src/**/*.ts"],
    tests: ["tests/**/*.test.ts"],

    testFramework: "jest",
    env: {
        type: "node",
        runner: "node",
    }
})