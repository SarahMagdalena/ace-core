+++
title = "Configuration"
weight = 5
wip = true
+++

## Overview

Ace can be configured through a `config.json` file located in an OS-specific directory:

- on Windows in `"%HOME%\AppData\Local\DAISY Ace\Config\"`
- on macOS in `"~/Library/Preferences/DAISY\ Ace/"`
- on Linux in `"~/.config/DAISY Ace/"`

## Defaults

The defaults for Ace configuration are:

```json
{
  "logging": {
    "fileName": "ace.log",
    "level": "info"
  },
  "output": {
    "force": false,
    "subdir": false
  }
  "runtime": {
    "concurrencyLevel": 4
  }
}
```

## Reference

### `logging.fileName`

Default: "`info`"

The name of the file used by Ace to print a log of runtime messages. This file will reside in an OS-specific directory, as described in the [logging documentation]({{< ref "logging.md" >}}).

### `logging.level`

Default: "`info`"

Indicates the severity level above which a runtime message is logged. Accepted values are `error`, `warn`, `info`, `verbose` and `debug`.

### `output.force`

Default: "`false`"

Indicates whether to overwrite any files in the output directory when Ace saves a report in the file system.

### `output.subdir`

Default: "`false`"

Indicates wheter to save reports in a subdirectory of the output directory. If set to `true`, the subdirectory will be named after hte input EPUB document.

### `runtime.concurrencyLevel`

Default: "`4`"

The number of concurrent headless browser instances used to check HTML content.



