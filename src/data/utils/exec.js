import util from 'util';
import { exec } from 'child_process';

const asyncExec = util.promisify(exec);

const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
].join('|');

const ansiRegex = new RegExp(pattern, 'g');

const execBatch = async (cmdBatch) => {
  let output = [];
  let errors = [];
  let error = false;
  for (let i = 0; i < cmdBatch.length; i += 1) {
    if (!error) {
      const { stderr, stdout, error } = await asyncExec(cmdBatch[i]);
      if (error) {
        errors.push(error.message);
        error = true;
      }
      if (stderr) {
        errors.push(stderr);
        error = true;
      }
      if (stdout) {
        output.push(stdout);
      }0
    }
  }
  if (errors.length > 0) {
    return false;
  }
  return output;
};

// SVXLINK
const svxlink_disable = () => execBatch(["service svxlink stop", "systemctl disable svxlink.service"]);
  
const svxlink_enable = () => execBatch(["systemctl enable svxlink.service", "service svxlink start"]);

const svxlink_restart = () => execBatch(["service svxlink restart", "systemctl is-active svxlink"]);

const svxlink_start = () => execBatch(["service svxlink start", "systemctl is-active svxlink"]);
  
const svxlink_stop = () => execBatch(["service svxlink stop", "systemctl is-active svxlink"]);

// SYSTEM
const system_reboot = () => execBatch(["shutdown -r now"]);
  
const system_shutdown = () => execBatch(["shutdown -h now"]);

const system_usb = () => execBatch(["lsusb"])

const system_processes = () => execBatch(["ps aux"]);

// AUDIO
const audio_inputs = () => execBatch(["arecord -l"]);

const audio_outputs = () => execBatch(["aplay -l"]);

const audio_version = () => execBatch(["cat /proc/asound/version 2>&1"]);

// DIETPI
const dietpi_cpuinfo = () => execBatch(["/boot/dietpi/dietpi-cpuinfo"]);

const execFunctions = {
  svxlink_disable,
  svxlink_enable,
  svxlink_restart,
  svxlink_start,
  svxlink_stop,
  system_reboot,
  system_shutdown,
  system_usb,
  system_processes,
  dietpi_cpuinfo,
  audio_inputs,
  audio_outputs,
  audio_version,
};

const execFunction = async (functionName) => {
  const result = await execFunctions[functionName]();
  try {
    if (result.length > 0) {
      return result[0].replace(ansiRegex, '').split(/\r?\n/).filter(v => v !== '');
    }
  } catch (err) {
    console.error(`error: ${err}`);
  }
  
  return result;
};

export default execFunction;