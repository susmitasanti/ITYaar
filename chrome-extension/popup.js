document.getElementById("fillForm").addEventListener("click", async () => {
  try {
    // Fetch real data from the JSON endpoint
    const response = await fetch("https://api.npoint.io/b8284c9a519839726fa1"); // Replace with your actual endpoint
    const data = await response.json();

    // Extract necessary details from the JSON
    let taxData = {
      employerName: data.Employer.Name,
      employerTAN: data.Employer.TAN,
      employerPAN: data.Employer.PAN,
      employeeName: data.Employee.Name,
      employeePAN: data.Employee.PAN,
      assessmentYear: data.Employee["Assessment Year"],
      grossSalary: data.SalaryDetails.GrossSalary,
      taxableIncome: data.SalaryDetails.TotalTaxableIncome,
      totalTaxDeducted: data.TaxDetails.TotalTaxDeducted,
      totalTaxDeposited: data.TaxDetails.TotalTaxDeposited,
    };

    // Send the data to the content script to fill the form
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "fillForm",
        data: taxData,
      });
    });
  } catch (error) {
    console.error("Error fetching tax data:", error);
  }
});
