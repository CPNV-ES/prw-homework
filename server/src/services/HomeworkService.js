import prisma from "../../prisma/prismaClient.js";

export default class HomeworkService {
  async createHomework(title, description, deadline, subjectId, stateId, notificationThreshold) {
    try {
      const newHomework = await prisma.homework.create({
        data: {
          title: title,
          description: description,
          deadline: new Date(deadline),
          subjectId: subjectId,
          stateId: stateId,
          notificationThreshold: parseInt(notificationThreshold, 10) || 24
        },
        include: {
          Subject: true,
          State: true,
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
      const homeworks = await prisma.homework.findMany({
        include: {
          Subject: true,
          State: true,
        },
      });
      return homeworks;
    } catch (error) {
      console.error("Error fetching homeworks:", error);
      throw error;
    }
  }

  async getHomeworkById(id) {
    try {
      const homework = await prisma.homework.findUnique({
        where: { id: id },
        include: {
          Subject: true,
          State: true,
        },
      });
      return homework;
    } catch (error) {
      console.error("Error fetching homework by ID:", error);
      throw error;
    }
  }

  async updateHomework(id, title, description, deadline, subjectId, stateId, notificationThreshold) {
    try {
      const updatedHomework = await prisma.homework.update({
        where: { id: id },
        data: {
          title: title,
          description: description,
          deadline: new Date(deadline),
          subjectId: subjectId,
          stateId: stateId,
          notificationThreshold: notificationThreshold || 24
        },
        include: {
          Subject: true,
          State: true,
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
      const deletedHomework = await prisma.homework.delete({
        where: { id: id },
      });
      return deletedHomework;
    } catch (error) {
      console.error("Error deleting homework:", error);
      throw error;
    }
  }
}
