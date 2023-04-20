import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "./tasks.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksRepository {
    constructor(@InjectModel('Task') private taskModel: Model<Task>) {}


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        //define a temporary array to hold the result;
        let tasks = await this.taskModel.find()
        //do something with status
        if(status) tasks = tasks.filter(task => task.status === status)
        //do something with search
        if(search) tasks = tasks.filter((task) => {
            if(task.title.includes(search) || task.description.includes(search)){
                return true;
            }
            return false
        })
        // return final result
        return tasks;
    }


    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskModel.findById(id)

        if(!found) throw new NotFoundException(`Task with ID "${id}" not found`)

        return found
    }

    async createTask(createTaskDto:CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = await this.taskModel.create({
            title,
            description,
            status: TaskStatus.OPEN
        })
        return task
    }

    async deleteTask(id: string): Promise<void> {
        const deletedTask = await this.taskModel.deleteOne({_id: id})
        console.log(deletedTask)
        if(deletedTask.deletedCount === 0) throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.taskModel.findByIdAndUpdate(id, {
            status: status
        })
        return task;
    }

    
}