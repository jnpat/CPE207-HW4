document.querySelector('#contact-list').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // prevent default form submitting
  e.preventDefault();

  // get form values
  var siteName = document.querySelector('#name').value;
  var siteEmail = document.querySelector('#email').value;
  var sitePhone = document.querySelector('#phone').value;
  var siteGender = document.querySelector('#gender').value;
  var siteMessage = document.querySelector('#message').value;
  
  if (!validateForm(siteName, siteEmail, sitePhone, siteGender, siteMessage )) {
    return false;
  }

  var bookmark = {
    name: siteName,
    email: siteEmail,
    phone: sitePhone,
    gender: siteGender,
    message: siteMessage
  }

  console.log(bookmark);

  // // local storage test
  // localStorage.setItem('bookmarks',JSON.stringify(bookmark));
  // console.log(JSON.parse(localStorage.getItem('bookmarks')));

  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  
  // Clear fields
  document.querySelector('#name').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#phone').value = '';
  document.querySelector('#gender').value = '';
  document.querySelector('#message').value = '';

  fetchBookmarks();  
}

function deleteBookmark(name,email,phone,gender,message) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i=0; i<bookmarks.length; i++) {
    if (bookmarks[i].name === name && bookmarks[i].email === email && bookmarks[i].phone === phone && bookmarks[i].gender === gender && bookmarks[i].message === message)  {
      bookmarks.splice(i,1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.querySelector('#contact-show');

  bookmarksResults.innerHTML = '';

  var str = '<div class="card-deck text-center">';
  
  for (var i=0; i<bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var email = bookmarks[i].email;
    var phone = bookmarks[i].phone;
    var gender = bookmarks[i].gender;
    var message = bookmarks[i].message;


    str += '<table> '
        +`<tr>
        <th>Remove</th>
            <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Message</th>
                
        </tr>
        <tr>
        <th><a onclick="deleteBookmark('${name}','${email}','${phone}','${gender}','${message}')" class="btn btn-danger" href="#">Delete</a></th>
            <th>${name}</th>
            <th>${email}</th>
            <th>${phone}</th>
            <th>${gender}</th>
            <th>${message}</th>
        </tr>`

  }
  str += '</table>'

  bookmarksResults.innerHTML = str;
}

function validateForm(siteName, siteEmail, sitePhone, siteGender, siteMessage) {
  if (!siteName || !siteEmail || !sitePhone || !siteGender || !siteMessage) {
    alert('Please enter your contact');
    return false;
  }

  var expURL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regexURL = new RegExp(expURL);


  return true;
}