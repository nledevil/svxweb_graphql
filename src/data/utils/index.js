import filters from './filters';

const checkVars = (qb, vars, f) => {
  if (vars) {
    const keys = Object.keys(vars);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key) {
        const val = vars[key];
        // startsWith, endsWith and like filters
        if (vars[key].toString().startsWith('$$$')) {
          try {
            filters[val.substring(2, val.indexOf(':'))](
              qb,
              key,
              val.substring(val.indexOf(':') + 1),
            );
          } catch (err) {
            qb.where(key, vars[key]);
          }
        } else {
          // Equals
          qb.where(key, vars[key]);
        }
      }
    }
  }
  // Greather Than and Less Than
  if (f) {
    try {
      const fkeys = Object.keys(f);
      for (let z = 0; z < fkeys.length; z += 1) {
        let fkey = fkeys[z];
        const fval = f[fkey];
        const fType = fkey.substring(fkey.indexOf('_') + 1);
        fkey = fkey.substring(0, fkey.indexOf('_'));
        filters[fType](qb, fkey, fval);
      }
    } catch (err) {} // eslint-disable-line
  }
};

const updateVars = (qb, vars) => {
  const keys = Object.keys(vars);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key && key !== 'Id') {
      qb.update(key, vars[key]);
    }
  }
};

export default {
  checkVars,
  updateVars,
};
