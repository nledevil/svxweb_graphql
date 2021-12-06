export default {
  $SW: (qb, key, val) => qb.where(key, 'like', `${val}%`),
  $EW: (qb, key, val) => qb.where(key, 'like', `%${val}`),
  $LK: (qb, key, val) => qb.where(key, 'like', `%${val}%`),
  GTE: (qb, key, val) => qb.where(key, '>=', val),
  GT: (qb, key, val) => qb.where(key, '>', val),
  LTE: (qb, key, val) => qb.where(key, '<=', val),
  LT: (qb, key, val) => qb.where(key, '<', val),
};
