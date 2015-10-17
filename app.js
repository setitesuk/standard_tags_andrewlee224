(function() {

var app = angular.module('tags', []);

app.directive('editableBraces', function() {

    var splitTextByBraces = function(text) {
        // split the text by '{' and '}' and
        // create input fields for values inside braces
        console.log(text);
        var left_splits = text.split('{');
        var all_splits = [];
        left_splits.forEach(function(split) {
            var splits = split.split('}');
            all_splits = all_splits.concat(splits);
        });

        return all_splits;
    };

    return {
        restrict: 'AE',
        scope: {
            tagModel: '='
        },
        link: function(scope, element) {
            console.log("in link");
            element.bind('click', function(e) {
                console.log("in click");
                // split the text by '{' and '}' and
                // create input fields for values inside braces
                console.log(element);
                var all_splits = splitTextByBraces(element.text());

                var num_inputs = (all_splits.length - 1) / 2;
                scope.input_values = [];
                for (var i = 0; i < num_inputs; i++) {
                    scope.input_values.push(all_splits[i*2 + 1]);
                }

                console.log(scope.input_values);

                var input_elems = [];
                var wrapper = angular.element("<span></span>");
                all_splits.forEach(function(split, i) {
                    if (i % 2 !== 0) {
                        // create and append input box
                        var input = angular.element("<input />");
                        input.val(split);
                        wrapper.append(input);
                    } else {
                        // append just text
                        wrapper.append(split);
                    }
                });

                element.replaceWith(wrapper);
                element.class(".tag-selected");

            });


            element.bind('blur', function(e) {
                element.text(scope.tag-model.text);
            });
        }
    }
});

app.directive('doNothing', function() {
    console.log("registering directive");
    var link = function(scope, elem, attrs) {
        console.log("in doNothing link");
    };

    return {
        restrict: 'E',
        link: link
    }
});

app.controller('TagsController', function($scope) {
    console.log("tag_models in controller");
    console.log(tag_models);
    $scope.tags = tag_models;
    $scope.something = "something";

    $scope.filter_tags = function(tag_model) {
        var types = ["clone_information", "feature"];
        var features = ["start_end", "single_clone_region", "sil_til", "repeat"];

        var found = true;
        types.forEach(function(type) {
            if ($scope[type] === true && !tag_model.type[type]) {
                found = false;
                return;
            }
        });

        features.forEach(function(feature) {
            if ($scope[feature] === true && !tag_model.features[feature]) {
                found = false;
                return;
            }
        });

        return found;

    };
});

})();
