import { PrismaClient } from "@prisma/client";

export default class HomeworkService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createHomework(title, description, deadline, subjectId) {
    try {
      const newHomework = await this.prisma.homework.create({
        data: {
          title: title,
          description: description,
          deadline: new Date(deadline),
          subjectId: subjectId,
        },
      });
      return newHomework;
    } catch (error) {
      console.error("Error creating homework:", error);
      throw error;
    }
  }

  async getAllHomework() {
    try {
      const homeworks = await this.prisma.homework.findMany();
      return homeworks;
    } catch (error) {
      console.error("Error fetching homeworks:", error);
      throw error;
    }
  }

  async getHomeworkById(id) {
    try {
      const homework = await this.prisma.homework.findUnique({
        where: { id: id },
      });
      return homework;
    } catch (error) {
      console.error("Error fetching homework by ID:", error);
      throw error;
    }
  }

  async updateHomework(id, title, description, deadline, subjectId) {
    try {
      const updatedHomework = await this.prisma.homework.update({
        where: { id: id },
        data: {
          title: title,
          description: description,
          deadline: new Date(deadline),
          subjectId: subjectId,
        },
      });
      return updatedHomework;
    } catch (error) {
      console.error("Error updating homework:", error);
      throw error;
    }
  }

  async deleteHomework(id) {
    try {
      const deletedHomework = await this.prisma.homework.delete({
        where: { id: id },
      });
      return deletedHomework;
    } catch (error) {
      console.error("Error deleting homework:", error);
      throw error;
    }
  }
}
