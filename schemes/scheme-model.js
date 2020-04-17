const db = require('../data/db-config.js');

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    getResourcesForProject,
    addResource,
    getTasksForProject,
    addTask,
    addResourceToProject
};

function getAllProjects(){
    return db('projects');
}

function getProjectById(passedId){
    return db('projects').where('id', passedId).first();
}

function addProject(passedData){
    return db('projects')
        .insert(passedData)
        .then(([newAddedProjectID]) => getProjectById(newAddedProjectID))
};

function getResourcesForProject(passedProjectId){
    return db('whatNeededForProject')
        .where('project_id', passedProjectId)
        .join('resources', 'whatNeededForProject.resource_id', 'resources.id')
        .join('projects', 'whatNeededForProject.project_id', 'projects.id')
        .select('projects.name','resources.name', 'resources.description');
}

function addResource(passedData){
    return db('resources')
        .insert(passedData)
        .then(([newAddedResourceID])=> db('resources').where('id', newAddedResourceID))
};

function getTasksForProject(passedProjectId){
    return db('tasks')
        .where('project_id', passedProjectId)
        .join('projects', 'tasks.project_id', 'projects.id')
        .select('projects.name','tasks.description', 'tasks.notes', 'tasks.is_completed');
}

function addTask(passedBodyData, passedParamsData){

    const projectID = passedParamsData;
    const newTask = {...passedBodyData, project_id: projectID}

    return db('tasks')
        .insert(newTask)
        .then(([newAddedTaskID]) => db('tasks').where('id', newAddedTaskID))
};

//To allow multiple resource to be used by multiple projects
// a third intermediate table should be used
//Every connection between a resource and a project should be added 
//manually thorugh this function
function addResourceToProject(passedProjectId, passedResourceID){
    const newProjectResourceConnection = {project_id: passedProjectId, ...passedResourceID}
    return db('whatNeededForProject')
        .insert(newProjectResourceConnection)
        .then(([newPairId]) => db('whatNeededForProject').where('id', newPairId))
}

// function getShoppingList(passedId){
//     return db('instructions')
//         .where('recipe_id', passedId)
//         .join('ingredients', 'instructions.ingredient_id', 'ingredients.id')
//         .select('ingredients.name', 'instructions.ingredient_quantity');
// }

// function getInstructions(passedId){
//     return db.select('instruction_description', 'step_number').from('instructions')
//         .where('recipe_id', passedId)
// }