import FileSaver from 'file-saver';

module.exports = {
  download: function(filename, uri){
    fetch(uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.ms-excel',
        'Content-Type': 'application/vnd.ms-excel',
      },
      responseType: 'arraybuffer'
    })
    .then((response) => {
      response.blob()
      .then((blob) => {
        FileSaver.saveAs(blob, filename);
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
