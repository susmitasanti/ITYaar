// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("fetchData").addEventListener("click", fetchData);
// });

// async function fetchData() {
//   const apiUrl = "https://api.npoint.io/b8284c9a519839726fa1";
//   const dataContainer = document.getElementById("data-container");

//   if (!dataContainer) {
//     console.error("Error: 'data-container' element not found.");
//     return;
//   }

//   dataContainer.innerHTML = ""; // Clear previous data

//   try {
//     const res = await fetch(apiUrl);
//     const data = await res.json();

//     if (data) {
//       const structuredData = displayJson(data);
//       dataContainer.appendChild(structuredData);
//     } else {
//       dataContainer.innerHTML =
//         '<p class="text-danger">Error: Invalid data format received from the API.</p>';
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     dataContainer.innerHTML =
//       '<p class="text-danger">Error fetching data from the API.</p>';
//   }
// }

// function displayJson(jsonData, level = 0) {
//   const container = document.createElement("div");

//   for (const key in jsonData) {
//     if (jsonData.hasOwnProperty(key)) {
//       const value = jsonData[key];
//       const indent = "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(level);

//       if (typeof value === "object" && value !== null) {
//         const collapsibleId = `collapsible-${level}-${key.replace(
//           /\s+/g,
//           "-"
//         )}`;
//         const section = document.createElement("div");
//         section.classList.add("mb-2");

//         section.innerHTML = `
//                     <strong data-bs-toggle="collapse" data-bs-target="#${collapsibleId}" 
//                         aria-expanded="false" aria-controls="${collapsibleId}" style="cursor: pointer;">
//                         ${indent}${key}:
//                     </strong>
//                     <div class="collapse" id="${collapsibleId}">
//                         <div class="card card-body ms-3"></div>
//                     </div>
//                 `;

//         const subContainer = section.querySelector(".card-body");
//         subContainer.appendChild(displayJson(value, level + 1));

//         container.appendChild(section);
//       } else {
//         const p = document.createElement("p");
//         p.innerHTML = `${indent}<strong>${key}:</strong> ${formatValue(value)}`;
//         container.appendChild(p);
//       }
//     }
//   }
//   return container;
// }

// function formatValue(value) {
//   if (typeof value === "number") {
//     return value.toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   }
//   return value;
// }












document.getElementById("fetchData").addEventListener("click", async () => {
  try {
    const response = await fetch("https://api.npoint.io/b8284c9a519839726fa1"); // Replace with your actual npoint URL
    const data = await response.json();

    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("output").innerHTML = "Failed to load data.";
  }
});

function displayData(data) {
  const output = document.getElementById("output");
  output.innerHTML = ""; // Clear previous content

  const formatData = (title, value) => `
    <div class="data-item">
      <span class="data-title">${title}:</span> 
      <span class="data-value">${value}</span>
    </div>
  `;

  // Extracting necessary details
  output.innerHTML += `<h4>Employer Details</h4>`;
  output.innerHTML += formatData("Name", data.Employer.Name);
  output.innerHTML += formatData("TAN", data.Employer.TAN);
  output.innerHTML += formatData("PAN", data.Employer.PAN);

  output.innerHTML += `<h4>Employee Details</h4>`;
  output.innerHTML += formatData("Name", data.Employee.Name);
  output.innerHTML += formatData("PAN", data.Employee.PAN);
  output.innerHTML += formatData(
    "Assessment Year",
    data.Employee["Assessment Year"]
  );

  output.innerHTML += `<h4>Salary Details</h4>`;
  output.innerHTML += formatData(
    "Gross Salary",
    `₹${data.SalaryDetails.GrossSalary.toLocaleString()}`
  );
  output.innerHTML += formatData(
    "Total Taxable Income",
    `₹${data.SalaryDetails.TotalTaxableIncome.toLocaleString()}`
  );

  output.innerHTML += `<h4>Tax Details</h4>`;
  output.innerHTML += formatData(
    "Total Tax Deducted",
    `₹${data.TaxDetails.TotalTaxDeducted.toLocaleString()}`
  );
  output.innerHTML += formatData(
    "Total Tax Deposited",
    `₹${data.TaxDetails.TotalTaxDeposited.toLocaleString()}`
  );

  output.innerHTML += `<h4>Investment Recommendations</h4>`;
  for (const [key, value] of Object.entries(data.InvestmentRecommendations)) {
    output.innerHTML += formatData(key, value);
  }
}
