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

* Demo it!
  * Paste, printer
  * ctrl-home, end, insert (fast as possible)
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
addrHistogram.map((count, addr) => { return {count, addr: utils.hexword(addr<<addrBits)}; }).sort((x,y) => y.count - x.count)
```

Opcode histogram:
```js
histogram = new Array(256).fill(0);
processor.debugInstruction.add((_, opcode) => {histogram[opcode]++; return false; });
histogram.map((count, opcode) => { return {count, opcode}; }).sort((x,y) => y.count - x.count)
```

* tracing
* debugread