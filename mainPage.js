var data;

function preload() {
    data = loadJSON('projects.json');
}

function setup() {
    for (var project of data.projects) {
        var li = createElement('li');
        li.parent('#projectsList');
        createA(`${project}/index.html`, project).parent(li);
    }
}
