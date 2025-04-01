(function () {
  if (document.getElementById("tax-viewer-widget")) return; // Prevent duplicate widgets

  let widget = document.createElement("div");
  widget.id = "tax-viewer-widget";
  widget.innerHTML = `
        <div id="tax-viewer-header">Tax Details Viewer</div>
        <div id="tax-viewer-content">Click Fetch Data to load details...</div>
        <button id="fetchTaxData">Fetch Data</button>
    `;

  document.body.appendChild(widget);

  // Fetch data when the button is clicked
  document.getElementById("fetchTaxData").addEventListener("click", () => {
    document.getElementById("tax-viewer-content").innerText =
      "Fetching data...";
    // Simulate fetching data
    setTimeout(() => {
      document.getElementById("tax-viewer-content").innerText =
        "Tax details loaded!";
    }, 2000);
  });

  // Make the widget draggable
  let isDragging = false,
    offsetX,
    offsetY;
  document
    .getElementById("tax-viewer-header")
    .addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - widget.getBoundingClientRect().left;
      offsetY = e.clientY - widget.getBoundingClientRect().top;
    });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      widget.style.left = `${e.clientX - offsetX}px`;
      widget.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
})();


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "fillForm") {
//     let form = document.getElementById("taxForm");
//     if (form) {
//       document.getElementById("name").value = request.data.name;
//       document.getElementById("taxID").value = request.data.taxID;
//       document.getElementById("income").value = request.data.income;
//       document.getElementById("taxAmount").value = request.data.taxAmount;
//       document.getElementById("status").value = request.data.status;
//     }
//   }
// });



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillForm" && message.data) {
    let data = message.data;

    console.log("Received data:", data); // Debugging log

    // Ensure fields exist before setting values
    function setValue(selector, value) {
      let field = document.querySelector(selector);
      if (field) {
        field.value = value;
      } else {
        console.warn(`Field ${selector} not found!`);
      }
    }

    setValue("#employerName", data.employerName);
    setValue("#employerTAN", data.employerTAN);
    setValue("#employerPAN", data.employerPAN);
    setValue("#employeeName", data.employeeName);
    setValue("#employeePAN", data.employeePAN);
    setValue("#assessmentYear", data.assessmentYear);
    setValue("#grossSalary", data.grossSalary);
    setValue("#taxableIncome", data.taxableIncome);
    setValue("#totalTaxDeducted", data.totalTaxDeducted);
    setValue("#totalTaxDeposited", data.totalTaxDeposited);
  }
});







let style = document.createElement("style");
style.innerHTML = `
    #tax-viewer-widget {
        position: fixed;
        bottom: 50px;
        right: 50px;
        width: 250px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 10px;
        font-family: Arial, sans-serif;
        z-index: 9999;
    }
    #tax-viewer-header {
        background: #007bff;
        color: white;
        padding: 10px;
        border-radius: 10px 10px 0 0;
        cursor: grab;
        text-align: center;
    }
    #fetchTaxData {
        width: 100%;
        background: #007bff;
        color: white;
        border: none;
        padding: 8px;
        margin-top: 10px;
        cursor: pointer;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);
