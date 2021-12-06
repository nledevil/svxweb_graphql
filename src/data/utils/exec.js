import util from 'util';
import { exec } from 'child_process';

const asyncExec = util.promisify(exec);

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
      }
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

// AUDIO
const audio_inputs = () => execBatch(["arecord -l"]);

const audio_outputs = () => execBatch(["aplay -l"]);

const audio_version = () => execBatch(["cat /proc/asound/version 2>&1"]);
