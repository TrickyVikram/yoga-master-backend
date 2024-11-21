const Class = require('../models/classModel');

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes' });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  const { name, description } = req.body;
  
  try {
    const newClass = new Class({ name, description });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class' });
  }
};
