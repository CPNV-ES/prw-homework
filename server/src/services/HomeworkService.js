const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createHomework(title, description, deadline, subjectId) {
  try {
    const newHomework = await prisma.homework.create({
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

async function getAllHomework() {
  try {
    const homeworks = await prisma.homework.findMany();
    return homeworks;
  } catch (error) {
    console.error("Error fetching homeworks:", error);
    throw error;
  }
}

async function getHomeworkById(id) {
  try {
    const homework = await prisma.homework.findUnique({
      where: { id: id },
    });
    return homework;
  } catch (error) {
    console.error("Error fetching homework by ID:", error);
    throw error;
  }
}

async function updateHomework(id, title, description, deadline, subjectId) {
  try {
    const updatedHomework = await prisma.homework.update({
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

async function deleteHomework(id) {
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

module.exports = {
  createHomework,
  getAllHomework,
  getHomeworkById,
  updateHomework,
  deleteHomework,
};
