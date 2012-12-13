exports.test = function(req,res){
    res.render("test",{
        queryString : "select {[Measures].[fact], [Measures].[plan]} on columns, [Parameter].members on rows from geocube",
        connectionString : "jdbc:mondrian:Jdbc=jdbc:mysql://localhost/geocubes?user=root&password=123&useUnicode=true&characterEncoding=UTF-8;Catalog=/var/lib/tomcat6/webapps/mondrian/WEB-INF/queries/geolook_ab.xml;JdbcDrivers=org.mysql.Driver"
    });
}
