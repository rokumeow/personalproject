/**
 * IndexDB setup and control
 * @author Lixiao
 * @exception IOException
 * @version v1.0
 */

const DB_NAME = 'StoryDB';
const DB_VERSION = 1;
const DB_STORY_NAME = 'Story';
const DB_EVENT_NAME = 'Event';
const DB_COMMENT_NAME = 'Comment';

var db;

function initDB() {
    if('indexedDB' in window){
        //initDB();
        console.log("initDB finished");
    }else{
        console.log("not have indexedDB");
        return;
    }
    console.log('initDB...');
    var req =  window.indexedDB.open(DB_NAME,DB_VERSION);
    req.onsuccess = function (evt) {
        db = this.result;
        console.log('indexDB DONE');
    };
    req.onerror = function (evt) {
        console.log("INDEXEDDB:",evt.currentTarget.error.message);
    };
    req.onupgradeneeded = function (evt) {
        var db = evt.target.result;
        if (!db.objectStoreNames.contains(DB_STORY_NAME)) {
            var store = db.createObjectStore(
                DB_STORY_NAME, {keyPath: 'StoryID', autoIncrement: true}
            );

            store.createIndex('title', 'title', {unique: false});
            store.createIndex('date', 'date', {unique: false});
            store.createIndex('author','author',{unique:false});
            store.createIndex('description', 'description', {unique: false});
            store.createIndex('image', 'image', {unique: false});
            store.createIndex('camera', 'camera', {unique: false})
        }
        if(!db.objectStoreNames.contains(DB_EVENT_NAME)){
            var store = db.createObjectStore(
                DB_EVENT_NAME,{keyPath: 'EventID', autoIncrement: true});

            store.createIndex('title', 'title', {unique: false});
            store.createIndex('date', 'date', {unique: false});
            store.createIndex('author','author',{unique:false});
            store.createIndex('description', 'description', {unique: false});
            store.createIndex('Lat', 'Lat', {unique: false});
            store.createIndex('Lng', 'Lng', {unique: false});
            store.createIndex('image', 'image', {unique: false})
        }
        if(!db.objectStoreNames.contains(DB_COMMENT_NAME)){
            var store = db.createObjectStore(
                DB_COMMENT_NAME,{keyPath: 'CommentID', autoIncrement: true});

            store.createIndex('title', 'title', {unique: false});
            store.createIndex('name', 'name', {unique: false});
            store.createIndex('comment', 'comment', {unique: false});
        }
    }
}

function addStory(title,date,author,description,file) {
    if(!db){
        console.error('addStory: the db is not initialized');
        return;
    }
    var tx = db.transaction(DB_STORY_NAME,'readwrite');
    console.log(tx);
    var store = tx.objectStore(DB_STORY_NAME);
    var req = store.add({title:title,date:date,author:author,description:description,file:file});
    req.onsuccess = function (evt) {
        console.log('add in db successful')
    };
    req.onerror = function () {
        console.log('add error',this.error);
    };
}

function addEvent(title,date,author,description,Lat,Lng,image) {
    if(!db){
        console.error('addStory: the db is not initialized');
        return;
    }
    var tx = db.transaction(DB_EVENT_NAME,'readwrite');
    console.log(tx);
    var store = tx.objectStore(DB_EVENT_NAME);
    var req = store.add({title:title,date:date,author:author,description:description,Lat:Lat,Lng:Lng,image:image});
    req.onsuccess = function (evt) {
        console.log('add in db successful')
    };
    req.onerror = function () {
        console.log('add error',this.error);
    };
}

function addComment(title,name,comment) {
    if(!db){
        console.error('addStory: the db is not initialized');
        return;
    }
    var tx = db.transaction(DB_COMMENT_NAME,'readwrite');
    console.log(tx);
    var store = tx.objectStore(DB_COMMENT_NAME);
    var req = store.add({title:title,name:name,comment:comment});
    req.onsuccess = function (evt) {
        console.log('add in db successful')
    };
    req.onerror = function () {
        console.log('add error',this.error);
    };
}

function StoryputinDB() {
    var title = $('#blog_title').val();
    console.log(title);
    var date = $('#blog_date').val();
    var author =  $('#blog_author').val();
    var description = $('#blog_description').val();
    var image = $('#fromfile')[0].files[0];
    console.log(image);
    if(image){
        addStory(title,date,author,description,image);
    }else{
        addStory(title,date,author,description);
    }
    console.log('add finished');

    //post data to router
    // var Story = {title:title,date:date,description:description,file:window.URL.createObjectURL(file)};
    // $.ajax({
    //     url : '/createblog',
    //     type : 'post',
    //     data: JSON.stringify(Story),
    //     contentType: "application/json",
    //     success: function (dataR) {
    //         // no need to JSON parse the result, as we are using
    //         // dataType:json, so JQuery knows it and unpacks the
    //         // object for us before returning it
    //         // in order to have the object printed by alert
    //         // we need to JSON stringify the object
    //         alert("The image and Story have been uploaded successfully");
    //     },
    //     error: function (xhr, status, error) {
    //         alert('Error: ' + error.message);
    //     }
    // });
}

function EventputinDB() {
    var title = $('#event_title').val();
    // console.log(title);
    var date = $('#event_date').val();
    var author =  $('#event_author').val();
    console.log(author);
    var description = $('#event_description').val();
    var image = $('#fromfile')[0].files[0];
    console.log(image);
    var Lat = $('#event_Lat').val();
    var Lng = $('#event_Lng').val();
    if(image){
        addEvent(title,date,author,description,Lat,Lng,image)
    }else{
        addEvent(title,date,author,description, Lat,Lng);
    }
    console.log('add finished');


    // var Event = {title:title,date:date,description:description,file:window.URL.createObjectURL(file)};
    // $.ajax({
    //     url : '/createvent',
    //     type : 'post',
    //     data: JSON.stringify(Event),
    //     contentType: "application/json",
    //     success: function (dataR) {
    //         // no need to JSON parse the result, as we are using
    //         // dataType:json, so JQuery knows it and unpacks the
    //         // object for us before returning it
    //         // in order to have the object printed by alert
    //         // we need to JSON stringify the object
    //         alert("The event have been uploaded successfully");
    //     },
    //     error: function (xhr, status, error) {
    //         alert('Error: ' + error.message);
    //     }
    // });
}

function CommentputinDB() {
    var title = $('#comment_title').val();
    // console.log(title);
    var name = $('#comment_name').val();
    var comment = $('#comment_content').val();
    console.log('add finished');
    addComment(title,name,comment);
    // var Comment = {comment_title:title,comment_name:name,comment_content:comment};
    // $.ajax({
    //     url : '/singleevent',
    //     type : 'post',
    //     data: JSON.stringify(Comment),
    //     contentType: "application/json",
    //     success: function (dataR) {
    //         // no need to JSON parse the result, as we are using
    //         // dataType:json, so JQuery knows it and unpacks the
    //         // object for us before returning it
    //         // in order to have the object printed by alert
    //         // we need to JSON stringify the object
    //         alert("Your comment have been uploaded successfully");
    //     },
    //     error: function (xhr, status, error) {
    //         alert('Error: ' + error.message);
    //     }
    // });
}