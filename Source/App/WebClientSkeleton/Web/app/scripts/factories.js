app.factory('Student', [
    '$resource', function($resource) {
        var resource = $resource('http://localhost:49557//api//Student');
        return resource;
    }
]);