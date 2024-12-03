// The Readable constructor creates readable streams. A readable stream could be used to read a file, read data from an incoming HTTP request, or read user input from a command prompt to name a few examples. The Readable constructor inherits from the Stream constructor which inherits from the EventEmitter constructor, so readable streams are event emitters. As data becomes available, a readable stream emits a data event.

// The following is an example demonstrating the consuming of a readable stream:

'use strict'
const fs = require('fs')
const readable = fs.createReadStream(__filename)
readable.on('data', (data) => { console.log(' got data', data) })
readable.on('end', () => { console.log(' finished reading') })

// The fs module here is used for demonstration purposes, readable stream interfaces are generic. The file system is covered in the next section, so we'll avoid in-depth explanation. But suffice to say the createReadStream method instantiates an instance of the Readable constructor and then causes it to emit data events for each chunk of the file that has been read. In this case the file would be the actual file executing this code, the implicitly available __filename refers to the file executing the code. Since it's so small only one data event would be emitted, but readable streams have a default highWaterMark option of 16kb. That means 16kb of data can be read before emitting a data event. So in the case of a file read stream, 64kb file would emit four data events. When there is no more data for a readable stream to read, an end event is emitted.

// Readable streams are usually connected to an I/O layer via a C-binding, but we can create a contrived readable stream ourselves using the Readable constructor:

'use strict'
const { Readable } = require('stream')
const createReadStream = () => {
  const data = ['some', 'data', 'to', 'read']
  return new Readable({
    read () {
      if (data.length === 0) this.push(null)
      else this.push(data.shift())
    }
  })
}
const readable = createReadStream()
readable.on('data', (data) => { console.log('got data', data) })
readable.on('end', () => { console.log('finished reading') })

// To create a readable stream, the Readable constructor is called with the new keyword and passed an options object with a read method. The read function is called any time Node internals request more data from the readable stream. The this keyword in the read method points to the readable stream instance, so data is sent from the read stream by calling the push method on the resulting stream instance. When there is no data left, the push method is called, passing null as an argument to indicate that this is the end-of-stream. At this point Node internals will cause the readable stream to emit the end event.

// When this is executed four data events are emitted, because our implementation pushes each item in the stream. The read method we supply to the options object passed to the Readable constructor takes a size argument which is used in other implementations, such as reading a file, to determine how many bytes to read. As we discussed, this would typically be the value set by the highWaterMark option which defaults to 16kb.

// The following shows what happens when we execute this code:


// Notice how we pushed strings to our readable stream but when we pick them up in the data event they are buffers. Readable streams emit buffers by default, which makes sense since most use-cases for readable streams deal with binary data.

// In the previous section, we discussed buffers and various encodings. We can set an encoding option when we instantiate the readable stream for the stream to automatically handle buffer decoding:

'use strict'
const { Readable } = require('stream')
const createReadStream = () => {
  const data = ['some', 'data', 'to', 'read']
  return new Readable({
    encoding: 'utf8',
    read () {
      if (data.length === 0) this.push(null)
      else this.push(data.shift())
    }
  })
}
const readable = createReadStream()
readable.on('data', (data) => { console.log('got data', data) })
readable.on('end', () => { console.log('finished reading') })

// If we were to run this example code again with this one line changed, we would see the following:

// Now when each data event is emitted it receives a string instead of a buffer. However because the default stream mode is objectMode: false, the string is pushed to the readable stream, converted to a buffer and then decoded to a string using UTF8.

// When creating a readable stream without the intention of using buffers, we can instead set objectMode to true:

'use strict'
const { Readable } = require('stream')
const createReadStream = () => {
  const data = ['some', 'data', 'to', 'read']
  return new Readable({
    objectMode: true,
    read () {
      if (data.length === 0) this.push(null)
      else this.push(data.pop())
    }
  })
}
const readable = createReadStream()
readable.on('data', (data) => { console.log('got data', data) })
readable.on('end', () => { console.log('finished reading') })

// This will again create the same output as before:

// However this time the string is being sent from the readable stream without converting to a buffer first.

// Our code example can be condensed further using the Readable.from utility method which creates streams from iterable data structures, like arrays:

'use strict'
const { Readable } = require('stream')
const readable = Readable.from(['some', 'data', 'to', 'read'])
readable.on('data', (data) => { console.log('got data', data) })
readable.on('end', () => { console.log('finished reading') })

// This will result in the same output, the data events will receive the data as strings.

// Contrary to the Readable constructor, the Readable.from utility function sets objectMode to true by default. For more on Readable.from see stream.Readable.from(iterable, [options]) section of the Node.js Documentation.