import request from "supertest";
import { describe, it, expect } from "vitest";
import { setup } from "./setup.js";

describe("Subject E2E Tests", () => {
  let subjectId;

  it("should create a new subject", async () => {
    const response = await request(setup).post("/subjects").send({
      name: "Test Subject",
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Subject");
    subjectId = response.body.id;
  });

  it("should get all subjects", async () => {
    const response = await request(setup).get("/subjects");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a subject by ID", async () => {
    const response = await request(setup).get(`/subjects/${subjectId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(subjectId);
  });

  it("should update a subject by ID", async () => {
    const response = await request(setup).put(`/subjects/${subjectId}`).send({
      name: "Updated Test Subject",
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Test Subject");
  });

  it("should delete a subject by ID", async () => {
    const response = await request(setup).delete(`/subjects/${subjectId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(subjectId);
  });
});
