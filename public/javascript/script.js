let count = 0;
function index() {
    input("formname",/[a-zA-Z]+\s[a-zA-Z]+/, 3, "skickaKnapp");
    input("formemail",/\S+\@\S+\.\S+/,3, "skickaKnapp");
    input("formcomment",/[a-zA-Z]+/,3, "skickaKnapp");
    renderJsonData();
}

function register() {
    input("usrName",/[a-zA-Z]{3,20}/, 2, "registerKnapp");
    input("usrPassword",/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[&%$]).{4,8}$/, 2, "registerKnapp");
}


function input(nameOfId, regEx, numberOfFields, nameOfSubmit) {
        document.getElementById(nameOfId).addEventListener("change",function(event)
    {
        const check = regEx.test(event.target.value);
        if (!check)
        {
            document.getElementById(nameOfId).style.backgroundColor = "#e3826d";
            if (count === numberOfFields) {
                count--;
            }

        }
        if (check)
        {
            document.getElementById(nameOfId).style.backgroundColor = "white";
            count++;
            console.log(count);
        }

        if (count === numberOfFields) {
            document.getElementById(nameOfSubmit).removeAttribute("disabled");
        }
        else {
            document.getElementById(nameOfSubmit).setAttribute("disabled","true");
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
    

