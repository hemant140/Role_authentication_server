import joi from 'joi'
import { PRIORITY } from '../enum/enum.js';
import { taskReq } from '../utils/Validation/validation-schema.js';
import Task from '../module/task.module.js';

export const getAllTask = async (req, res, next) => {
    try {
        const task = await Task.find({}, { __v: 0 });
        res.send(task);
    } catch (error) {
        next(error)
    }
}


export const createTask = async (req, res, next) => {

    const { body, file } = req;
    const result = taskReq.validate(body);
    const { error } = result;
    const valid = error == null;
    if (!valid) {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        res.status(422).json({ error: message });
    }

    const taskPayload = {
        ...body,
        image: file.path
    }

    const newTask = new Task(taskPayload);

    try {
        await newTask.save();
        res.status(201).json({
            Status: 1,
            Message: "Task Created Succesfully !"
        })
    } catch (error) {
        next(error);
    }

}

export const UpdateTask = async (req, res, next) => {
    const { id } = req.params;

    const { body, file } = req;
    const result = taskReq.validate(body);
    const { error } = result;
    const valid = error == null;
    if (!valid) {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        res.status(422).json({ error: message });
    }

    const taskPayload = {
        ...body,
        image: file.path
    }

    try {
        const existingUser = (await Task.updateOne({ _id: id }, taskPayload)).modifiedCount > 0 || false;

        if (!existingUser) {
            res.status(404).json({
                Status: 0,
                Message: 'Task Not Found !'
            })
        }
        res.status(200).send({
            Status: 1,
            Message: `Task with id:${id} updated successfully`
        })
    } catch (error) {
        next(error)
    }

}

export const getTaskById = async (req, res, next) => {
    const { id } = req.params;

    const existingTask = await Task.findById({ _id: id }, { __v: 0 });

    console.log(existingTask)

    if (!existingTask) {
        res.status(404).json({
            Status: '0',
            Message: 'Task Not Found'
        });
    }

    res.status(200).send(existingTask);
}


export const deleteTask = async (req, res, next) => {
    const { id } = req.params;

    const existing = await Task.deleteOne({ _id: id }).deletedCount > 0 || false ;
    console.log(existing)

    if (!existing) {
        res.status(404).json({
            Status: 0,
            Message: 'Task Not Found !'
        });
    }

    res.status(200).send({
        Status: 1,
        Message: `Task with id:${id} deleted successfully`
    })


}