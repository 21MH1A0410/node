
const express = require("express")
const path = require("path")
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname,'newdatabase.DB')
let db = null 

const initializeDBAndServer = async () => {
    try{
        db = await open({
            filename:dbPath,
            driver : sqlite3.Database
        })
        await db.run(`
            CREATE TABLE IF NOT EXISTS task (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT
            )
        `)
            
        app.listen(3000,()=>{
            console.log("Server Running at http://localhost:3000/")
        })
    }
    catch(e){
        console.log('DB Error: ', error.message)
    process.exit(1)
    }
}

app.post("/tasks/",async (request,response)=>{
    const {title,description} = request.body
    if(!title){
        return response.status(400).send("title should not be empty")
    }
    if(!description){
        return response.status(400).send("description should not be empty")
    }
    const createTaskQuery = `INSERT INTO task (title, description)
        VALUES('${title}', '${description}');`
    const result =await db.run(createTaskQurey)
    response.status(201).json(result)
})

app.get("/tasks/",async (request,response)=>{
    const getTasksQuery = `SELECT * FROM task ORDER BY id`
    const tasks =await db.all(getTasksQuery)
    response.status(200).json(tasks)
})

app.get("/tasks/:id",async (request,response)=>{
    const {id} = request.params
    const getTaskQuery = `SELECT * FROM task WHERE id=${id}`
    const task  =await db.get(getTaskQuery)
    if (!task){
        return response.status(400).send({error:"Id not found"})
    }
    response.status(200).json(task)
})

app.put("/tasks/:id",async (request,response)=>{
    const {id} = request.params
    const {title,description} = request.body 
    if(!title){
        return response.status(400).send("tilte should not be empty")
    }
    if(!description){
        return response.status(400).send("description should not be empty")
    }
    const updateTaskQuery = `
        UPDATE task 
            SET title='${title}', description='${description}'
            WHERE id = ${id}
    `
    const result = await db.run(updateTaskQuery)
    if (result.changes === 0) {
        return response.status(400).send("Error updating")
    }
    response.status(200).send("Updated successfully")
})
app.delete("/tasks/:id",async (request,response)=>{
    const {id} = request.params
    const deleteTaskQuery = `
        DELETE FROM task WHERE id=${id}
    ` 
    await db.run(deleteTaskQuery)
    response.status(200).send("Deleted successfully")
})
initializeDBAndServer()
module.exports = app

