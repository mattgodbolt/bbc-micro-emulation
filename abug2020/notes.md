abug
----

* Who am I?
  * Live in Chicago now
  * Better known for C++, optimization, Compiler Explorer
* Why Beeb?
  * RTW
    * best friend since we were 12
    * Hacked on Acorn User stuff together
    * Original author of BeebAsm
    * now works at Epic on Unreal stuff
* Why browser
  * It's cool!
  * I kinda wanted to show what could be done
  * Miracle++
* jsbeeb!
  * powers 
* Demo it!
  * Printer & Paste
  * Load game from STH NOT ELITE (Repton?)
  * Fire up
  * Full screen
  * CTRL-insert to run things fast
* Debugger!
  * Show regs etc
  * Single step
  * Step in/out
  * Breakpoint something ffee ? oswrch
* But there's more!!
  * js API
  * open up the console
  * import utils
  * debug read
    * called on every read, (addr, byte, offset) => return true to stop emu
    * debug trace!! dumpTrace
  * debug write
  * instruction (addr, opcode) -- histogram
...


Demo?
```js
utils = require('utils')
utils.hexbyte(24)
```

Break on read (or write)
```js
processor.debugRead.add(addr => addr === 0xe00)
```

Crappy CPU profiler:
```js
addrBits = 4
addrHistogram = new Array(1<<(16-addrBits)).fill(0);
processor.debugInstruction.add(addr => {addrHistogram[addr >>> addrBits]++; return false; });

addrHistogram.map((count, addr) => { return {count, addr: utils.hexword(addr<<addrBits)}; }).sort((x,y) => y.count - x.count).slice(0, 10)
```

Opcode histogram:
```js
histogram = new Array(256).fill(0);
processor.debugInstruction.add((_, opcode) => {histogram[opcode]++; return false; });

* tracing
* debugread