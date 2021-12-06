import {
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
} from 'graphql';

const osType = {
  ip: { type: StringType },
  hostname: { type: StringType },
  type: { type: StringType },
  arch: { type: StringType },
  uptime: { type: IntType },
  os: { type: StringType },
};

const cpuType = {
  cpuAvg: { type: FloatType },
  cpuCount: { type: IntType },
  cpuModel: { type: StringType },
};

const memType = {
  totalMemMb: { type: IntType },
  usedMemMb: { type: FloatType },
  freeMemMb: { type: FloatType },
  usedMemPercentage: { type: FloatType },
  freeMemPercentage: { type: FloatType },
};

const procType = {
  totalProcesses: { type: IntType },
};

const OSStatsOSDataType = new ObjectType({ 
  name: 'OSStatsOSDataType',
  description: 'OS Stats',
  fields: {
    ...osType,
  }
});

const OSStatsCPUDataType = new ObjectType({
  name: 'OSStatsCPUDataType',
  description: 'CPU Stats',
  fields: {
    ...cpuType,
  }
});

const OSStatsMEMDataType = new ObjectType({
  name: 'OSStatsMEMDataType',
  description: 'MEM Stats',
  fields: {
    ...memType,
  }
});

const OSStatsPROCDataType = new ObjectType({
  name: 'OSStatsPROCDataType',
  description: 'PROC Stats',
  fields: {
    ...procType,
  }
});

export const OSStatsDataType = new ObjectType({
  name: 'OSStatsDataType',
  description: 'OSStatsDataType',
  fields: {
    os: { type: OSStatsOSDataType },
    cpu: { type: OSStatsCPUDataType },
    mem: { type: OSStatsMEMDataType },
    proc: { type: OSStatsPROCDataType },
  },
});
