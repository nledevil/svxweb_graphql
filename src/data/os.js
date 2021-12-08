import { networkInterfaces } from 'os';
import osu from 'node-os-utils';
import execFunction from './utils/exec';

const { os, cpu, mem, proc } = osu;

const getCPUTemp = async () => {
  const cpuinfo = await execFunction('dietpi_cpuinfo');
  for (let i = 0; i < cpuinfo.length; i += 1) {
    const line = cpuinfo[i];
    if (line.includes('Temperature')) {
      return line.replace(' Temperature  |', '')
    }
  }
  return '';
};

const getAudioInputs = () => execFunction('audio_inputs');

const getAudioOutputs = () => execFunction('audio_outputs');

const getLSUSB = () =>  execFunction('system_usb');

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
      cpuTemp: await getCPUTemp(),
    },
    mem: await mem.info(),
    proc: {
      totalProcesses: await proc.totalProcesses(),
    },
    audio: {
      inputs: await getAudioInputs(),
      outputs: await getAudioOutputs(),
    },
    usb: await getLSUSB(),
  }
  return stats;
};

export default getOSStats;