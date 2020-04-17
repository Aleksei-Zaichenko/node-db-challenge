
exports.up = function(knex) {
  return knex.schema

    //projects
    .createTable('projects', tbl =>{
        tbl.string('id',255).primary();
        tbl.string('name',255).notNullable().unique().index();
        tbl.text('description');
        tbl.boolean('is_completed').notNullable().defaultTo(false);
    })
    
    //resources
    .createTable('resources', tbl =>{
        tbl.string('id', 255).primary();
        tbl.string('name', 255).notNullable().unique().index();
        tbl.text('description');
    })

    //tasks
    .createTable('tasks', tbl =>{
        tbl.string('id', 255).primary();
        tbl.string('description',255).notNullable().unique().index();
        tbl.text('notes');
        tbl.boolean('is_completed').notNullable().defaultTo(false);

         //foreign key
        tbl
            .string('project_id',255)
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    })

    //whatNeededForProject
    .createTable('whatNeededForProject', tbl =>{
        tbl.string('id', 255).primary();

         //foreign key
        tbl
            .string('project_id',255)
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');

        //foreign key
        tbl
            .string('resource_id',255)
            .notNullable()
            .references('id')
            .inTable('resources')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('whatNeededForProject')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
