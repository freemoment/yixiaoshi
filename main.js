// count of contribution  :取正在共伞的数量  done
Parse.Cloud.define("InOneUmberCount", function(request, response) {
  var Relationship = Parse.Object.extend('Relationship');
  query = new Parse.Query(Relationship);
  query.equalTo("isActive", true);
    query.equalTo("status", request.params.status);
  query.count({
    success: function(count) {
        alert('count: ' + count);
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
        }else{
          //or update
          result.set("isActive",true);
          result.save(null, {
              success: function(result) {
                response.success("success");

              },
              error: function(result, error) {
                response.error("Error " + error.code + " : " + error.message + " when update.");
              }
            });
        }
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
                    response.success("success");
                  },
                  error: function(result, error) {
                    // The delete failed.
                    // error is a Parse.Error with an error code and description.
                    response.error(error);
                  }
                });
                 }
               response.success("success");
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



// find the ones who have umber  
// todo: implement again
Parse.Cloud.define("queryUmberOnes", function(request, response) {
  var User = Parse.Object.extend('User');
  query = new Parse.Query(User);
  query.find({
    success: function(result) {
        response.success(result);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys queryUmberOnes.");
    }
  });
});


// find the ones who dont have umber 
// todo: implement again
Parse.Cloud.define("queryNoUmberOnes", function(request, response) {
  var User = Parse.Object.extend('User');
  query = new Parse.Query(User);
  query.find({
    success: function(result) {
        response.success(result);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys queryUmberOnes.");
    }
  });
})



// find the ones who request yourself 
// todo: implement again
Parse.Cloud.define("queryRequestToMeList", function(request, response) {
  var User = Parse.Object.extend('User');
  query = new Parse.Query(User);
  query.find({
    success: function(result) {
        response.success(result);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys queryUmberOnes.");
    }
  });
})



// find the ones who I sent request 
// todo: implement again
Parse.Cloud.define("queryMyRequestList", function(request, response) {
  var User = Parse.Object.extend('User');
  query = new Parse.Query(User);
  query.find({
    success: function(result) {
        response.success(result);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys queryUmberOnes.");
    }
  });
})



// find the current ones who finish register
// todo: implement again
Parse.Cloud.define("finishRegister", function(request, response) {
  var User = Parse.Object.extend('User');
  query = new Parse.Query(User);
  query.first({
    success: function(result) {
        response.success(result);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys queryUmberOnes.");
    }
  });
})


// find the current ones who finish login
// todo: implement again
Parse.Cloud.define("finishlogin", function(request, response) {
  var User = Parse.Object.extend('User');
  query = new Parse.Query(User);
  query.first({
    success: function(result) {
        response.success(result);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys queryUmberOnes.");
    }
  });
})




// request some one's desc
// todo: implement again
Parse.Cloud.define("queryDescForUserName", function(request, response) {
  var User = Parse.Object.extend('User');
  query = new Parse.Query(User);
  query.first({
    success: function(result) {
        response.success(result);

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys queryUmberOnes.");
    }
  });
})
