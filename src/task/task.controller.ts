import { ForbiddenException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";


@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {};

    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Get(":id")
    async getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(Number(id));
    }

    @Post()
    async createTask(@Body() data: Task) {
        return this.taskService.createTask(data);
    }

    @Put(":id")
    async updateTask(@Param('id') id: string, @Body() data: Task) {
        return this.taskService.updateTask(Number(id), data);
    }

    @Delete(":id")
    async deleteTask(@Param('id') id: string) {
        return this.taskService.deleteTask(Number(id));
    }

}