document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const issueBoxes = document.querySelectorAll(".issue-box");
    
    searchBar.addEventListener("input", () => {
        const searchText = searchBar.value.toLowerCase();
        issueBoxes.forEach(box => {
            const text = box.innerText.toLowerCase();
            if (text.includes(searchText)) {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
        });
    });

    // Animations
    const boxes = document.querySelectorAll(".issue-box, .expandable-box");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });

    boxes.forEach(box => observer.observe(box));
});

function openChatbot() {
    alert("Chatbot feature will be integrated soon!");
}
