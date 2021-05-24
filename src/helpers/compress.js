export function compress(str) {
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

export function decompress(str) {
  return str
    .replaceAll(
      /#(.*?);ctx=>(.*?)#/gm,
      '{"target":"$1","cond":"[(ctx) => $2]"}'
    )
    .replaceAll(/@s=>(.*?)@/gm, '"entry":"[(send) => send(\'$1\')]"')
    .replaceAll(/;d=(.*?)]/gm, ', { delay: $1 }]');
}
