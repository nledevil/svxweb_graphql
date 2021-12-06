import knex from '../config/knex';
import utils from './utils';

const { checkVars, updateVars } = utils;

const raw = query => knex.raw(query);

const get = (table, input, limit, offset, filters) =>
  knex(table)
    .select()
    .modify(qb => {
      if (input || filters) {
        checkVars(qb, input, filters);
      }
      if (limit) {
        qb.limit(limit);
      }
      if (offset) {
        qb.offset(offset);
      }
    });

const insert = (table, inp) => {
  const { input } = inp;
  return knex(table)
    .insert(input)
    .then(() =>
      input,
    );
};

const batchInsert = async (table, inp) => {
  const { input } = inp;
  const resp = [];
  for (const i of input) {
    const res = await insert(table, { input: i });
    resp.push(res);
  }
  return resp;
};

const update = (table, inp) => {
  const { input } = inp;
  // console.log('input:', input);
  return knex(table)
    .where('id', input.id)
    .modify(qb => {
      updateVars(qb, input);
    })
    .then(() =>
      knex(table)
        .first()
        .where('id', input.id),
    );
};

const updateSvxlink = (table, inp) => {
  const { input } = inp;
  return knex(table)
    .where({
      headerName: input.headerName,
      settingName: input.settingName,
    })
    .modify(qb => {
      updateVars(qb, input);
    })
    .then(() => 
      knex(table)
        .first()
        .where({
          headerName: input.headerName,
          settingName: input.settingName,
        }),
    );
}

const del = (table, inp) => {
  const { input } = inp;
  return knex(table)
    .where('id', input.id)
    .del()
    .then(() => ({ id: input.id }));
};

const delAll = table => knex(table).del();

export default {
  raw,
  get,
  update,
  insert,
  batchInsert,
  del,
  delAll,
  updateVars,
  updateSvxlink,
  knex,
};
