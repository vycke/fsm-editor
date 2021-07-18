export default function Command({ execute, command, search }) {
  let tokens;
  if (!search.length) tokens = [command.hint];
  else tokens = command.hint.split(new RegExp(search, 'gi'));

  return (
    <button
      onClick={async () => await execute(command)}
      key={command.key}
      className="panel-l panel-w-00 panel-f-00 px-0 text-left hover:bg-gray-500 py-000">
      <div>
        <span className="text-000 monospace radius-0 px-000 bg-gray-300 text-gray-500">
          {command.group}
        </span>
      </div>
      <span className="text-00 text-gray-300 px-000">
        {tokens.map((t, i) => {
          if (i < tokens.length - 1)
            return (
              <span key={i + t}>
                {t}
                <span className="text-blue">{search}</span>
              </span>
            );
          else return <span key={i + t}>{t}</span>;
        })}
      </span>
    </button>
  );
}
