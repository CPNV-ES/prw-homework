import { beforeAll, afterAll } from "vitest";
import app from "../src/app.js";

let setup;

// Create express app instance for each test using an available port
beforeAll(() => {
  return new Promise((resolve) => {
    setup = app.listen(0, () => {
      resolve();
    });
  });
});

afterAll(() => {
  setup.close();
});

// Export the server and port for tests to use
export { setup };
