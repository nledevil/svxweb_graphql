import { networkInterfaces } from 'os';
import osu from 'node-os-utils';

const { os, cpu, mem, proc } = osu;

const getNetworkInterfaces = () => {
  const network = []
  const interfaces = networkInterfaces();
  const interfaceNames = Object.keys(interfaces);
  for (let i = 0; i < interfaceNames.length; i += 1) {
    const name = interfaceNames[i];
    const items = interfaces[name];
    for (let a = 0; a < items.length; a += 1) {
      const item = items[a];
      network.push({
        iname: name,
        ...item,
      });
    }
  }
  return network;
}

const getOSStats = async () => {
  const stats = {
    net: getNetworkInterfaces(),
    os: {
      hostname: os.hostname(),
      type: os.type(),
      arch: os.arch(),
      uptime: os.uptime(),
      os: await os.oos(),
    },
    cpu: {
      cpuAvg: await cpu.usage(),
      cpuCount: cpu.count(),
      cpuModel: cpu.model(),
    },
    mem: await mem.info(),
    proc: {
      totalProcesses: await proc.totalProcesses(),
    }
  }
  return stats;
};

export default getOSStats;