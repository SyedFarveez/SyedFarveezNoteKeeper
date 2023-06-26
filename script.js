// Notekeeper App JavaScript

// Sample notes array
var notes = [{
        title: "Note 1",
        tagline: "Tagline 1",
        body: "Body 1",
        pinned: false
    },
    {
        title: "Note 2",
        tagline: "Tagline 2",
        body: "Body 2",
        pinned: true
    },
    // Add more note objects...
];

var currentPage = 1;
var itemsPerPage = 6;

// Event listener for add note button
document.getElementById("add-note-btn").addEventListener("click", function() {
    var titleInput = document.getElementById("note-title");
    var taglineInput = document.getElementById("note-tagline");
    var bodyInput = document.getElementById("note-body");

    var title = titleInput.value.trim();
    var tagline = taglineInput.value.trim();
    var body = bodyInput.value.trim();

    if (title !== "" && tagline !== "" && body !== "") {
        var newNote = {
            title: title,
            tagline: tagline,
            body: body,
            pinned: false
        };

        notes.push(newNote);
        displayNotes();

        titleInput.value = "";
        taglineInput.value = "";
        bodyInput.value = "";
    }
});

// Event listener for previous page button
document.getElementById("prev-page-btn").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        displayNotes();
    }
});

// Event listener for next page button
document.getElementById("next-page-btn").addEventListener("click", function() {
    var totalPages = Math.ceil(notes.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayNotes();
    }
});

// Function to display notes
function displayNotes() {
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var paginatedNotes = notes.slice(startIndex, endIndex);

    var notesGrid = document.getElementById("notes-grid");
    notesGrid.innerHTML = ""; // Clear existing notes

    // Sort notes based on pinned status
    var sortedNotes = paginatedNotes.sort(function(a, b) {
        if (a.pinned && !b.pinned) {
            return -1;
        } else if (!a.pinned && b.pinned) {
            return 1;
        } else {
            return 0;
        }
    });

    sortedNotes.forEach(function(note, index) {
        var noteCard = document.createElement("div");
        noteCard.className = "note-card";

        var titleElem = document.createElement("h3");
        titleElem.textContent = note.title;

        var taglineElem = document.createElement("p");
        taglineElem.textContent = note.tagline;

        var bodyElem = document.createElement("p");
        bodyElem.textContent = note.body;

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
            openEditModal(note, index);
        });

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteNote(index);
        });

        noteCard.appendChild(titleElem);
        noteCard.appendChild(taglineElem);
        noteCard.appendChild(bodyElem);
        noteCard.appendChild(editButton);
        noteCard.appendChild(deleteButton);
        notesGrid.appendChild(noteCard);
    });
}

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    displayNotes();
}

// Function to open the edit modal
function openEditModal(note, index) {
    var modal = document.getElementById("edit-note-modal");
    var titleInput = document.getElementById("edit-note-title");
    var taglineInput = document.getElementById("edit-note-tagline");
    var bodyInput = document.getElementById("edit-note-body");
    var updateButton = document.getElementById("update-note-btn");

    titleInput.value = note.title;
    taglineInput.value = note.tagline;
    bodyInput.value = note.body;

    updateButton.addEventListener("click", function() {
        var updatedTitle = titleInput.value.trim();
        var updatedTagline = taglineInput.value.trim();
        var updatedBody = bodyInput.value.trim();

        if (updatedTitle !== "" && updatedTagline !== "" && updatedBody !== "") {
            note.title = updatedTitle;
            note.tagline = updatedTagline;
            note.body = updatedBody;
            modal.style.display = "none";
            displayNotes();
        }
    });

    modal.style.display = "block";

    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Initial display of notes
displayNotes();
