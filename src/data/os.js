import osu from 'node-os-utils';

const { os, cpu, mem, proc } = osu;

const getOSStats = async () => {
  const stats = {
    os: {
      ip: os.ip(),
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