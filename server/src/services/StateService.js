import { PrismaClient } from "@prisma/client";

export default class StateService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createState(name, color, icon) {
    try {
      const newState = await this.prisma.state.create({
        data: {
          name: name,
          color: color,
          icon: icon,
        },
      });
      return newState;
    } catch (error) {
      console.error("Error creating state:", error);
      throw error;
    }
  }

  async getAllStates() {
    try {
      const states = await this.prisma.state.findMany();
      return states;
    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  }

  async getStateById(id) {
    try {
      const state = await this.prisma.state.findUnique({
        where: { id: id },
      });
      return state;
    } catch (error) {
      console.error("Error fetching state by ID:", error);
      throw error;
    }
  }

  async updateState(id, name, color, icon) {
    try {
      const updatedState = await this.prisma.state.update({
        where: { id: id },
        data: {
          name: name,
          color: color,
          icon: icon,
        },
      });
      return updatedState;
    } catch (error) {
      console.error("Error updating state:", error);
      throw error;
    }
  }

  async deleteState(id) {
    try {
      const deletedState = await this.prisma.state.delete({
        where: { id: id },
      });
      return deletedState;
    } catch (error) {
      console.error("Error deleting state:", error);
      throw error;
    }
  }
}
