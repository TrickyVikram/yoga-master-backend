const Class = require('../models/classModel');

exports.createClass = async (name, description) => {
  const newClass = new Class({ name, description });
  await newClass.save();
  return newClass;
};
