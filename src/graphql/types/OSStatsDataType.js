import {
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLBoolean as BoolType,
  GraphQLList as List,
} from 'graphql';

const netType = {
  iname: { type: StringType },
  address: { type: StringType },
  netmask: { type: StringType },
  family: { type: StringType },
  mac: { type: StringType },
  internal: { type: BoolType },
  cidr: { type: StringType  },
  scopeid: { type: IntType },
};

const osType = {
  hostname: { type: StringType },
  type: { type: StringType },
  arch: { type: StringType },
  uptime: { type: FloatType },
  os: { type: StringType },
};

const cpuType = {
  cpuAvg: { type: FloatType },
  cpuCount: { type: IntType },
  cpuModel: { type: StringType },
  cpuTemp: { type: StringType },
};

const memType = {
  totalMemMb: { type: FloatType },
  usedMemMb: { type: FloatType },
  freeMemMb: { type: FloatType },
  usedMemPercentage: { type: FloatType },
  freeMemPercentage: { type: FloatType },
};

const procType = {
  totalProcesses: { type: IntType },
};

const audioType = {
  inputs: { type: new List(StringType) },
  outputs: { type: new List(StringType) },
};

const OSStatsNETDataType = new ObjectType({
  name: 'OSSTatusNETDataType',
  description: 'NET Stats',
  fields: {
    ...netType,
  }
});

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

const OSStatsAUDIODataType = new ObjectType({
  name: 'OSStatsAUDIODataType',
  description: 'AUDIO Stats',
  fields: {
    ...audioType,
  }
});

export const OSStatsDataType = new ObjectType({
  name: 'OSStatsDataType',
  description: 'OSStatsDataType',
  fields: {
    net: { type: new List(OSStatsNETDataType) },
    os: { type: OSStatsOSDataType },
    cpu: { type: OSStatsCPUDataType },
    mem: { type: OSStatsMEMDataType },
    proc: { type: OSStatsPROCDataType },
    audio: { type: OSStatsAUDIODataType },
    usb: { type: new List(StringType) },
  },
});
