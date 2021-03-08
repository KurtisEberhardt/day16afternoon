import express from "express";
import BaseController from "../utils/BaseController";
import { burgersService } from "../services/BurgersService.js";
import { BURGERDB } from "../db/BURGERDB";

export class BurgersController extends BaseController{
    constructor(){
        super("api/burgers")
        this.router
            .get("", this.getAll)
            .get(":/id", this.getOne)
            .post("", this.create)
            .delete("", this.delete)
            .put("/:id", this.edit)
    }
    async getOne(req, res, next){
        try {
            res.send(burgersService.getOne(req.params.id))
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next){
        try {
            let editedBurger = req.body
            const burger = burgersService.edit(editedBurger, req.params.id)
            res.send(burger)
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next){
        try {
            const burgers = burgersService.getAll()
            res.send(burgers)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next){
        try {
            let newBurger = req.body
            const burger = burgersService.create(newBurger)
            res.status(201).send({data: burger, message: "Order up!", counter: BURGERDB.burgers.length})
        } catch (error) {
            next(error)
        }
    }
    async delete(req,res,next){
        try {
            const id = req.params.id
            burgersService.delete(id)
            res.send("Burger Eaten")
        } catch (error) {
            next(error)
        }
    }
}