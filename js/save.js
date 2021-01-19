$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            alert('ctrl-s');
            saver();
            
        }
    }
});

function saver(){
    var file = getNewFileHandle()
    
}

async function getNewFileHandle() {
    const options = {
      types: [
        {
          description: 'Image Files',
          accept: {
            'image/png': ['.png'],
          },
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    writeFile(handle,canvas.toDataURL())
    return handle;
}

async function writeFile(fileHandle, contents) {
    
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }