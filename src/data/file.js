import fs from 'fs';

const getSvxlinkLogFile = () => fs.readFileSync(`/var/log/svxlink`, 'utf-8');
const getSvxlinkConfigFile = () => fs.readFileSync(`/etc/svxlink/svxlink.conf`, 'utf-8');
const storeSvxlinkConfigFile = (config) => fs.writeFileSync('/etc/svxlink/svxlink.conf', config);

const file = {
  getSvxlinkLogFile,
  getSvxlinkConfigFile,
  storeSvxlinkConfigFile,
};

export default file;