# ex-jest-first-steps

My experiments with Jest test library

1. AAA principles (ARRANGE-ACT-ASSERT)
2. F.I.R.S.T. principles (Fast, Independent, Repitable, Self-validating, Thorough) 


Use 
- VSCode "REST Client" extension for run  .http files 
- https://github.com/microsoft/vscode-recipes/tree/main/debugging-jest-tests



Jest hooks can help init common mocks for all tests;

Principles:
- One class = one test case.
- One method = one or more tests.
- One alternative branch (if/switch/try-catch/exception) = one test.

Doubles:
- Dummy object
- Fakes
- Stubs
- Spiec
- Mocks 


Heavy mock testing approach
Advantages:
- Test classes in isolation
- Impose a strict coding style  (If class has too many dependencies - it makes it hard to test...)
- Once tests are in place, it easy to create new tests 
Disadvantages:
- Test and implementation are tighly coupled (small change leads to many changes)
- Hard to write 



Mike Cohn's pyramid tests consist of three levels (from bottom to top):
- Unit tests.
- Service tests.
- User interface tests.
In this pyramid, the main rule consists of two principles:

The higher the level, the fewer tests.
