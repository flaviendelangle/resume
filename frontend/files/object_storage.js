
WeDesign.constant('CouchDB', {
    objectDB    : 'objects/',
    replayDB    : 'replays/',
    uuids       : '_uuids'
});

WeDesign.service('object_storage', [
    '$window',
    '$http',
    '$rootScope',
    'servers',
    'CouchDB',
    'session',
    'API',
    'thumbnails',
    'dialog',
    'app_state',
    function($window,$http,$rootScope,servers,CouchDB,session,API,thumbnails,dialog,app_state){

        var that = this;

        this.localStorage = {
            key         : 'current_project',
            interval    : 2  
        };


        // RETRIEVE OF THE OBJECT (EDITOR MODE)

        this.loadObject = function(callback, callbackArg) {
            if(!that.isViewerMode()) {
                if(mainModel.getAllSons().length > 0)  {
                    removeAll();
                }
                that.addLog('Start loading the object');
                if(session.isLogged()) {
                    if(that.isProjectLinkedToDjango()) {
                        that.projetVersionManager();
                    }
                    else {
                        that.saveOnServer();
                    }
                }
                else {
                    that.putLocalProjectOnDesigner();
                }
            }
        };

        this.projetVersionManager = function() {
            var storage_ID = that.getLocalKey('_id'),
                id = that.getLocalKey('API_id'),
                requestProperties = {
                    method : 'GET',
                    url : servers.django + API.projects + id + '/update/',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' :  session.getTokenType() + " " + session.getToken()
                    }
                },
                sCallback = function(response) {
                    $rootScope.$broadcast("public_object",response.data.public);
                    if(!response.data.is_last_user) {
                        $rootScope.$broadcast("show_alert_load_object");
                    }
                    else if(response.data.last_version_user != that.getObjectVersion()) {
                        that.getLastVersionUser();
                    }
                    else {
                        that.putLocalProjectOnDesigner();
                    }
                },
                eCallback = function(){
                    that.newProject();    
                };
            that.request(requestProperties, sCallback, eCallback);
        };

        this.getLastVersionUser = function(sCallback) {
            that.addLog('Get last version of the project created by this user');
            var storage_ID = that.getLocalKey('_id'),
                requestProperties = {
                    method : 'GET',
                    url : servers.couchdb + CouchDB.objectDB + storage_ID,
                };
            if(typeof sCallback == 'undefined') {
                sCallback = function(response) {
                    that.setLocalProject(response.data);
                    that.putLocalProjectOnDesigner();
                };
            }
            that.request(requestProperties, sCallback, that.error);
        };

        this.getLastVersionProject = function() {
            that.addLog('Get last version of the project');
            var id = that.getLocalKey('API_id'),
                requestProperties = {
                    method : 'GET',
                    url : servers.django + API.projects + id + '/content/?get_last=true',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' :  session.getTokenType() + " " + session.getToken()
                    }
                },
                sCallback = function(response) {
                    that.setLocalKey('ObjectMP5', response.data.ObjectMP5);
                    that.putLocalProjectOnDesigner();
                };
            that.request(requestProperties, sCallback, that.error);
        };

        this.putLocalProjectOnDesigner = function() {
            removeAll();
            var object = that.getCacheObject();
            loadTreeFromDict(object.root, function() {
                stateList = that.getStateList();
                if(stateList.length > 0) {
                    var action = new Action('LoadTreeFromJson', [], [0]);
                    pushState(mainModel.root.getDict1(), action);
                }
                that.initSaveObject();
                if(session.isLogged()) {
                    $rootScope.$broadcast("open_room", false, false);
                }
            });
        };



        // STORAGE ON COUCHDB

        this.saveOnServer = function(showPopUp){
            //that.setLocalKey('_rev', '9-qskkkfjffpjfpf');
            this.showObjectPopUp = showPopUp;
            if(!session.isLogged()) {
                that.addLog('Save failure : User not connected');
            }
            else if(app_state.is_allowed_to_interact()) {
                var requestProperties = {
                        method : 'PUT',
                        url : servers.couchdb + CouchDB.objectDB,
                        data : that.getLocalProject(true)
                };
                if(that.isProjectLinkedToDjango() && requestProperties.data._id) {
                    requestProperties.url += requestProperties.data._id;
                    that.request(requestProperties, that.createdOnServer, that.creationOnServerError);
                }
                else {
                    that.createStorageID(requestProperties, that.createdOnServer, that.creationOnServerError);
                }
            }
        };

        this.createdOnServer = function(response) {
            if(that.getLocalKey('API_id') && that.showObjectPopUp){
                this.showObjectPopUp=false;
                var objecturl = servers.django + API.object_routing + that.getLocalKey('API_id');
                dialog.custom("src/partial_html/alerts/alert_replay_obj_url.html", {
                    url     : objecturl,
                    type    : "project"
                });
            }
            
            $window.projectModifiedState.resetModifiedState2Saved($window.getTimestampUTC());
            var version = response.data.rev.split('-')[0];
            that.setLocalKeys({
                _id     : response.data.id,
                _rev    : response.data.rev
            });
            if(version == 1 || !that.getLocalKey('API_id')) {
                that.saveOnDjango(response.data.id);
            }            
        };

        this.creationOnServerError = function(response) {
            if(response.status == 409 && response.data.reason == 'Document update conflict.') {
                if(that.first_save_sinse_login) {
                    that.getLastVersionUser(function(response) {
                        console.log(response);
                    });
                }
                else {
                    that.getLastVersionUser();
                }
            }
            else if(response.status==403){
                that.forkProject(name);
            }
        };

        this.createStorageID = function(requestProperties_temp, sCallback_temp, eCallback_temp){
            var requestProperties = {
                    method : 'GET',
                    url : servers.couchdb + CouchDB.uuids
                },
                sCallback = function(response) {
                    requestProperties_temp.url += response.data.uuids[0];
                    that.request(requestProperties_temp, sCallback_temp, eCallback_temp);
                };
           that.request(requestProperties, sCallback, eCallback_temp);
        };



        // STORAGE ON DJANGO

        this.saveOnDjango = function(storage_ID){
            var image = thumbnails.create(),
                requestProperties = {
                    method : 'POST',
                    url : servers.django + API.projects,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' :  session.getTokenType() + " " + session.getToken()
                    },
                    data : {
                        title               : that.getName(),
                        user                : session.getID(),
                        storage_ID          : storage_ID,
                        parent_object_ID    : that.getLocalKey('parent_object_ID'),
                        thumbnail           : JSON.stringify(image)
                    }
                },
                sCallback = function(response) {
                    that.setLocalKey('API_id', response.data.id);
                    $rootScope.$broadcast("open_room", false, false);
                },
                eCallback = function(response){
                    console.log(response);
                };
            that.request(requestProperties, sCallback, eCallback);
        };


        this.getName = function() {
            var name = that.getLocalKey('name');
            return name ? name : that.generateName();
        };



        // LOCAL STORAGE ------------------------

        this.getLocalProject = function(update) {
            if(update) {
                that.saveObject();
            }
            var project = localStorage.getItem(that.localStorage.key);
            if(project!==null && project!=="null") {
                try {
                    project = JSON.parse(project);
                }
                catch(e) {
                    project = that.createLocalProject();
                }
            }
            else {
                project = that.createLocalProject();
            }
            return project;
        };

        this.createLocalProject = function() {
            that.addLog('Create a new project in local storage');
            var project = {
                ObjectMP5 : that.getLiveObject(),
                last_update : new Date().getTime(),
                creator : session.getUserName(),
                name : that.generateName(),
                _rev : undefined,
                _id : undefined
            };
            that.setLocalProject(project);
            return project;
        };

        this.setLocalProject = function(project) {
            that.addLog('Update the local storage');
            localStorage.setItem(that.localStorage.key, JSON.stringify(project));
        };

        this.deleteLocalProject = function() {
            localStorage.removeItem(that.localStorage.key);
        };

        this.setLocalKey = function(key, value) {
            var project = that.getLocalProject();
            project[key] = value;
            if(key == 'ObjectMP5') {
                project.last_update = new Date().getTime();
            }
            that.setLocalProject(project);
        };

        this.setLocalKeys = function(dict) {
            var project = that.getLocalProject();
            for(var key in dict) {
                project[key] = dict[key];
            }
            that.setLocalProject(project);
        };

        this.getLocalKey = function(key) {
            var project = that.getLocalProject();
            if(key in project) {
                return project[key];
            }
            return undefined;
        };

        this.getObjectVersion = function() {
            return that.getLocalKey('_rev').split('-')[0];
        };


        this.getCacheObject = function() {
            return that.getLocalKey('ObjectMP5');
        };


        // LIVE OBJECT MANAGEMENT

        this.getLiveObject = function() {
            return $window.mainModel.getDict();
        };

        this.getLiveObjectJSON = function() {
            return JSON.stringify(that.getLiveObject());
        };

        this.saveObject = function() {
            that.addLog('Save object in local storage');
            var object = that.getLiveObject();
            that.setLocalKey('ObjectMP5', object);
            that.saveStateList();
        };


        // GENERIC FUNCTIONS
        this.request = function(requestProperties,sCallback,eCallback){
            requestProperties.skipAuthorization = true;
            $http(requestProperties).then(function successCallback(response) {
                sCallback(response);
            }, function errorCallback(response) {
                eCallback(response);
            });
        };

    }
]);


