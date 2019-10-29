# Rest-rekrutacja

This is an job interview RESTful API webservice
It can manages simple notes which are saved on local `psrest` database 

## Prerequisites

To run you need to install following applications:

 * [Node.js](https://nodejs.org/en/download/)
 * [Postman](https://www.getpostman.com/downloads/)
 * [MongoDB database](https://www.mongodb.com/download-center)


## Getting started

 Type `npm install` in main directory to install all dependencies described in package.json.

 Before start server database service needs to be run with command below.

 `sudo service mongod start`

 To start server type in terminal 

 `node app.js`.

 Use `http://localhost:5000/PS/notes` in Postman to manage operations on Notes.

 ## How to use Postman

 1. Type above localhost URL.
 2. To:
    * GetAllNotes: 
        1. Chose "GET"
        2. Click "Send"
    * GetNote:
        1. Chose "GET"
        2. Type note id  after "...ps/notes/"
        3. Click "Send"
    * CreateNote:
        1. Chose "POST"
        2. Go to "Body" tab
        3. Click on "x-www-form-urlencoded" radio button
        4. Type "title" and "content" field and "Key" column and fill it's values.
        5. press "Send"
    * DeleteNote:
        1. Chose "DELETE"
        2. Type note id  after "...ps/notes/"
        3. Click "Send"
    * UpdateNote:
        1. Chose "PUT"
        2. Type note id  after "...ps/notes/"
        3. Fill table fields as in CreateNote.3 paragraph.
        3. Click "Send"