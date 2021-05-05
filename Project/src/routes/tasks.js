const express = require('express')
const router = express.Router()

const pool = require('../database')

function changePrioritylevel(level) {
    if (level == 1) {
        return "Muy alta"
    } else if (level == 2) {
        return "Alta"
    } else if (level == 3) {
        return "Normal"
    } else if (level == 4) {
        return "Baja"
    } else if (level == 5) {
        return "Muy baja"
    }
}

router.get('/', async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tasks WHERE finalizada = 1 ORDER BY priorityLevel ASC')
    const tasks2 = await pool.query('SELECT * FROM tasks WHERE finalizada = 2 ORDER BY priorityLevel ASC')
    for(var i =0; i<tasks.length; i++) {
        tasks[i].priorityLevel = changePrioritylevel(tasks[i].priorityLevel)
    }
    for(var i =0; i<tasks2.length; i++) {
        tasks2[i].priorityLevel = changePrioritylevel(tasks2[i].priorityLevel)
    }
    res.render('tasks/list', { tasks, tasks2})
})

router.get('/unfinished', async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tasks WHERE finalizada = 1 ORDER BY priorityLevel ASC')
    for(var i =0; i<tasks.length; i++) {
        tasks[i].priorityLevel = changePrioritylevel(tasks[i].priorityLevel)
        console.log(tasks[i].priorityLevel)
    }
    res.render('tasks/listfinished', { tasks })
})

router.get('/finished', async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tasks WHERE finalizada = 2 ORDER BY priorityLevel ASC')
    for(var i =0; i<tasks.length; i++) {
        tasks[i].priorityLevel = changePrioritylevel(tasks[i].priorityLevel)
        console.log(tasks[i].priorityLevel)
    }
    res.render('tasks/listUnfinished', { tasks })
})

router.get('/add', (req, res) => {
    res.render('tasks/add')
})

router.post('/add', async (req, res) => {
    const { title, personInCharge, priorityLevel, hashtag } = req.body
    const newTask = {
        title,
        personInCharge,
        priorityLevel,
        hashtag
    }
    await pool.query('INSERT INTO tasks set ? ', [newTask])
    req.flash('success', 'Tarea agregada correctamente')
    res.redirect('/task')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM tasks WHERE ID = ?', [id]);
    req.flash('success', 'Tarea eliminada correctamente')
    res.redirect('/task') 
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    const tasks = await pool.query('SELECT * FROM tasks WHERE id = ?', [id])
    res.render('tasks/edit', { task: tasks[0] })
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params
    const { title, personInCharge, priorityLevel, hashtag } = req.body
    const newTask = {
        title,
        personInCharge,
        priorityLevel,
        hashtag 
    }
    await pool.query('UPDATE tasks set ? WHERE id = ?', [newTask, id])
    req.flash('success', 'Tarea actualizada correctamente')
    res.redirect('/task')
})

router.get('/finish/:id', async (req, res) => {
    const { id } = req.params
    await pool.query('UPDATE tasks set finalizada = 2 WHERE id = ?',[id])
    req.flash('success', 'Tarea completada')
    res.redirect('/task') 
})


module.exports = router