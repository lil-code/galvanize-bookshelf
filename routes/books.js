'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const humps = require('humps');
//HANDLING ALL MY ROUTING @ ONCE 👨🏻 LiL_Code
router.route('/')
.get((req, res) => {
  knex('books').orderBy('title', 'asc').then((demBooks) => {
    res.send(humps.camelizeKeys(demBooks))
  })
}).post((req, res) => {
  knex('books').returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .insert(humps.decamelizeKeys(req.body)).then((book) => {
      res.send(humps.camelizeKeys(book[0]));
    })
});
router.route('/:id')
.get((req, res) => {
    knex('books').where('id', req.params.id).then((book) => {
    res.send(humps.camelizeKeys(book[0]));
  })
}).patch((req, res) => {
  knex('books').where('id', req.params.id).returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .update(humps.decamelizeKeys(req.body)).then((book) => {
      res.send(humps.camelizeKeys(book[0]));
    });
}).delete((req, res) => {
  knex('books').where('id', req.params.id).returning(['title', 'author', 'genre', 'description', 'cover_url'])
    .del().then((book) => {
      res.send(humps.camelizeKeys(book[0]));
    });
});
module.exports = router;
