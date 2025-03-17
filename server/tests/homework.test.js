import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { setup } from "./setup.js";

describe("Homework E2E Tests", () => {
  let homeworkId;
  let stateId;

  // Create a test state before testing homeworks
  beforeAll(async () => {
    const stateResponse = await request(setup).post("/states").send({
      name: "Test State",
      color: "#000000",
      icon: "bi-check"
    });
    stateId = stateResponse.body.id;
  });

  it("should create a new homework", async () => {
    const response = await request(setup).post("/homeworks").send({
      title: "Test Homework",
      description: "This is a test homework",
      deadline: "2023-12-31T23:59:59Z",
      subjectId: 1,
      stateId: stateId
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Homework");
    expect(response.body.stateId).toBe(stateId);
    homeworkId = response.body.id;
  });

  it("should get all homeworks", async () => {
    const response = await request(setup).get("/homeworks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.some(hw => hw.id === homeworkId)).toBe(true);
  });

  it("should get a homework by ID", async () => {
    const response = await request(setup).get(`/homeworks/${homeworkId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(homeworkId);
    expect(response.body.stateId).toBe(stateId);
  });

  it("should update a homework by ID", async () => {
    const response = await request(setup)
      .put(`/homeworks/${homeworkId}`)
      .send({
        title: "Updated Test Homework",
        description: "This is an updated test homework",
        deadline: "2024-01-01T23:59:59Z",
        subjectId: 1,
        stateId: stateId
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Test Homework");
    expect(response.body.stateId).toBe(stateId);
  });

  it("should delete a homework by ID", async () => {
    const response = await request(setup).delete(`/homeworks/${homeworkId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(homeworkId);
  });

  // Clean up the test state after all tests
  afterAll(async () => {
    await request(setup).delete(`/states/${stateId}`);
  });
});
