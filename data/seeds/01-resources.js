
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'computer', description: 'main part of my career'},
        {id: 2, name: 'mouse', description: 'don\`t like touchpad'},
        {id: 3, name: 'headphones', description: 'for mood'},
      ]);
    });
};
