// import all required modules/libraries
const express = require("express");
const path = require("path");
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

const port = 3000;

// setup EJS Templete Engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.urlencoded());



// ********************

app.get('/', function(req,res){
        Contact.find({}, function(err, contacts){
            if (err) {
                console.log('Error in fetching contacts from DB');
                return;
            }
            return res.render('index', {
                title:"Contact List",
                contact_list: contacts
            });
        });      
    });


app.post('/create-contact', function(req,res){
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log('*****', newContact);
    });

    return res.redirect('back');
});

// for Deleting a contact
app.get('/delete-contact', function(req, res){

    // get the id from query in the url
    let id = req.query.id;

    // find the contact  in DB using id & delete

   
    Contact.findByIdAndDelete(id, function(err){
        if (err) {
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
 
    });

    
});

// ********************


app.listen(port, () => {
  console.log(`running on port ${port}
Run this URL on your Browser http://localhost:${port}`);
});
