function index() {
    input("formname",/[a-zA-Z]+\s[a-zA-Z]+/);
    input("formemail",/\S+\@\S+\.\S+/);
    input("formcomment",/[a-zA-Z]+/);
    renderJsonData();
}

function register() {
    input("usrName",/[a-zA-Z]{3,20}/);
    input("usrPassword",/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[&%$]).{4,8}$/);
}


function input(nameOfId, regEx) {
        document.getElementById(nameOfId).addEventListener("change",function(event)
    {
        const check = regEx.test(event.target.value);
        if (!check)
        {
            document.getElementById(nameOfId).style.backgroundColor = "#e3826d";
            return false;
        }
        if (check)
        {
            document.getElementById(nameOfId).style.backgroundColor = "white";
            return true;
        }

    });
}


function renderJsonData() {
 
    const request = new XMLHttpRequest();

    request.open('GET',"../../json/posts.json", true);
    request.onload = function () {
        const data = JSON.parse(this.response);
        
        for(let i = data.length-1; i >=0; i--) {
            const bundleContainer = document.createElement("div");
            bundleContainer.setAttribute("class","bundleContainer");

            const infoContainer = document.createElement("div");
            infoContainer.setAttribute("class","infoContainer");

            const postName = document.createElement("p");
            postName.setAttribute("class","postName");
            postName.innerHTML = data[i].name;

            const postEmail = document.createElement("p");
            postEmail.setAttribute("class", "postEmail");
            postEmail.innerHTML = data[i].email;

            const postTime = document.createElement("p");
            postTime.setAttribute("class", "postTime");
            postTime.innerHTML = data[i].time;

            const postContainer = document.createElement("div");
            postContainer.setAttribute("class","postContainer");

            const postComment = document.createElement("p");
            postComment.setAttribute("class", "postComment");
            postComment.innerHTML = data[i].comment;

            postsContainer.appendChild(bundleContainer)
            bundleContainer.appendChild(infoContainer);
            infoContainer.appendChild(postTime);
            infoContainer.appendChild(postName);
            infoContainer.appendChild(postEmail);
            bundleContainer.appendChild(postContainer);
            postContainer.appendChild(postComment);
        }
    
    };
    request.send();
}
    

