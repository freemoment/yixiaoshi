// count of contribution  :取正在共伞的数量  done
Parse.Cloud.define("InOneUmberCount", function(request, response) {
  var Relationship = Parse.Object.extend('Relationship');
  query = new Parse.Query(Relationship);
  query.equalTo("isActive", true);
  query.equalTo("status", 3);
  query.count({
    success: function(count) {
     
        response.success(count);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys InOneUmberCount.");
    }
  });
});





// 发一个请求  done, 
Parse.Cloud.define("requestToSomeone", function(request, response) {
    //当前用户id
    var fromUserId = request.params.userId;
    var toUserId = request.params.toUserId;

    // var fromUserId = "testone11";
    // var toUserId = "testtwo1";

    var Relationship = Parse.Object.extend('Relationship');
    query = new Parse.Query(Relationship);
    query.equalTo("fromUser", fromUserId);
    query.equalTo("toUser", toUserId);
    query.equalTo("status", 1);
    query.first({
    success: function(result) {
        //already exist, do nothing;  
        if(!result){
            var relationship = new Relationship();

            relationship.set("fromUser",fromUserId);
            relationship.set("toUser",toUserId);
            relationship.set("isActive",true);
            relationship.set("status",1);
             relationship.save(null, {
              success: function(relationship) {
                response.success("success");

              },
              error: function(relationship, error) {
                response.error("Error " + error.code + " : " + error.message + " when save.");
              }
            });
        }
        response.success("success");

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys InOneUmberCount.");
    }
  });

});


// 取消一个请求  done
Parse.Cloud.define("cancelRequest", function(request, response) {
    //当前用户id
    var fromUserId = request.params.userId;
    var toUserId = request.params.toUserId;

    // var fromUserId = "testone11";
    // var toUserId = "testtwo1";

    var Relationship = Parse.Object.extend("Relationship");
    query = new Parse.Query("Relationship");

    query.equalTo("fromUser",fromUserId);
    query.equalTo("toUser",toUserId);
    query.equalTo("isActive",true);
    query.equalTo("status",1);
    query.first({
      success: function(result) {
                 if (result) {
                    result.destroy({
                  success: function(result) {
                    // The object was deleted from the Parse Cloud.
                    response.success("destroy success");
                  },
                  error: function(result, error) {
                    // The delete failed.
                    // error is a Parse.Error with an error code and description.
                    response.error(error);
                  }
                });
                 }
               response.success("destroy success");
      },
      error: function(result, error) {
        alert('Failed to find object before destroy, with error code: ' + error.message);
      }
    });
});







// 拒绝一个请求  done
Parse.Cloud.define("rejectRequest", function(request, response) {
    //当前用户id
    var fromUserId = request.params.userId;
    var toUserId = request.params.toUserId;

    // var fromUserId = "testone11";
    // var toUserId = "testtwo1";

    var Relationship = Parse.Object.extend("Relationship");
    var relationship = new Relationship();

    relationship.set("fromUser",fromUserId);
    relationship.set("toUser",toUserId);
    relationship.set("isActive",false);
    relationship.set("status",2);
     relationship.save(null, {
      success: function(relationship) {
        response.success("success");

      },
      error: function(relationship, error) {
        response.error("Error " + error.code + " : " + error.message + " when save.");
      }
    });

});
