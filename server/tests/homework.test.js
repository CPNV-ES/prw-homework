import request from "supertest";
import { describe, it, expect } from "vitest";
import { setup } from "./setup.js";

describe("Homework E2E Tests", () => {
  let homeworkId;

  it("should create a new homework", async () => {
    const response = await request(setup).post("/homeworks").send({
      title: "Test Homework",
      description: "This is a test homework",
      deadline: "2023-12-31T23:59:59Z",
      subjectId: 1,
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Homework");
    homeworkId = response.body.id;
  });

  it("should get all homeworks", async () => {
    const response = await request(setup).get("/homeworks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a homework by ID", async () => {
    const response = await request(setup).get(`/homeworks/${homeworkId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(homeworkId);
  });

  it("should update a homework by ID", async () => {
    const response = await request(setup)
      .put(`/homeworks/${homeworkId}`)
      .send({
        title: "Updated Test Homework",
        description: "This is an updated test homework",
        deadline: "2024-01-01T23:59:59Z",
        subjectId: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Test Homework");
  });

  it("should delete a homework by ID", async () => {
    const response = await request(setup).delete(`/homeworks/${homeworkId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(homeworkId);
  });
});
