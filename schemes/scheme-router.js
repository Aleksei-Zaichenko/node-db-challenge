const express = require('express');

const Projects = require('./scheme-model.js');

const router = express.Router();

//Retrives all projects
router.get('/', (req, res) => {
   Projects.getAllProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

//Retrives a project with passed Id
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Projects.getProjectById(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
        console.log(err);
      res.status(500).json({ message: 'Failed to get project' });
    });
});

//Adds a project with passed data
router.post('/', (req,res) => {
    Projects.addProject(req.body)
    .then(newProject => {
        if (newProject) {
            res.status(200).json({message: "A new project was added successfully", data: newProject});
        } else {
        res.status(400).json({ message: 'Could not find project with given id.' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to add a new project' });
    });
})

//Retrives required resources for a given project ID
router.get('/:id/resources', (req, res) => {
    const { id } = req.params;
  
    Projects.getResourcesForProject(id)
    .then(resoucresList => {
      if (resoucresList.length > 0) {
        res.status(200).json(resoucresList);
      } else {
        res.status(404).json({ message: 'Could not find resources for given project id.' })
      }
    })
    .catch(err => {
        console.log(err);
      res.status(500).json({ message: 'Failed to get require resources for given ID project' });
    });
});

//Adds a new resource
router.post('/resources', (req,res) => {
    Projects.addResource(req.body)
    .then(newResource => {
        if (newResource) {
            res.status(200).json({message: "A new resource was added successfully", data: newResource});
        } else {
        res.status(400).json({ message: 'Failed to add a new resource' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to add a new resource' });
    });
})

//Adds a resource to a project
router.post('/:id/resources', (req,res) => {
    Projects.addResourceToProject(req.params.id, req.body)
    .then(newPair => {
        if (newPair ) {
            res.status(200).json({message: `A resource was added to project with id:${req.params.id} successfully`, data: newPair});
        } else {
        res.status(400).json({ message: 'Failed to add a resource to a project' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to add a resource to a project' });
    });
})

//Retrives tasks for a given project Id
router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
  
    Projects.getTasksForProject(id)
    .then(tasks => {
      if (tasks.length > 0) {
        res.status(200).json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
        console.log(err);
      res.status(500).json({ message: 'Failed to get project' });
    });
});

//Adds a new task
router.post('/:id/tasks', (req, res) => {
    Projects.addTask(req.body, req.params.id)
    .then(newTask => {
        if (newTask) {
            res.status(200).json({message: "A new task was added successfully", data: newTask});
        } else {
        res.status(404).json({ message: 'Failed to add a new task' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to add a new task' });
    });
})

module.exports = router;