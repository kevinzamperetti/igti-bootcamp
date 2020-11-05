import express from 'express';
import {studentModel} from '../models/studentModel.js';
const app = express();

app.post('/student', async (req, res) => {
  try {
    const newStudentModel = new studentModel(req.body);
    await newStudentModel.save();
    res.send(newStudentModel);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/student', async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (error) {
    res.status(500).send(err);
  }
});

app.patch('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStudent = await studentModel.findByIdAndUpdate({_id: id}, req.body, {new: true});
    res.send(updatedStudent);
  } catch (error) {
    res.status(500).send(err);
  }
});

app.delete('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStudent = await studentModel.findByIdAndDelete({_id: id});
    if (!deletedStudent) {
      res.status(404).send(`ID "${id}" não econtrado na coleção.`);  
    } else {
      res.status(200).send();
    }
  } catch (error) {
    res.status(500).send(err);
  }
});

export {app as studentRouter};