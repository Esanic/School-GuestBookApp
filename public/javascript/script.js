function regex() {

}


function renderJsonData() {
 
    var request = new XMLHttpRequest();

    request.open('GET',"../../json/posts.json", true);
    request.onload = function () {
        let data = JSON.parse(this.response);
        
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
    

