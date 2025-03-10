import { PrismaClient } from "@prisma/client";

export default class SubjectService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createSubject(name) {
    try {
      const newSubject = await this.prisma.subject.create({
        data: {
          name: name,
        },
      });
      return newSubject;
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  }

  async getAllSubjects() {
    try {
      const subjects = await this.prisma.subject.findMany();
      return subjects;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  }

  async getSubjectById(id) {
    try {
      const subject = await this.prisma.subject.findUnique({
        where: { id: id },
      });
      return subject;
    } catch (error) {
      console.error("Error fetching subject by ID:", error);
      throw error;
    }
  }

  async updateSubject(id, name) {
    try {
      const updatedSubject = await this.prisma.subject.update({
        where: { id: id },
        data: {
          name: name,
        },
      });
      return updatedSubject;
    } catch (error) {
      console.error("Error updating subject:", error);
      throw error;
    }
  }

  async deleteSubject(id) {
    try {
      const deletedSubject = await this.prisma.subject.delete({
        where: { id: id },
      });
      return deletedSubject;
    } catch (error) {
      console.error("Error deleting subject:", error);
      throw error;
    }
  }
}
