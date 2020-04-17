
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('whatNeededForProject').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('whatNeededForProject').insert([
        {id: 1, project_id: 1, resource_id: 1},
        {id: 2, project_id: 1, resource_id: 2},
        {id: 3, project_id: 1, resource_id: 3}
      ]);
    });
};
