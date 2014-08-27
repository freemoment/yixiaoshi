

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