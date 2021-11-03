'use strict';

const express = require('express');

const { Clothes } = require('../models/index');

const clothesRouter = express.Router();


// RESTful Route Delectation 
clothesRouter.get('/clothes', getclothes); // get all the clothes form the DB
clothesRouter.get('/clothes/:id', getOneClothes); // gets a Clothes by ID
clothesRouter.post('/clothes', createClothes); // creating a new Clothes
clothesRouter.put('/clothes/:id', updateClothes); // updating a Clothes by their ID
clothesRouter.delete('/clothes/:id', deleteClothes); // deleting a Clothes by their ID


async function getclothes(req, res) {

  const allclothes = await Clothes.findAll();
  res.status(200).json(allclothes);

}

async function getOneClothes(req, res) {
  const id = parseInt(req.params.id); // we parse the ID in case it was a string
  const clothes = await Clothes.findOne({
    where: {
      id: id
    }
  });
  res.status(200).json(clothes);
}

async function createClothes(req, res) {
  const obj = req.body;
  let clothes = await Clothes.create(obj);
  res.status(201).json(clothes);

}

async function updateClothes(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundClothes = await Clothes.findOne({ where: { id: id } });
  const updatedClothes = await foundClothes.update(obj);
  res.status(201).json(updateClothes);
}

async function deleteClothes(req, res) {
  const id = parseInt(req.params.id);
  const deletedClothes = await Clothes.destroy({ where: { id } });
  res.status(204).json(deleteClothes);
}


module.exports = clothesRouter;