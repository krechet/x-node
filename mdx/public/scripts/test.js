$(function(){
}); 

process = function(){
    
    $.ajax({
        type: "POST",
        url: "/execute",
        data: {
            queryString: $('#qs').val(), 
            connectionString: $('#cs').val()
        }
        , dataType: "json"

    }).done(function( res ) {
        $('#code').html('<code class="brush:js">'+JSON.stringify(res)+'</code>');
        SyntaxHighlighter.all();
    });
  
   
}

loadSample = function(id){
    var samples = [
        {
            qs : "select {[Measures].[fact], [Measures].[plan]} on columns, [Parameter].members on rows from geocube",
            cs : "jdbc:mondrian:Jdbc=jdbc:mysql://localhost/geocubes?user=root&password=123&useUnicode=true&characterEncoding=UTF-8;Catalog=/var/lib/tomcat6/webapps/mondrian/WEB-INF/queries/geolook_ab.xml;JdbcDrivers=org.mysql.Driver"
        },
        {
            qs : "select   CrossJoin(     {[Measures].[Unit Sales], [Measures].[Store Sales]},     {[Time].[1997].[Q2].children}) on columns,    CrossJoin(     CrossJoin(       [Gender].members,       [Marital Status].members),    {[Store], [Store].children}) on rows from [Sales] where (  [Product].[Food],  [Education Level].[High School Degree],  [Promotions].DefaultMember)",
            cs : "jdbc:mondrian:Jdbc=jdbc:postgresql://localhost/mondrian;JdbcUser=root;JdbcPassword=123;Catalog=/var/lib/tomcat6/webapps/mondrian/WEB-INF/queries/FoodMart.xml;JdbcDrivers=org.postgresql.Driver"
        },
    ];
    
    $('#cs').val(samples[id].cs);
    $('#qs').val(samples[id].qs);
}

