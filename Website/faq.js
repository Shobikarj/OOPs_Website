document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to enroll buttons
    document.querySelectorAll('.enroll-button').forEach(button => {
        button.addEventListener('click', () => {
            const courseTitle = button.parentElement.querySelector('h2').textContent;
            showModal(courseTitle); // Display modal for the clicked course
        });
    });

    // Add click event listeners to FAQ questions
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', event => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-question').forEach(innerItem => {
                innerItem.classList.remove('active');
            });
            document.querySelectorAll('.faq-answer').forEach(answer => {
                answer.style.display = 'none';
            });

            if (!isActive) {
                item.classList.add('active');
                item.nextElementSibling.style.display = 'block';
            }
        });
    });
});

function showModal(courseTitle) {
    var modal = document.getElementById("enrollModal");
    modal.style.display = "block";
    document.getElementById("courseTitle").value = courseTitle;
    // Add blur effect to background
    document.body.classList.add('modal-open');
}

function closeModal() {
    var modal = document.getElementById("enrollModal");
    modal.style.display = "none";
    // Remove blur effect from background
    document.body.classList.remove('modal-open');
}

function closeSuccessMessage() {
    var successMessage = document.getElementById("successMessage");
    successMessage.style.display = "none";
    // Remove blur effect from background
    document.body.classList.remove('modal-open');
}

function enrollCourse(event) {
    event.preventDefault();
    var courseTitle = document.getElementById("courseTitle").value;
    var enrolledCourseTitle = document.getElementById("enrolledCourseTitle");
    enrolledCourseTitle.textContent = courseTitle;
    var successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";
    // Hide modal after enrollment
    closeModal();

    
}

function goToCourse() {
    // Implement redirection to the enrolled course modules page
    var enrolledCourseTitle = document.getElementById("enrolledCourseTitle").textContent;
    if (enrolledCourseTitle === 'OOPs in Java') {
        window.location.href = "course_modules.html";
    } else if (enrolledCourseTitle === 'OOPs in C++') {
        window.location.href = "course_modules1.html";
    }
}
