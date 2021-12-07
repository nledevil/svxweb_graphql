const decode = (str) => {
  const output = [];
  let section;
  const lines = str.split(/[\r\n]+/g);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.match(/^\s*[;#]/)) {
      // Not a Comment
      const match = line.match(/^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i);
      if (match !== null) {
        if (match[1] !== undefined) {
          section = match[1];
        } else {
          output.push({
            headerName: section,
            settingName: match[2],
            settingValue: match[4],
          })
        }
      }
    }
  }
  // output.lines = lines;
  return output;
};

const encode = (arr, comment) => {
  let out = (comment !== undefined) ? `${comment}\n` : '';
  const headers = [];
  // Get Headers
  for (let i = 0; i < arr.length; i += 1) {
    const { headerName } = arr[i];
    if (!headers.includes(headerName)) {
      headers.push(headerName);
    }
  }
  // Loop through Headers
  for (let i = 0; i < headers.length; i += 1) {
    const headerName = headers[i];
    let section = `[${headerName}]\n`;
    const filtered = arr.filter(item => item.headerName === headerName);
    const isLastSection = (i < (headers.length - 1)) ? false : true;
    for (let f = 0; f < filtered.length; f += 1) {
      const { settingName, settingValue } = filtered[f];
      const isLastLine = (f < (filtered.length - 1)) ? false : true;
      section += `${settingName}=${settingValue}${(isLastSection && isLastLine) ? '' : '\n'}`;
    }
    out += `${section}${!isLastSection ? '\n' : ''}`;
  }
  return out;
}

export default {
  decode,
  encode,
};