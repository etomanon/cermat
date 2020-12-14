import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('school', (table) => {
      table.increments()
      table.text('name').notNullable().index()
      table.text('redizo').notNullable().index()
      table.text('region').notNullable().index()
      table
        .specificType('geom', 'geometry(Point,4326)')
        .notNullable()
        // @ts-ignore
        .index('IDX_GEOM', 'GIST')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('result', (table) => {
      table.increments()
      table.integer('year').notNullable().index()
      table.text('subject').notNullable().index()
      table.decimal('share_chosen', 4, 1).index()
      table.decimal('signed', 4, 1).index()
      table.decimal('excused', 4, 1).index()
      table.decimal('expelled', 4, 1).index()
      table.decimal('tested', 4, 1).index()
      table.decimal('failed', 4, 1).index()
      table.decimal('success', 4, 1).index()
      table.decimal('success_percentil', 4, 1).index()
      table
        .integer('school_id')
        .references('id')
        .inTable('school')
        .notNullable()
        .index()
        .onDelete('cascade')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('school').dropTable('result')
}
