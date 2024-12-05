import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Task } from "@prisma/client";


@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService) {}

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });
        if (!task) {
            throw new ForbiddenException({
                error: 'Task not found',
                code: 403,
            });
        }
        return task;
    }

    async createTask(data: Task): Promise<Task> {
        return this.prisma.task.create({
            data
        });
    }

    async updateTask(id: number, data: Task): Promise<Task> {
        const task = await this.getTaskById(id);
        return this.prisma.task.update({
            where: {
                id
            },
            data
        });
    }

    async deleteTask(id: number): Promise<Task> {
        const task = await this.getTaskById(id);
        return this.prisma.task.delete({
            where: {
                id
            }
        });
    }

}