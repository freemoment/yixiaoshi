Parse.Cloud.beforeDelete("DeleteTest", function(request, response) {
  query = new Parse.Query("Contribution");
  query.equalTo("0", request.object.type);
  console.message("query userId :"+ query.userId);
  query.count({
    success: function(count) {
     
        response.success();

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when getting photo count.");
    }
  });
});