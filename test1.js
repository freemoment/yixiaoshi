
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