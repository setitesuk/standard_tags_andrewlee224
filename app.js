(function() {


var app = angular.module('tags', ['ui.bootstrap']);


app.directive('editableBraces', function($uibModal) {
    /**
     * This directive makes it possible to edit parts of text
     * enclosed in curly braces. When any part of the text is clicked,
     * a modal which contains editable inputs is opened.
     * After clicking 'Save' the underlying text model is updated with changes.
     */

    var splitTextByBraces = function(text) {
        /** split the text by '{' and '}'
        */
        console.log(text);
        all_splits = text.split(/[{}]/);

        return all_splits;
    };

    return {
        template: "<span ng-click='openModal()'><span>Text: {{ tagText }}</span></span>",
        restrict: 'AE',
        scope: {
            tagText: '='
        },
        link: function(scope, element) {
            console.log("in link");

            var injectNewValues = function(all_splits, input_values) {
                // update the splits with new values
                // and return the resulting string
                ret_string = "";
                all_splits.forEach(function(split, i) {
                    if (i % 2 != 0) {
                        ret_string += '{' + input_values[(i-1)/2] + '}';
                    } else {
                        ret_string += split;
                    }
                });

                return ret_string;
            };

            scope.openModal = function() {
                var all_splits = splitTextByBraces(scope.tagText);

                var num_inputs = (all_splits.length - 1) / 2;
                scope.input_values = [];
                for (var i = 0; i < num_inputs; i++) {
                    scope.input_values.push(all_splits[i*2 + 1]);
                }

                var modalInstance = $uibModal.open({
                    template: '<p ng-repeat="(i, input_value) in input_values track by i"><input ng-model="input_values[i]" /></p><p><button ng-click="ok()">Save</button></p>',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        items: function () {
                            return {
                                input_values: scope.input_values
                            };
                        }
                    }
                });

                modalInstance.result.then(
                    function(input_values) {
                        console.log(input_values);
                        input_values.forEach(function(val, i) {
                            input_values[i] = val.replace(/[{}]/g, ''); //braces not allowed in input
                        });
                        scope.tagText = injectNewValues(all_splits, input_values)
                    }, function() {
                        console.log("Dismiss");
                });
            };

        }
    }
});


app.directive('selectParent', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.on('click', function () {
                var selection = $window.getSelection();
                var range = document.createRange();

                range.selectNodeContents(element.parent()[0]);
                range.setEndBefore(element[0]);
                selection.removeAllRanges();
                selection.addRange(range);
            });
        }
    }
});


app.factory('extractTagModels', function() {

    var extractModels = function(tags_data) {
        var models = [];

        function tagModel() {
            this.type = {
                'clone_information': false,
                'feature': false
            };
            this.features = {
                'start_end': false,
                'single_clone_region': false,
                'sil_til': false,
                'repeat': false
            };
            this.text = null;
        };

        function line_truth_value(line) {
            // assumption that the format is consistent
            // and that 'X' is always the second character of the line
            // if it's present
            return (line[1] === 'X');
        };

        tags_data['annotation_tags'].forEach(
            function(entry) {
                var model = new tagModel();
                var lines = entry.split("\n");

                model.type.clone_information = line_truth_value(lines[1]);
                model.type.feature = line_truth_value(lines[2]);

                model.features.start_end = line_truth_value(lines[4]);
                model.features.single_clone_region = line_truth_value(lines[5]);
                model.features.sil_til = line_truth_value(lines[6]);
                model.features.repeat = line_truth_value(lines[7]);

                if (lines.length > 8) model.text = lines[9];

                models.push(model);
            }
        );

        models.sort(function(a, b) {
            if (a.type.clone_information && !b.type.clone_information) return -1;
            if (b.type.clone_information && !a.type.clone_information) return 1;
            return 0;
        });

        return models;
    };

    return extractModels;
});


app.controller('TagsController',
        ['$scope', 'extractTagModels', 'annotationTags',
        function($scope, extractTagModels, annotationTags) {

    $scope.tags = extractTagModels(annotationTags);

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
}]);


app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.input_values = items.input_values;

    $scope.ok = function() {
        $modalInstance.close($scope.input_values);
    };

    $scope.cancel = function() {
        $modalInstance.close();
    };
});


app.value('annotationTags',
{ "annotation_tags": [
'Type:\n[X] Clone Information\n[ ] Feature\nFeatures:\n[X] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:\nThis is the start of sequence clone {clone name}.',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[X] Repeat\nText:\nThis repeat is of Type {repeat type}. It has a length of {x}bp.',

'Type:\n[X] Clone Information\n[ ] Feature\nFeatures:\n[X] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:\nThis is the end of sequence clone {clone name}.',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[X] SIL/TIL\n[ ] Repeat\nText:\nM13 Short Insert Library of pUC {puc name}.',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[X] SIL/TIL\n[ ] Repeat\nText:\npUC Short Insert Library of pUC {puc name}',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[X] SIL/TIL\n[ ] Repeat\nText:\nTransposon Insertion Library of pUC {puc name}',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[X] Repeat\nText:\nMissing data. {x}bp of repeat Type {repeat type}.',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[X] Repeat\nText:\nALU repeat of length {x}bp',

'Type:\n[X] Clone Information\n[ ] Feature\nFeatures:\n[ ] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:\nSequence clone length {x}bp'
]})

})();
