function decode64(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

function encode64(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }
    )
  );
}

function compress(str) {
  return (
    str
      //compress delay information
      .replaceAll(/, \{ delay:\s*(.*?)\s*\}}/gm, ';d=$1')
      // compress entry effects
      .replaceAll(/"entry":"\[\(send\) => send\('(.*?)'\)\]"/gm, '@s=>$1@')
      // .replaceAll(/"cond":"\[\(ctx\) => (.*?)\]"/gm, 'ctx::$1')
      // compress transitions with guards
      .replaceAll(
        /\{"target":"(.*?)","cond":"\[\(ctx\) => (.*?)\]"}/gm,
        '#$1;ctx=>$2#'
      )
  );
}

function decompress(str) {
  return str
    .replaceAll(
      /#(.*?);ctx=>(.*?)#/gm,
      '{"target":"$1","cond":"[(ctx) => $2]"}'
    )
    .replaceAll(/@s=>(.*?)@/gm, '"entry":"[(send) => send(\'$1\')]"')
    .replaceAll(/;d=(.*?)]/gm, ', { delay: $1 }]');
}

function machineToConfig(nodes, edges) {
  // Initial convertion
  const config = {};
  nodes.forEach((n) => {
    config[n.data.label] = {};
    if (n.data.entry) {
      const str = `[(send) => send('${n.data.entry}', { delay: ${
        n.data.delay || 0
      } })]`.replace(', { delay: 0 }', '');
      config[n.data.label].entry = str;
    }
  });

  edges.forEach((e) => {
    const { data: source } = nodes.find((n) => n.id === e.source);
    const { data: target } = nodes.find((n) => n.id === e.target);

    if (!config[source.label].on) config[source.label].on = {};

    if (e.data.guard) {
      config[source.label].on[e.data.label] = {
        target: target.label,
        cond: `[(ctx) => ${e.data.guard}]`,
      };
    } else {
      config[source.label].on[e.data.label] = target.label;
    }
  });

  return config;
}

export function stringifyMachine(nodes, edges) {
  return JSON.stringify(machineToConfig(nodes, edges), null, 2)
    .replaceAll('"[', '')
    .replaceAll(']"', '');
}

export function machineToBase64(nodes, edges) {
  return encode64(compress(JSON.stringify(machineToConfig(nodes, edges))));
}

export function base64ToMachine(str) {
  return decompress(decode64(str));
}
