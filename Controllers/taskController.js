const nameSchema = require('../models/Tasks')


let express = require('express');
const mongoose = require('mongoose');

const deleted=async(req,res)=>{
    await nameSchema.deleteOne({_id:req.params.id})
    res.json("Deleted")
}

const update=async(req,res)=>{
const { nameOfTask, work } = req.body;

await nameSchema.updateOne(
  { _id: req.params.id },
  {
    $set: {
      nameOfTask: nameOfTask,
      work: work
    }
  }
);

res.send("Updated")
}

const create=async(req,res)=>{
      const idOfUser = req.params.id;
       const {nameOfTask, work } = req.body;

  if (!idOfUser || !nameOfTask || !work) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

    const newData = new nameSchema({
      idOfUser,
      nameOfTask,
      work,
    });

    await newData.save();
    res.send("Task Added Sucessfully");
}

const gettasksofuser = async(req,res)=>{
    const data = await nameSchema.find({idOfUser:req.params.id});
    res.json(data);
}

exports.create = create;
exports.update = update;
exports.deleted = deleted;
exports.gettasksofuser = gettasksofuser;


