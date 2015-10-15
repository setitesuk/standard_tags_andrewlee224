(function() {

var app = angular.module('tags', []);

var annotation_tags = { "annotation_tags": [
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
]};


app.controller('TagsController', function($scope) {
    console.log("tag_models in controller");
    console.log(tag_models);
    $scope.tags = tag_models;
    $scope.something = "something";
});

})();
