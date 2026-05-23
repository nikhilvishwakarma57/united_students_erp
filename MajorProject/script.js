// SAMPLE STUDENT DATA
const students = [
  {
    id: 1,
    name: "Rahul Verma",
    shortName: "rahul",
    course: "BCA 6th Sem",
    roll: "UIM2025BCA001",
    attendance: "92%",
    totalLectures: 120,
    present: 110,
    absent: 10,
    feesStatus: "Paid",
    marks: {
      midSem: 78,
      endSem: 82,
      assignment: 18
    },
    libraryFine: "Rs 0",
    email: "rahul.verma@example.com"
  },
  {
    id: 2,
    name: "Priya Singh",
    shortName: "priya",
    course: "BBA 4th Sem",
    roll: "UIM2025BBA014",
    attendance: "88%",
    totalLectures: 100,
    present: 88,
    absent: 12,
    feesStatus: "Pending (Last Installment)",
    marks: {
      midSem: 72,
      endSem: 80,
      assignment: 17
    },
    libraryFine: "Rs 50",
    email: "priya.singh@example.com"
  },
  {
    id: 3,
    name: "Aman Khan",
    shortName: "aman",
    course: "BCA 2nd Sem",
    roll: "UIM2025BCA045",
    attendance: "95%",
    totalLectures: 90,
    present: 86,
    absent: 4,
    feesStatus: "Paid",
    marks: {
      midSem: 85,
      endSem: 88,
      assignment: 19
    },
    libraryFine: "Rs 0",
    email: "aman.khan@example.com"
  }
];

// DOM elements (index.html ke liye)
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbot = document.querySelector(".chatbot");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.getElementById("chatbox");
const chatInput = document.getElementById("chat-input-text");
const sendBtn = document.getElementById("send-btn");

// Agar ye elements exist nahi karte (login page me), to event add mat karo
if (chatbotToggler && chatbot && closeBtn && chatbox && chatInput && sendBtn) {

  // CHATBOT OPEN/CLOSE
  chatbotToggler.addEventListener("click", () => {
    chatbot.classList.toggle("show");
  });

  closeBtn.addEventListener("click", () => {
    chatbot.classList.remove("show");
  });

  // ADD MESSAGE
  function addMessage(text, type = "incoming") {
    const li = document.createElement("li");
    li.classList.add("chat", type);

    if (type === "incoming") {
      const icon = document.createElement("span");
      icon.classList.add("material-symbols-outlined");
      icon.textContent = "smart_toy";
      li.appendChild(icon);
    }

    const p = document.createElement("p");
    p.textContent = text;
    li.appendChild(p);
    chatbox.appendChild(li);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // FIND STUDENT
  function findStudentByText(text) {
    const lower = text.toLowerCase().trim();
    return students.find(stu =>
      lower.includes(stu.shortName) ||
      lower.includes(stu.name.toLowerCase())
    );
  }

  // BUILD DETAIL
  function buildStudentDetail(stu) {
    return (
      `Name: ${stu.name}\n` +
      `Course: ${stu.course}\n` +
      `Roll No: ${stu.roll}\n` +
      `Attendance: ${stu.attendance} (Present ${stu.present}/${stu.totalLectures}, Absent ${stu.absent})\n` +
      `Fees Status: ${stu.feesStatus}\n` +
      `Marks → MidSem: ${stu.marks.midSem}, EndSem: ${stu.marks.endSem}, Assignment: ${stu.marks.assignment}\n` +
      `Library Fine: ${stu.libraryFine}\n` +
      `Email: ${stu.email}`
    );
  }

  // HANDLE USER INPUT
  function handleUserInput() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "outgoing");
    chatInput.value = "";

    const stu = findStudentByText(text);
    if (stu) {
      const detail = buildStudentDetail(stu);
      addMessage(detail, "incoming");
    } else {
      addMessage("Student not found. Try Rahul, Priya, or Aman.", "incoming");
    }
  }

  sendBtn.addEventListener("click", handleUserInput);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserInput();
    }
  });

  // CLICKABLE CARDS / ITEMS
  function attachCardClick(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", () => {
      chatbot.classList.add("show");
      addMessage(message, "incoming");
    });
  }

  attachCardClick("card-attendance", "This is overall attendance summary (demo).");
  attachCardClick("card-marks", "This shows your marks and exams (demo).");
  attachCardClick("card-fee", "This shows your fee details (demo).");
  attachCardClick("card-library", "This shows your library records (demo).");
  attachCardClick("panel-mission", "You opened Mission & Vision panel.");

  // Info list items
  document.querySelectorAll(".info-item").forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.dataset.key;
      chatbot.classList.add("show");
      addMessage(`You clicked on: ${key}`, "incoming");
    });
  });

  // CR panel icons
  document.querySelectorAll("#panel-cr .icon-link.clickable").forEach((icon) => {
    icon.addEventListener("click", () => {
      const sec = icon.dataset.section;
      chatbot.classList.add("show");
      addMessage(`Opening ${sec}... (demo)`, "incoming");
    });
  });

  // Interview questions icons
  document.querySelectorAll("#panel-interview .icon-link.clickable").forEach((icon) => {
    icon.addEventListener("click", () => {
      const topic = icon.dataset.topic;
      chatbot.classList.add("show");
      addMessage(`Infosys interview questions for ${topic.toUpperCase()} (demo).`, "incoming");
    });
  });

  // Notice Board tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const tabName = tab.dataset.tab;
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.add("hidden"));
      document.getElementById(tabName === "notice" ? "tab-notice" : "tab-dept")
        .classList.remove("hidden");
    });
  });
}
