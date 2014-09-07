
// count of contribution  :取正在共伞的数量
Parse.Cloud.define("InOneUmberCount", function(request, response) {
  query = new Parse.Query("Relationship");
  query.equalTo("isActive", "true");
  query.equalTo("status", 3);
  query.count({
    success: function(count) {
     
        response.success();

    },
    error: function(error) {
      response.error("Error " + error.code + " : " + error.message + " when query guys InOneUmberCount.");
    }
  });
});


//取有伞&&顺路&&是异性的用户
Parse.Cloud.define("getMatchUser", function(request, response) {
                   //当前用户id
                   var userId = request.params.userId;
                   var userQuery = new Parse.Query(Parse.User);

                   userQuery.get(userId, {
                                 success: function(user) {

                                 //获取有伞状态
								 var innerQueryForUmbrellaContribution = new Parse.Query('UmbrellaContribution');
								 innerQueryForUmbrellaContribution.equalTo("isContributor",true);
                                 //获取当前用户 终点 geo
                                 var innerQueryForRoute = new Parse.Query('Route');
                                 innerQueryForRoute.equalTo("user",user);
                                 // 获取顺路的用户
                                 var innerQueryForRouteSameEnd new Parse.Query('Route');
                                 innerQueryForRouteSameEnd.matchesQuery("end",innerQueryForRoute);
                                 //获取异性
                                 var gender = user.get("gender");
                                 if (gender == 0) {
                                 	gender =1;
                                 }else{
                                 	gender =0;
                                 }
                                 var innerQueryForUser new Parse.Query('User');
                                 innerQueryForUser.equalTo("gender",gender);
                                 innerQueryForUser.matchesQuery("objectId",innerQueryForUser.matchesQuery("objectId",innerQueryForUmbrellaContribution));

                                 query.find({
                                             success: function(users) {
                                                response.success();
                                             },
                                             error: function(error) {
                                                response.error(error);
                                             }
                                 });
                                 },
                                 error: function(user, error) {
                                    response.error(error);
                                 }
                   });
});




// 发一个请求
Parse.Cloud.define("requestToSomeone", function(request, response) {
	//当前用户id
    var fromUserId = request.params.userId;
    var toUserId = request.params.toUserId;

	var Relationship = Parse.Object.extend("Relationship");
	var relationship = new Relationship();

	relationship.set("fromUser",fromUserId);
	relationship.set("toUser",toUserId);
	relationship.set("isActive",true);
	relationship.set("status",1);
	 relationship.save(null, {
	  success: function(relationship) {
	    alert('New Relationship object created with objectId: ' + relationship.id);
	  },
	  error: function(relationship, error) {
	    alert('Failed to create new Relationship object, with error code: ' + error.message);
	  }
	});
});


// 取消一个请求
Parse.Cloud.define("cancelRequest", function(request, response) {
	//当前用户id
    var fromUserId = request.params.userId;
    var toUserId = request.params.toUserId;

	var Relationship = Parse.Object.extend("Relationship");
	query = new Parse.Query("Relationship");

	query.equalTo("fromUser",fromUserId);
	query.equalTo("toUser",toUserId);
	query.equalTo("isActive",true);
	query.equalTo("status",1);
	query.find({
	  success: function(result) {
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
	  },
	  error: function(result, error) {
	    alert('Failed to find object before destroy, with error code: ' + error.message);
	  }
	});
});



// 拒绝一个请求
Parse.Cloud.define("rejectRequest", function(request, response) {
	//当前用户id
    var fromUserId = request.params.userId;
    var toUserId = request.params.toUserId;

	var Relationship = Parse.Object.extend("Relationship");
	var relationship = new Relationship();

	relationship.set("fromUser",fromUserId);
	relationship.set("toUser",toUserId);
	relationship.set("isActive",false);
	relationship.set("status",2);
	 relationship.save(null, {
	  success: function(relationship) {
	    alert('New rejectRequest object created with objectId: ' + relationship.id);
	  },
	  error: function(relationship, error) {
	    alert('Failed to create new rejectRequest object, with error code: ' + error.message);
	  }
	});
});