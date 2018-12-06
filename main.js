  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  var getAllRecords = function() {
    $.getJSON('https://api.airtable.com/v0/apptXKhbkBHnU8Gmp/Parkour%20Spots%20in%20SF?api_key=keyS05nzMebuQX7Y3',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var location = record.fields['Location'];
          var photos = record.fields['Photos'];
          var description = record.fields['Description'];
          html.push(listView(id, location, photos, description));
        });
        $('.list').append(html);
      }
    );
  }
  
  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/apptXKhbkBHnU8Gmp/Parkour%20Spots%20in%20SF/${id}?api_key=keyS05nzMebuQX7Y3`,
      function(record){
        var html = [];
        var location = record.fields['Location'];
        var description = record.fields['Description'];
        var photos = record.fields['Photos'];
        var size = record.fields['Size'];
        html.push(detailView(location, description, photos, size));
        
        $('.detail').append(html);
      }
    );
  }
  
  var listView = function(id, location, photos, description) {
    return `
      <h2><a href="index.html?id=${id}">${location}</a></h2>
      <p>${description}</p>
      ${photos ? `<img src="${photos[0].url}">` : ``}
    `;
  }
  
  var detailView = function(location, description, photos, size) {
    console.log(description)
    return `
      <h2>${location}</h2>
      <h2>${size}</h2>
      <p>${description}</p>
      ${photos ? `<img src="${photos[0].url}">` : ``}
    `;
  }
  
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }
 