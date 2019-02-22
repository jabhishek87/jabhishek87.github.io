$(document).ready(function() {
    $.get('sahayak/personal_data.yaml').done(function (data) {
        console.log('File load complete');
        JsonData = jsyaml.load(data)
        //console.log(JsonData);
        // Replace with dynameic value
        $('#first_name').text(JsonData.first_name);
        $('#last_name').text(JsonData.last_name);
        $('#physical_address').text(JsonData.physical_address);
        $('#email_address').text(JsonData.email_address);
        $("#email_address").attr("href", "mailto:" + JsonData.email_address);
        $('#dy_fullname').text(JsonData.first_name + " " + JsonData.last_name);

        $("#summary").text(JsonData.summary);

        //experience block
        var experience_template = $("#experience-template").html();
        $.each(JsonData.experience, function( index, value ) {
            $.tmpl(experience_template, {"data": value}).appendTo("#dy_experience");
        });

        //education block
        var experience_template = $("#education-template").html();
        $.each(JsonData.education, function( index, value ) {
            $.tmpl(experience_template, {"data": value}).appendTo("#dy_education");
        });

        //skills block $.parseHTML( str ),
        var experience_template = $("#skills-template").html();
        $.each(JsonData.skills, function( index, value ) {
            $.tmpl(experience_template, {"skill": value}).appendTo("#dy_skills");
        });

        //awards block
        var experience_template = $("#awards-template").html();
        $.each(JsonData.achievements, function( index, value ) {
            $.tmpl(experience_template, {"award": value}).appendTo("#dy_awards");
        });

        //social links block
        var experience_template = $("#social-template").html();
        $.each(JsonData.social_accounts, function( index, value ) {
            $.tmpl(experience_template, {"social_account": value}).appendTo("#dy_social");
        });
    });



    // Portfolio Datatable Block
    $.get('sahayak/repo_data.yaml').done(function (data) {
        RepoData = jsyaml.load(data);
        console.log(RepoData);

        //Load  datatable
        var oTblPortfolio = $("#tbl_portfolio");

        oTblPortfolio.DataTable ({
            //"pageLength": 50,
            "data" : RepoData.data,
            "columns" : [
                { "data" : "repo_full_name" },
                { "data" : "repo_description" },
                {
                    "data": "repo_url",
                    "render": function(data, type, row, meta){
                        if(type === 'display'){
                            data = '<a href="' + data + '">' + data + '</a>';
                        }
                        return data;
                    }
                },
                { "data" : "repo_readme" }
            ],
            "columnDefs": [{
                "targets": [ 3 ],
                "visible": false,
                "searchable": true
            }]
        });

    });

});

// (function($) {
//     "use strict"; // Start of use strict

//   })(jQuery); // End of use strict