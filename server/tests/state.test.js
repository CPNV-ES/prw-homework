import request from "supertest";
import { describe, it, expect } from "vitest";
import { setup } from "./setup.js";

describe("State E2E Tests", () => {
  let stateId;

  it("should create a new state", async () => {
    const response = await request(setup).post("/states").send({
      name: "Test State",
      color: "#FFFFFF",
      icon: "test-icon",
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test State");
    stateId = response.body.id;
  });

  it("should get all states", async () => {
    const response = await request(setup).get("/states");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a state by ID", async () => {
    const response = await request(setup).get(`/states/${stateId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(stateId);
  });

  it("should update a state by ID", async () => {
    const response = await request(setup).put(`/states/${stateId}`).send({
      name: "Updated Test State",
      color: "#000000",
      icon: "updated-icon",
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Test State");
  });

  it("should delete a state by ID", async () => {
    const response = await request(setup).delete(`/states/${stateId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(stateId);
  });
});
