This app uses angular.js.

It's possible to search, filter and modify annotation tags.

To modify the values in curly braces inside the 'text' fields of annotation tags,
single click the text containing the curly braces.

### Implementation notes
The app is composed of:

- extractTagModels service - creates a list of JS objects representing the annotation tags data passed
as argument to the service, which are sorted so that Clone Information tags appear first.

- annotationTags value - the original unprocessed annotation_tags data moved here from index.html
to make testing easier.

- editableBraces directive - enables clicking on text which contains curly braces and opens a modal
window with edit inputs for modifying the values in curly braces. After clicking 'Save' the tag model
data is updated.

- selectParent directive - enables selecting the parent's content of the element, excluding
the element itself.

- TagsController controller - the main controller which stores tags models data and calls the
extractTagModels service.

- ModalInstanceCtrl controller - controller which specifies modal window behavior.


### Installation
This app uses test tools which run under node - therefore it's necessary to have node and npm installed.
If node and npm are installed, execute:

$ npm install

This should create the directory node_modules and install the necessary tools there.
If problems occur it might help to manually and globally install the dependencies in package.json using
$ npm install -g [dependency]


### Running
It's possible to run it locally by opening index.html in the browser, or by executing

$ npm start

Which should run the http-server instance serving index.html on localhost:8000.


### Testing
For e2e tests:

The server must be running as well:

$ npm start

$ protractor test/e2e/protractor.conf.js

This should execute tests in test/e2e/scenarios.js

For unit tests:

$ karma start karma.conf.js

This should execute tests in test/unit/tagsSpec.js