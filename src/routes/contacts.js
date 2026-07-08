const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get("/", async (req,res)=>{
    try{
        const contacts = await prisma.contact.findMany();
        res.json(contacts);
    } catch(error){
        console.log(error);
        res.status(500).json({error:"something went wrong"});
    }
});

router.get("/:id" , async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const contacts = await prisma.contact.findUnique({
            where: {id},
        });
        if (!name){
            return res.status(400).json({error: "Name is required"});
        }
        res.json(contacts);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.post("/", async (req,res)=>{
    try{
        const { name,email,phone,notes } =req.body;
        if (!name){
            return res.status(400).json({error: "Name is required"});
        }
        const contact =await prisma.contact.create({
            data: {
                name,
                email,
                phone,
                notes,
            },
        });
        res.status(201).json(contact);
    } 
    catch(error){
        console.error(error);
        res.status(500).json({error:"something went wrong"});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email, phone, notes } = req.body;

        // check if contact exists first
        const existing = await prisma.contact.findUnique({
            where: { id },
        });

        if (!existing) {
            return res.status(404).json({ error: "Contact not found" });
        }

        const updated = await prisma.contact.update({
            where: { id },
            data: { name, email, phone, notes },
        });

        res.json(updated);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.delete("/" , async (req,res)=>{
    try{
        const id =parseInt(req.params.id);
        const exists = prisma.contact.findUnique({
            where: {id},
        });

        if(!exists) return res.status(404).json({ error: "Contact not found" });

        await prisma.contact.delete({
            where: {id},
        });

        res.json({ message: "Contact deleted successfully" });


    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
});
module.exports =router;