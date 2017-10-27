var linksGroup = null;

$(function() {
  $.getJSON("links.json", function(data) {
    linksGroup = data; 
    linksGroup = sortOnKeys(linksGroup);

    updateCards();
  });
});

function updateCards(){
  $("#cards-container").empty();

  $.each(linksGroup, function(key, val) {
    cardHTML = "<div class=\"card\">";
    header = "";
    
    header = generateCardHeader(key);
    
    if (header !== "") {
      cardHTML += header + "<ul class=\"list-group list-group-flush\">";
      lines = "";

      $.each(val, function(itemName, itemLink) {
          lines += generateCardItem(itemLink, itemName);
      });
      cardHTML += lines + "</ul></div>";

      $("#cards-container").append(cardHTML);
    }
  });
}

function generateCardHeader(cardName) {
  return "<div class=\"card-header\"><h2>" + cardName + "</h2></div>";
}

function generateCardItem(itemLink, itemName) {
  return "<li class=\"list-group-item\"><a href=\"" + itemLink + "\">" + itemName + "</a></li>";
}

function sortOnKeys(dict) {

    var sorted = [];
    for(var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    var tempDict = {};
    for(var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
}