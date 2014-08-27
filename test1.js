

// is anyone contribution mode2 :共伞 
Parse.Cloud.define("InOneUmber", function(request, response) {
  query = new Parse.Query("UmbrellaContribution");
  query.equalTo("mode", request.params.mode);
  query.find({
    success: function(result) {
     
        response.success();

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys InOneUmber.");
    }
  });
});


// is anyone contribution mode2 :共伞的数量
Parse.Cloud.define("InOneUmberCount", function(request, response) {
  query = new Parse.Query("UmbrellaContribution");
  query.equalTo("mode", request.params.mode);
  query.count({
    success: function(count) {
     
        response.success();

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys InOneUmberCount.");
    }
  });
});