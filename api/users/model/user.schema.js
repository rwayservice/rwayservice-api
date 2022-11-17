'use strict';

import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  otherName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: () => Date.now
  },
  updatedAt: {
    type: Date,
    default: () => Date.now
  }
});

const model = mongoose.model('user', schema);

export { model, schema };
