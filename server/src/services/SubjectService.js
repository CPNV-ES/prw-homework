const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSubject(name) {
  try {
    const newSubject = await prisma.subject.create({
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

async function getAllSubjects() {
  try {
    const subjects = await prisma.subject.findMany();
    return subjects;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
}

async function getSubjectById(id) {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: id },
    });
    return subject;
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    throw error;
  }
}

async function updateSubject(id, name) {
  try {
    const updatedSubject = await prisma.subject.update({
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

async function deleteSubject(id) {
  try {
    const deletedSubject = await prisma.subject.delete({
      where: { id: id },
    });
    return deletedSubject;
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw error;
  }
}

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
